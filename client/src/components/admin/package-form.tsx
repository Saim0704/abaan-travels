import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPackageSchema, type InsertPackage, type Package, PREDEFINED_AMENITIES } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface PackageFormProps {
  editingPackage?: Package;
  onCancel?: () => void;
}

export default function PackageForm({ editingPackage, onCancel }: PackageFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertPackage>({
    resolver: zodResolver(insertPackageSchema),
    defaultValues: editingPackage ? {
      title: editingPackage.title,
      description: editingPackage.description,
      price: editingPackage.price,
      duration: editingPackage.duration,
      days: editingPackage.days,
      fromDate: editingPackage.fromDate,
      toDate: editingPackage.toDate,
      type: editingPackage.type,
      accommodation: editingPackage.accommodation,
      accommodationMakkahStars: editingPackage.accommodationMakkahStars || 3,
      accommodationMadinahStars: editingPackage.accommodationMadinahStars || 3,
      transport: editingPackage.transport,
      meals: editingPackage.meals,
      hotelDistanceMakkah: editingPackage.hotelDistanceMakkah,
      hotelDistanceMadinah: editingPackage.hotelDistanceMadinah,
      amenities: editingPackage.amenities || [],
      image: editingPackage.image,
      featured: editingPackage.featured,
      expired: editingPackage.expired || false,
    } : {
      title: "",
      description: "",
      price: 0,
      duration: "",
      days: 7,
      fromDate: "",
      toDate: "",
      type: "umrah",
      accommodation: "",
      accommodationMakkahStars: 3,
      accommodationMadinahStars: 3,
      transport: "",
      meals: "",
      hotelDistanceMakkah: "",
      hotelDistanceMadinah: "",
      amenities: [],
      image: "",
      featured: false,
      expired: false,
    },
  });

  const createPackageMutation = useMutation({
    mutationFn: (data: InsertPackage) => {
      if (editingPackage) {
        return apiRequest("PUT", `/api/packages/${editingPackage.id}`, data);
      } else {
        return apiRequest("POST", "/api/packages", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/packages/type"] });
      toast({
        title: editingPackage ? "Package Updated" : "Package Created",
        description: editingPackage
          ? "The package has been successfully updated."
          : "The package has been successfully created.",
      });
      form.reset();
      if (editingPackage && onCancel) {
        onCancel();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || (editingPackage ? "Failed to update package." : "Failed to create package."),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPackage) => {
    createPackageMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Title</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-package-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} data-testid="textarea-package-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    data-testid="input-package-price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 14 Days" data-testid="input-package-duration" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Days</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    data-testid="input-package-days"
                    min="1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    data-testid="input-package-from-date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    data-testid="input-package-to-date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-package-type">
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="umrah">Umrah</SelectItem>
                  <SelectItem value="hajj">Hajj</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accommodation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accommodation</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Luxury hotel accommodations" data-testid="input-package-accommodation" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accommodationMakkahStars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Makkah Accommodation Stars</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger data-testid="select-makkah-stars">
                      <SelectValue placeholder="Select stars" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accommodationMadinahStars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Madinah Accommodation Stars</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger data-testid="select-madinah-stars">
                      <SelectValue placeholder="Select stars" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="transport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Direct flights included" data-testid="input-package-transport" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meals</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., All meals included" data-testid="input-package-meals" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hotelDistanceMakkah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Distance from Haram (Makkah)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 200m from Haram" data-testid="input-hotel-distance-makkah" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelDistanceMadinah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Distance from Masjid Nabawi (Madinah)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 150m from Masjid Nabawi" data-testid="input-hotel-distance-madinah" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Amenities</FormLabel>
                <p className="text-sm text-muted-foreground">Select amenities included in this package</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PREDEFINED_AMENITIES.map((amenity) => (
                  <FormField
                    key={amenity}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={amenity}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, amenity])
                                  : field.onChange(
                                      currentValue.filter((value) => value !== amenity)
                                    );
                              }}
                              data-testid={`checkbox-amenity-${amenity.toLowerCase().replace(/ /g, '-')}`}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {amenity}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="https://..." data-testid="input-package-image" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Featured Package</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Mark this package as featured
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    data-testid="switch-package-featured"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Expired Package</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Mark this package as expired
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    data-testid="switch-package-expired"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={createPackageMutation.isPending}
            data-testid="button-create-package"
          >
            {createPackageMutation.isPending
              ? (editingPackage ? "Updating..." : "Creating...")
              : (editingPackage ? "Update Package" : "Create Package")}
          </Button>
          {editingPackage && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
