import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, SliderImage } from "@shared/schema";
import PackageForm from "@/components/admin/package-form";
import PackageList from "@/components/admin/package-list";
import SliderForm from "@/components/admin/slider-form";
import SliderList from "@/components/admin/slider-list";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("packages");
  const [editingPackage, setEditingPackage] = useState<Package | undefined>(undefined);
  const [editingSlider, setEditingSlider] = useState<SliderImage | undefined>(undefined);

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
  };

  const handleCancelPackageEdit = () => {
    setEditingPackage(undefined);
  };

  const handleEditSlider = (slider: SliderImage) => {
    setEditingSlider(slider);
  };

  const handleCancelSliderEdit = () => {
    setEditingSlider(undefined);
  };

  const { data: packages = [], isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const { data: sliderImages = [], isLoading: sliderLoading } = useQuery<SliderImage[]>({
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
                    <CardTitle data-testid="text-add-package-title">
                      {editingPackage ? 'Edit Package' : 'Add New Package'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PackageForm editingPackage={editingPackage} onCancel={handleCancelPackageEdit} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="text-existing-packages-title">Existing Packages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PackageList packages={packages} isLoading={packagesLoading} onEdit={handleEditPackage} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="slider" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SliderForm editingSlider={editingSlider} onCancel={handleCancelSliderEdit} />
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="text-existing-sliders-title">Existing Slider Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SliderList 
                      sliderImages={sliderImages} 
                      isLoading={sliderLoading} 
                      onEdit={handleEditSlider}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
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
                      {packages.filter((pkg) => pkg.type === 'umrah').length}
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
                      {packages.filter((pkg) => pkg.type === 'hajj').length}
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
                      {packages.filter((pkg) => pkg.featured).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Package Price:</span>
                    <span className="font-semibold" data-testid="text-average-price">
                      ${packages.length > 0 
                        ? Math.round(packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length).toLocaleString()
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
