import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSliderImageSchema, type InsertSliderImage, type SliderImage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SliderFormProps {
  editingSlider?: SliderImage;
  onCancel?: () => void;
}

export default function SliderForm({ editingSlider, onCancel }: SliderFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!editingSlider;

  const form = useForm<InsertSliderImage>({
    resolver: zodResolver(insertSliderImageSchema),
    defaultValues: editingSlider ? {
      title: editingSlider.title,
      subtitle: editingSlider.subtitle,
      buttonText: "Contact Us", // Default value for all sliders
      imageUrl: editingSlider.imageUrl,
      order: editingSlider.order,
    } : {
      title: "",
      subtitle: "",
      buttonText: "Contact Us", // Default value for new sliders
      imageUrl: "",
      order: 0,
    },
  });

  const createSliderMutation = useMutation({
    mutationFn: (data: InsertSliderImage) => apiRequest("POST", "/api/slider-images", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      toast({
        title: "Slider Image Created",
        description: "The slider image has been successfully created.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create slider image.",
        variant: "destructive",
      });
    },
  });

  const updateSliderMutation = useMutation({
    mutationFn: (data: InsertSliderImage) => apiRequest("PUT", `/api/slider-images/${editingSlider?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      toast({
        title: "Slider Image Updated",
        description: "The slider image has been successfully updated.",
      });
      if (onCancel) onCancel();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update slider image.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSliderImage) => {
    if (isEditing) {
      updateSliderMutation.mutate(data);
    } else {
      createSliderMutation.mutate(data);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle data-testid="text-slider-form-title">
          {isEditing ? "Edit Slider Image" : "Add New Slider Image"}
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-slider-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} data-testid="textarea-slider-subtitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button text is now fixed as 'Contact Us' and hidden from admin */}
            <input type="hidden" {...form.register("buttonText")} value="Contact Us" />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://..." data-testid="input-slider-image-url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      data-testid="input-slider-order"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={createSliderMutation.isPending || updateSliderMutation.isPending}
                data-testid="button-submit-slider"
              >
                {createSliderMutation.isPending || updateSliderMutation.isPending 
                  ? (isEditing ? "Updating..." : "Creating...")
                  : (isEditing ? "Update Slider" : "Create Slider")
                }
              </Button>
              
              {isEditing && onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  data-testid="button-cancel-slider-edit"
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