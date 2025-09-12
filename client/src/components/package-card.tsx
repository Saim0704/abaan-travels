import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "@shared/schema";
import { Bed, Plane, Utensils } from "lucide-react";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div className="glass-card overflow-hidden group" data-testid={`package-card-${pkg.id}`}>
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`package-image-${pkg.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground" data-testid={`package-title-${pkg.id}`}>
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
        <p className="text-muted-foreground mb-4 text-sm" data-testid={`package-description-${pkg.id}`}>
          {pkg.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Bed className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-accommodation-${pkg.id}`}>{pkg.accommodation}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Plane className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-transport-${pkg.id}`}>{pkg.transport}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Utensils className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-meals-${pkg.id}`}>{pkg.meals}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary" data-testid={`package-price-${pkg.id}`}>
              ${pkg.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/person</span>
          </div>
          <Button
            className="glass-pill bg-primary/80 hover:bg-primary/90 text-primary-foreground border border-primary/30"
            data-testid={`button-view-package-${pkg.id}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
