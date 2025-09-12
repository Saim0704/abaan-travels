import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import PackageCard from "@/components/package-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Packages() {
  const [activeType, setActiveType] = useState<"umrah" | "hajj">("umrah");

  const { data: packages = [], isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages/type", activeType],
  });

  const showUmrahPackages = () => setActiveType("umrah");
  const showHajjPackages = () => setActiveType("hajj");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="text-packages-title">
              Our Premium Packages
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully crafted Hajj and Umrah packages designed to provide you with a 
              spiritually enriching and comfortable pilgrimage experience.
            </p>
          </div>
        </div>
      </section>

      {/* Package Type Tabs */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Packages Grid */}
      <section className="pb-20 bg-gradient-to-br from-background to-muted/30 relative">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-5 dark:opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="glass-card overflow-hidden">
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
              <i className={`fas ${activeType === 'hajj' ? 'fa-kaaba' : 'fa-mosque'} text-6xl text-muted-foreground/50 mb-4`}></i>
              <p className="text-muted-foreground text-lg" data-testid="text-no-packages">
                No {activeType} packages available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-background/50 relative">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-5 dark:opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-package-info-title">
              About {activeType === 'hajj' ? 'Hajj' : 'Umrah'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {activeType === 'hajj' 
                ? 'Understanding the fifth pillar of Islam'
                : 'Understanding the sacred pilgrimage'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeType === 'umrah' ? (
              <>
                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-mosque text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">What is Umrah?</h3>
                  <p className="text-muted-foreground text-center">
                    Umrah is a pilgrimage to Mecca that can be undertaken at any time of the year, 
                    unlike Hajj which has specific dates.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-calendar text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Best Time to Go</h3>
                  <p className="text-muted-foreground text-center">
                    Umrah can be performed year-round, with Ramadan being particularly blessed, 
                    though it may be more crowded.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Spiritual Benefits</h3>
                  <p className="text-muted-foreground text-center">
                    Umrah purifies the soul, brings spiritual renewal, and is considered 
                    highly rewarding in Islamic tradition.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-kaaba text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Fifth Pillar</h3>
                  <p className="text-muted-foreground text-center">
                    Hajj is the fifth pillar of Islam, mandatory for every Muslim who is physically 
                    and financially able to perform it once in their lifetime.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-calendar-alt text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Specific Dates</h3>
                  <p className="text-muted-foreground text-center">
                    Hajj occurs during specific dates in the Islamic lunar month of Dhul Hijjah, 
                    making advance planning essential.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Unity & Equality</h3>
                  <p className="text-muted-foreground text-center">
                    Hajj brings together Muslims from all walks of life, promoting unity, 
                    equality, and brotherhood among believers.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-route text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Rituals</h3>
                  <p className="text-muted-foreground text-center">
                    The pilgrimage includes specific rituals performed over several days, 
                    each with deep spiritual significance.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Spiritual Renewal</h3>
                  <p className="text-muted-foreground text-center">
                    Hajj provides complete spiritual cleansing and renewal, with sins forgiven 
                    for those who perform it with sincerity.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-hands-praying text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">Life-changing</h3>
                  <p className="text-muted-foreground text-center">
                    Many pilgrims describe Hajj as a transformative experience that strengthens 
                    their faith and changes their perspective on life.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}