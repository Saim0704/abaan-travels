import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Package } from "@shared/schema";
import PackageCard from "./package-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PackageSection() {
  const [activeType, setActiveType] = useState<"umrah" | "hajj">("umrah");

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["/api/packages/type", activeType],
  });

  const showUmrahPackages = () => setActiveType("umrah");
  const showHajjPackages = () => setActiveType("hajj");

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-packages-title">
            Our Premium Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our carefully crafted Hajj and Umrah packages designed to provide you with a spiritual and comfortable journey.
          </p>
        </div>

        {/* Package Type Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <button
              className={`package-tab px-6 py-3 rounded-md font-medium text-sm transition-all ${
                activeType === "umrah"
                  ? "active bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={showUmrahPackages}
              data-testid="button-umrah-packages"
            >
              <i className="fas fa-mosque mr-2"></i>
              Umrah Packages
            </button>
            <button
              className={`package-tab px-6 py-3 rounded-md font-medium text-sm transition-all ${
                activeType === "hajj"
                  ? "active bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={showHajjPackages}
              data-testid="button-hajj-packages"
            >
              <i className="fas fa-kaaba mr-2"></i>
              Hajj Packages
            </button>
          </div>
        </div>

        {/* Package Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg" data-testid="text-no-packages">
              No {activeType} packages available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: Package) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg font-semibold"
            data-testid="button-view-all-packages"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
