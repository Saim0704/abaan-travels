import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/packages", label: "Packages" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="glass-nav relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center" data-testid="link-home">
              <i className="fas fa-kaaba text-primary text-2xl mr-3"></i>
              <h1 className="text-2xl font-bold text-primary">Abaan Travel</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    location === item.href
                      ? "glass-pill active text-primary-foreground border-primary/20"
                      : "text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 border-border/40 hover:border-border/60"
                  )}
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="glass-pill h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 dark:border-white/5">
          <div className="px-4 pt-4 pb-4 space-y-2 glass">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl border",
                  location === item.href
                    ? "glass-pill active text-primary-foreground border-primary/20"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 border-border/40 hover:border-border/60"
                )}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
