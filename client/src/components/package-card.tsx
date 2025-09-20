import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "@shared/schema";
import { Bed, Plane, Utensils, Calendar, MapPin, Star } from "lucide-react";

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
        
        {/* Tour Dates */}
        {(pkg.fromDate || pkg.toDate) && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-dates-${pkg.id}`}>
              {pkg.fromDate && pkg.toDate 
                ? `${new Date(pkg.fromDate).toLocaleDateString()} - ${new Date(pkg.toDate).toLocaleDateString()}`
                : pkg.fromDate 
                ? `From ${new Date(pkg.fromDate).toLocaleDateString()}`
                : `Until ${new Date(pkg.toDate).toLocaleDateString()}`}
            </span>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-2 text-primary" />
              <span data-testid={`package-accommodation-${pkg.id}`}>{pkg.accommodation}</span>
            </div>
            <div className="flex gap-2 text-xs">
              {pkg.accommodationMakkahStars && (
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                  <span className="text-primary font-medium">Makkah:</span>
                  <div className="flex">
                    {Array.from({ length: pkg.accommodationMakkahStars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              )}
              {pkg.accommodationMadinahStars && (
                <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
                  <span className="text-secondary font-medium">Madinah:</span>
                  <div className="flex">
                    {Array.from({ length: pkg.accommodationMadinahStars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Plane className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-transport-${pkg.id}`}>{pkg.transport}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Utensils className="h-4 w-4 mr-2 text-primary" />
            <span data-testid={`package-meals-${pkg.id}`}>{pkg.meals}</span>
          </div>
          
          {/* Hotel Distances */}
          {(pkg.hotelDistanceMakkah || pkg.hotelDistanceMadinah) && (
            <div className="space-y-1">
              {pkg.hotelDistanceMakkah && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span data-testid={`package-distance-makkah-${pkg.id}`}>Makkah: {pkg.hotelDistanceMakkah}</span>
                </div>
              )}
              {pkg.hotelDistanceMadinah && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span data-testid={`package-distance-madinah-${pkg.id}`}>Madinah: {pkg.hotelDistanceMadinah}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Amenities */}
        {pkg.amenities && pkg.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-foreground">Included Amenities:</span>
            </div>
            <div className="flex flex-wrap gap-1" data-testid={`package-amenities-${pkg.id}`}>
              {pkg.amenities.map((amenity, index) => (
                <Badge
                  key={`${amenity}-${index}`}
                  variant="outline"
                  className="glass-pill bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                  data-testid={`amenity-${amenity.toLowerCase().replace(/ /g, '-')}-${pkg.id}`}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary" data-testid={`package-price-${pkg.id}`}>
              ₹{pkg.price.toLocaleString()}
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
