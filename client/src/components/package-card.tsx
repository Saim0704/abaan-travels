import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package } from "@shared/schema";
import { Bed, Plane, Utensils, Calendar, Star } from "lucide-react";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const [open, setOpen] = useState(false);

  const isExpired =
    pkg.expired || (pkg.toDate && new Date(pkg.toDate) < new Date());

  return (
    <>
      {/* Card */}
      <div
        className="glass-card group"
        data-testid={`package-card-${pkg.id}`}
      >
        <div className="relative">
          <img
            src={pkg.image}
            alt={pkg.title}
            className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
              isExpired ? "opacity-70" : ""
            }`}
            data-testid={`package-image-${pkg.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Big Red Cross if expired */}
          {
            isExpired && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="text-red-600 text-2xl md:text-3xl font-extrabold uppercase tracking-widest">
                  Expired Package
                </span>
              </div>
          )}

          {/* Featured Icon */}
          {pkg.featured && !isExpired && (
            <div className="absolute top-2 right-2">
              <Star
                className="h-5 w-5 text-secondary fill-current"
                data-testid={`package-featured-icon-${pkg.id}`}
              />
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-xl font-semibold text-foreground"
              data-testid={`package-title-${pkg.id}`}
            >
              {pkg.title}
            </h3>
            <Badge
              variant="secondary"
              className="glass-pill bg-secondary/20 text-secondary border-secondary/30"
              data-testid={`package-duration-${pkg.id}`}
            >
              {pkg.duration}
            </Badge>
          </div>

          <p
            className="text-muted-foreground mb-4 text-sm"
            data-testid={`package-description-${pkg.id}`}
          >
            {pkg.description}
          </p>

          {/* Dates */}
          {(pkg.fromDate || pkg.toDate) && (
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span data-testid={`package-dates-${pkg.id}`}>
                {pkg.fromDate && pkg.toDate
                  ? `${new Date(pkg.fromDate).toLocaleDateString()} - ${new Date(
                      pkg.toDate
                    ).toLocaleDateString()}`
                  : pkg.fromDate
                  ? `From ${new Date(pkg.fromDate).toLocaleDateString()}`
                  : `Until ${new Date(pkg.toDate).toLocaleDateString()}`}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div>
                <span
                  className="text-2xl font-bold text-primary"
                  data-testid={`package-price-${pkg.id}`}
                >
                  ₹{pkg.price.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="glass-pill"
                data-testid={`button-details-${pkg.id}`}
              >
                View Details
              </Button>
              {/* <Button
                className="glass-pill bg-primary/90 hover:bg-primary text-primary-foreground"
                disabled={isExpired}
                data-testid={`button-book-${pkg.id}`}
              >
                {isExpired ? "Expired" : "Book Now"}
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Modal (Popup) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{pkg.title} - Details</DialogTitle>
          </DialogHeader>

          {/* Accommodation */}
          <div className="mb-4">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Bed className="h-4 w-4 text-primary" /> Accommodation
            </h4>
            <p>{pkg.accommodation}</p>
          </div>

          {/* Transport */}
          <div className="mb-4">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Plane className="h-4 w-4 text-primary" /> Transport
            </h4>
            <p>{pkg.transport}</p>
          </div>

          {/* Meals */}
          <div className="mb-4">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Utensils className="h-4 w-4 text-primary" /> Meals
            </h4>
            <p>{pkg.meals}</p>
          </div>

          {/* Amenities */}
          {pkg.amenities && pkg.amenities.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-1">
                {pkg.amenities.map((amenity, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div>
                <span
                  className="text-2xl font-bold text-primary"
                  data-testid={`package-price-${pkg.id}`}
                >
                  ₹{pkg.price.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => (window.location.href = "/contact")}
                className="glass-pill bg-primary/90 hover:bg-primary text-primary-foreground"
                data-testid={`button-contact-${pkg.id}`}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}