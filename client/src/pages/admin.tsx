import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PackageForm from "@/components/admin/package-form";
import PackageList from "@/components/admin/package-list";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("packages");

  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ["/api/packages"],
  });

  const { data: sliderImages = [], isLoading: sliderLoading } = useQuery({
    queryKey: ["/api/slider-images"],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-admin-title">
            Admin Panel
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage packages, slider images, and other content for Abaan Travel website.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages" data-testid="tab-packages">
              Packages ({packages.length})
            </TabsTrigger>
            <TabsTrigger value="slider" data-testid="tab-slider">
              Slider Images ({sliderImages.length})
            </TabsTrigger>
            <TabsTrigger value="stats" data-testid="tab-stats">
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="text-add-package-title">Add New Package</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PackageForm />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="text-existing-packages-title">Existing Packages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PackageList packages={packages} isLoading={packagesLoading} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="slider" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-slider-management-title">Slider Image Management</CardTitle>
              </CardHeader>
              <CardContent>
                {sliderLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading slider images...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sliderImages.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8" data-testid="text-no-slider-images">
                        No slider images available.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sliderImages.map((image: any) => (
                          <div key={image.id} className="border border-border rounded-lg p-4">
                            <img
                              src={image.imageUrl}
                              alt={image.title}
                              className="w-full h-32 object-cover rounded mb-3"
                              data-testid={`slider-image-${image.id}`}
                            />
                            <h3 className="font-semibold text-foreground mb-1" data-testid={`slider-title-${image.id}`}>
                              {image.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2" data-testid={`slider-subtitle-${image.id}`}>
                              {image.subtitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Order: {image.order}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <i className="fas fa-box text-3xl text-primary mb-3"></i>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="text-total-packages">
                      {packages.length}
                    </h3>
                    <p className="text-muted-foreground">Total Packages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <i className="fas fa-mosque text-3xl text-secondary mb-3"></i>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="text-umrah-packages">
                      {packages.filter((pkg: any) => pkg.type === 'umrah').length}
                    </h3>
                    <p className="text-muted-foreground">Umrah Packages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <i className="fas fa-kaaba text-3xl text-accent mb-3"></i>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="text-hajj-packages">
                      {packages.filter((pkg: any) => pkg.type === 'hajj').length}
                    </h3>
                    <p className="text-muted-foreground">Hajj Packages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <i className="fas fa-images text-3xl text-primary mb-3"></i>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="text-slider-images-count">
                      {sliderImages.length}
                    </h3>
                    <p className="text-muted-foreground">Slider Images</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle data-testid="text-package-breakdown-title">Package Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Featured Packages:</span>
                    <span className="font-semibold" data-testid="text-featured-packages">
                      {packages.filter((pkg: any) => pkg.featured).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Package Price:</span>
                    <span className="font-semibold" data-testid="text-average-price">
                      ${packages.length > 0 
                        ? Math.round(packages.reduce((sum: number, pkg: any) => sum + pkg.price, 0) / packages.length).toLocaleString()
                        : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
