import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPackageSchema, type InsertPackage, type Package } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AdminPackageFormProps {
  editingPackage?: Package;
  onCancel?: () => void;
}

export default function AdminPackageForm({ editingPackage, onCancel }: AdminPackageFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!editingPackage;

  const form = useForm<InsertPackage>({
    resolver: zodResolver(insertPackageSchema),
    defaultValues: editingPackage ? {
      title: editingPackage.title,
      description: editingPackage.description,
      price: editingPackage.price,
      duration: editingPackage.duration,
      type: editingPackage.type as "umrah" | "hajj",
      accommodation: editingPackage.accommodation,
      transport: editingPackage.transport,
      meals: editingPackage.meals,
      image: editingPackage.image,
      featured: editingPackage.featured || false,
    } : {
      title: "",
      description: "",
      price: 0,
      duration: "",
      type: "umrah",
      accommodation: "",
      transport: "",
      meals: "",
      image: "",
      featured: false,
    },
  });

  const createPackageMutation = useMutation({
    mutationFn: (data: InsertPackage) => apiRequest("POST", "/api/packages", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/packages/type"] });
      toast({
        title: "Package Created",
        description: "The package has been successfully created.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create package.",
        variant: "destructive",
      });
    },
  });

  const updatePackageMutation = useMutation({
    mutationFn: (data: InsertPackage) => apiRequest("PUT", `/api/packages/${editingPackage?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/packages/type"] });
      toast({
        title: "Package Updated",
        description: "The package has been successfully updated.",
      });
      if (onCancel) onCancel();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update package.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPackage) => {
    if (isEditing) {
      updatePackageMutation.mutate(data);
    } else {
      createPackageMutation.mutate(data);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle data-testid="text-admin-form-title">
          {isEditing ? "Edit Package" : "Add New Package"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-admin-package-title" />
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
                    <Textarea {...field} rows={3} data-testid="textarea-admin-package-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        data-testid="input-admin-package-price"
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
                      <Input {...field} placeholder="e.g., 14 Days" data-testid="input-admin-package-duration" />
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
                      <SelectTrigger data-testid="select-admin-package-type">
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
                    <Input {...field} placeholder="e.g., 5-star hotel near Haram" data-testid="input-admin-package-accommodation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transportation</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Direct flights included" data-testid="input-admin-package-transport" />
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
                    <Input {...field} placeholder="e.g., All meals included" data-testid="input-admin-package-meals" />
                  </FormControl>
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
                    <Input {...field} type="url" placeholder="https://..." data-testid="input-admin-package-image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      data-testid="switch-admin-package-featured"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={createPackageMutation.isPending || updatePackageMutation.isPending}
                data-testid="button-admin-submit-package"
              >
                {createPackageMutation.isPending || updatePackageMutation.isPending 
                  ? (isEditing ? "Updating..." : "Creating...")
                  : (isEditing ? "Update Package" : "Create Package")
                }
              </Button>
              
              {isEditing && onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  data-testid="button-admin-cancel-edit"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
