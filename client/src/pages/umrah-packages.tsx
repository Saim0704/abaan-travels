import { useQuery } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import PackageCard from "@/components/package-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UmrahPackages() {
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["/api/packages/type", "umrah"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="text-umrah-title">
              Umrah Packages
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully crafted Umrah packages designed to provide you with a 
              spiritually enriching and comfortable pilgrimage experience.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
              <i className="fas fa-mosque text-6xl text-muted-foreground/50 mb-4"></i>
              <p className="text-muted-foreground text-lg" data-testid="text-no-umrah-packages">
                No Umrah packages available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg: Package) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-umrah-info-title">
              About Umrah
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the sacred pilgrimage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mosque text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">What is Umrah?</h3>
              <p className="text-muted-foreground text-center">
                Umrah is a pilgrimage to Mecca that can be undertaken at any time of the year, 
                unlike Hajj which has specific dates.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Best Time to Go</h3>
              <p className="text-muted-foreground text-center">
                Umrah can be performed year-round, with Ramadan being particularly blessed, 
                though it may be more crowded.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Spiritual Benefits</h3>
              <p className="text-muted-foreground text-center">
                Umrah purifies the soul, brings spiritual renewal, and is considered 
                highly rewarding in Islamic tradition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
