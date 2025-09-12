import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import csrf from "csrf";
import rateLimit from "express-rate-limit";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

// Initialize CSRF protection
const csrfProtection = new csrf();

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 login attempts per window
  message: {
    message: "Too many login attempts, please try again in 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Rate limiter for registration
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Maximum 3 registration attempts per hour
  message: {
    message: "Too many registration attempts, please try again in an hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Require SESSION_SECRET in production
  if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required in production');
  }

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'hajj-umrah-dev-secret-fallback-2024',
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax', // CSRF protection
    },
    name: 'sessionId', // Change default session name for security
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // CSRF token endpoint
  app.get("/api/csrf-token", (req, res) => {
    if (!req.session) {
      return res.status(500).json({ message: "Session not available" });
    }
    const token = csrfProtection.create(req.session.id);
    res.json({ csrfToken: token });
  });

  // Admin registration endpoint with security controls
  app.post("/api/register", registrationLimiter, async (req, res, next) => {
    try {
      // Disable registration in production unless ADMIN_SETUP_TOKEN is provided
      if (process.env.NODE_ENV === 'production') {
        const adminToken = req.headers['x-admin-setup-token'];
        if (!adminToken || adminToken !== process.env.ADMIN_SETUP_TOKEN) {
          return res.status(403).json({ 
            message: "Admin registration is disabled in production. Contact system administrator." 
          });
        }
      }

      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser({
        ...userData,
        password: await hashPassword(userData.password),
      });

      // Regenerate session on successful registration to prevent session fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error('Session regeneration error:', err);
          return res.status(500).json({ message: "Registration failed" });
        }
        
        req.login(user, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.status(201).json(user);
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error('Registration error:', error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/login", loginLimiter, (req, res, next) => {
    passport.authenticate("local", (err: any, user: SelectUser | false, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Regenerate session on successful login to prevent session fixation
      req.session.regenerate((regenerateErr) => {
        if (regenerateErr) {
          console.error('Session regeneration error:', regenerateErr);
          return res.status(500).json({ message: "Login failed" });
        }

        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          res.status(200).json(user);
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      
      // Destroy session completely for security
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          console.error('Session destruction error:', destroyErr);
          return res.status(500).json({ message: "Logout failed" });
        }
        
        // Clear the session cookie
        res.clearCookie('sessionId');
        res.sendStatus(200);
      });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

export { hashPassword, comparePasswords };