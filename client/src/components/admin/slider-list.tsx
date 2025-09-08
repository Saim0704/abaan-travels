import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SliderImage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, ArrowUp, ArrowDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SliderListProps {
  sliderImages: SliderImage[];
  isLoading: boolean;
  onEdit?: (slider: SliderImage) => void;
}

export default function SliderList({ sliderImages, isLoading, onEdit }: SliderListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteSliderMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/slider-images/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slider-images"] });
      toast({
        title: "Slider Image Deleted",
        description: "The slider image has been successfully deleted.",
      });
      setDeletingId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete slider image.",
        variant: "destructive",
      });
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteSliderMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <Skeleton className="h-20 w-32" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (sliderImages.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-images text-2xl text-muted-foreground"></i>
        </div>
        <p className="text-muted-foreground" data-testid="text-no-slider-images">
          No slider images available. Create your first slider image above.
        </p>
      </div>
    );
  }

  const sortedSliders = [...sliderImages].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sortedSliders.map((slider) => (
        <Card key={slider.id} className="overflow-hidden" data-testid={`slider-item-${slider.id}`}>
          <CardContent className="p-0">
            <div className="flex">
              {/* Slider Image Preview */}
              <div className="w-32 h-20 flex-shrink-0">
                <img
                  src={slider.imageUrl}
                  alt={slider.title}
                  className="w-full h-full object-cover"
                  data-testid={`slider-preview-${slider.id}`}
                />
              </div>

              {/* Slider Details */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground" data-testid={`slider-list-title-${slider.id}`}>
                        {slider.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        Order: {slider.order}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`slider-subtitle-${slider.id}`}>
                      {slider.subtitle}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span data-testid={`slider-button-text-${slider.id}`}>
                        Button: "{slider.buttonText}"
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-w-16"
                      onClick={() => onEdit && onEdit(slider)}
                      data-testid={`button-edit-slider-${slider.id}`}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="min-w-16 text-destructive hover:text-destructive"
                          disabled={deletingId === slider.id}
                          data-testid={`button-delete-slider-${slider.id}`}
                        >
                          {deletingId === slider.id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the slider image "{slider.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-testid={`button-cancel-delete-slider-${slider.id}`}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(slider.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-testid={`button-confirm-delete-slider-${slider.id}`}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}