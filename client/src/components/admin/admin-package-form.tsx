import { useEffect } from "react";
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
    defaultValues: {
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

  // 🔥 Reset form whenever editingPackage changes
  useEffect(() => {
    if (editingPackage) {
      form.reset({
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
      });
    } else {
      form.reset({
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
      });
    }
  }, [editingPackage, form]);

  const createPackageMutation = useMutation({
    mutationFn: (data: InsertPackage) => apiRequest("POST", "/api/packages", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/packages/type"] });
      toast({ title: "Package Created", description: "The package has been successfully created." });
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
      toast({ title: "Package Updated", description: "The package has been successfully updated." });
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
            {/* ... your fields unchanged ... */}
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={createPackageMutation.isPending || updatePackageMutation.isPending}
                data-testid="button-admin-submit-package"
              >
                {createPackageMutation.isPending || updatePackageMutation.isPending 
                  ? (isEditing ? "Updating..." : "Creating...")
                  : (isEditing ? "Update Package" : "Create Package")}
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