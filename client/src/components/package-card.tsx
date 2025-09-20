import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "@shared/schema";
import { Bed, Plane, Utensils, Calendar, Star, RotateCcw, AlertTriangle } from "lucide-react";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const isExpired = pkg.expired || (pkg.toDate && new Date(pkg.toDate) < new Date());

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} data-testid={`package-card-${pkg.id}`}>
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front glass-card group">
          <div className="relative">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`package-image-${pkg.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            {isExpired && (
              <div className="absolute top-2 left-2">
                <Badge variant="destructive" className="bg-destructive/90">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Expired
                </Badge>
              </div>
            )}
            {pkg.featured && (
              <div className="absolute top-2 right-2">
                <Star className="h-5 w-5 text-secondary fill-current" data-testid={`package-featured-icon-${pkg.id}`} />
              </div>
            )}
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
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <div>
                  <span className="text-2xl font-bold text-primary" data-testid={`package-price-${pkg.id}`}>
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlip}
                  className="glass-pill"
                  data-testid={`button-flip-${pkg.id}`}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  className="glass-pill bg-primary/90 hover:bg-primary text-primary-foreground"
                  disabled={isExpired}
                  data-testid={`button-book-${pkg.id}`}
                >
                  {isExpired ? 'Expired' : 'Book Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Detailed View */}
        <div className="flip-card-back glass-card">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground" data-testid={`package-detail-title-${pkg.id}`}>{pkg.title} - Details</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlip}
                className="glass-pill"
                data-testid={`button-flip-back-${pkg.id}`}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
              {/* Expiry Status */}
              {isExpired && (
                <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg" data-testid={`package-expiry-warning-${pkg.id}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">This package has expired</span>
                </div>
              )}

              {/* Accommodation Details */}
              <div className="bg-muted/20 p-3 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Bed className="h-4 w-4 text-primary" />
                  Accommodation Details
                </h4>
                <div className="space-y-1 text-sm">
                  <p>{pkg.accommodation}</p>
                  <div className="flex gap-4">
                    {pkg.accommodationMakkahStars && (
                      <div className="flex items-center gap-1">
                        <span>Makkah:</span>
                        <div className="flex">
                          {Array.from({ length: pkg.accommodationMakkahStars }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    )}
                    {pkg.accommodationMadinahStars && (
                      <div className="flex items-center gap-1">
                        <span>Madinah:</span>
                        <div className="flex">
                          {Array.from({ length: pkg.accommodationMadinahStars }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {pkg.hotelDistanceMakkah && (
                    <p className="text-muted-foreground">Distance from Haram (Makkah): {pkg.hotelDistanceMakkah}</p>
                  )}
                  {pkg.hotelDistanceMadinah && (
                    <p className="text-muted-foreground">Distance from Masjid Nabawi (Madinah): {pkg.hotelDistanceMadinah}</p>
                  )}
                </div>
              </div>

              {/* Transport & Meals */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-1">
                    <Plane className="h-4 w-4 text-primary" />
                    Transport
                  </h4>
                  <p className="text-sm" data-testid={`package-detail-transport-${pkg.id}`}>{pkg.transport}</p>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-1">
                    <Utensils className="h-4 w-4 text-primary" />
                    Meals
                  </h4>
                  <p className="text-sm" data-testid={`package-detail-meals-${pkg.id}`}>{pkg.meals}</p>
                </div>
              </div>

              {/* Amenities */}
              {pkg.amenities && pkg.amenities.length > 0 && (
                <div className="bg-muted/20 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom section with price and action */}
            <div className="mt-4 pt-4 border-t border-muted">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary" data-testid={`package-detail-price-${pkg.id}`}>₹{pkg.price.toLocaleString()}</span>
                  <Badge variant="outline" className="ml-2" data-testid={`package-detail-duration-${pkg.id}`}>{pkg.duration}</Badge>
                </div>
                <Button
                  className="glass-pill bg-primary/90 hover:bg-primary text-primary-foreground"
                  disabled={isExpired}
                  data-testid={`button-book-back-${pkg.id}`}
                >
                  {isExpired ? 'Expired' : 'Book Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}