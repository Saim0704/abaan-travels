import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackageSchema, insertSliderImageSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";

// Authentication middleware for admin routes
function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup auth routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);
  // Package routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (!["hajj", "umrah"].includes(type)) {
        return res.status(400).json({ message: "Invalid package type" });
      }
      const packages = await storage.getPackagesByType(type);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const pkg = await storage.getPackage(id);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  app.post("/api/packages", requireAuth, async (req, res) => {
    try {
      const packageData = insertPackageSchema.parse(req.body);
      const newPackage = await storage.createPackage(packageData);
      res.status(201).json(newPackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid package data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create package" });
    }
  });

  app.put("/api/packages/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const packageData = insertPackageSchema.partial().parse(req.body);
      const updatedPackage = await storage.updatePackage(id, packageData);
      res.json(updatedPackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid package data", errors: error.errors });
      }
      if (error instanceof Error && error.message === "Package not found") {
        return res.status(404).json({ message: "Package not found" });
      }
      res.status(500).json({ message: "Failed to update package" });
    }
  });

  app.delete("/api/packages/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePackage(id);
      if (!deleted) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete package" });
    }
  });

  // Slider routes
  app.get("/api/slider-images", async (req, res) => {
    try {
      const sliderImages = await storage.getAllSliderImages();
      res.json(sliderImages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch slider images" });
    }
  });

  app.post("/api/slider-images", requireAuth, async (req, res) => {
    try {
      const sliderData = insertSliderImageSchema.parse(req.body);
      const newSlider = await storage.createSliderImage(sliderData);
      res.status(201).json(newSlider);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid slider data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create slider image" });
    }
  });

  app.put("/api/slider-images/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const sliderData = insertSliderImageSchema.partial().parse(req.body);
      const updatedSlider = await storage.updateSliderImage(id, sliderData);
      res.json(updatedSlider);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid slider data", errors: error.errors });
      }
      if (error instanceof Error && error.message === "Slider image not found") {
        return res.status(404).json({ message: "Slider image not found" });
      }
      res.status(500).json({ message: "Failed to update slider image" });
    }
  });

  app.delete("/api/slider-images/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSliderImage(id);
      if (!deleted) {
        return res.status(404).json({ message: "Slider image not found" });
      }
      res.json({ message: "Slider image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete slider image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
