import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Star } from "lucide-react";
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

interface PackageListProps {
  packages: Package[];
  isLoading: boolean;
  onEdit: (pkg: Package) => void;
}

export default function PackageList({ packages, isLoading, onEdit }: PackageListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deletePackageMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/packages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/packages/type"] });
      toast({
        title: "Package Deleted",
        description: "The package has been successfully deleted.",
      });
      setDeletingId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete package.",
        variant: "destructive",
      });
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deletePackageMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
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

  if (packages.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-box text-2xl text-muted-foreground"></i>
        </div>
        <p className="text-muted-foreground" data-testid="text-no-packages">
          No packages available. Create your first package above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden" data-testid={`package-item-${pkg.id}`}>
          <CardContent className="p-0">
            <div className="flex">
              {/* Package Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  data-testid={`package-list-image-${pkg.id}`}
                />
              </div>

              {/* Package Details */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground" data-testid={`package-list-title-${pkg.id}`}>
                        {pkg.title}
                      </h3>
                      {pkg.featured && (
                        <Star className="h-4 w-4 text-secondary fill-current" data-testid={`package-featured-icon-${pkg.id}`} />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                      <Badge 
                        variant={pkg.type === 'hajj' ? 'default' : 'secondary'}
                        className="capitalize"
                        data-testid={`package-type-badge-${pkg.id}`}
                      >
                        {pkg.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground" data-testid={`package-duration-${pkg.id}`}>
                        {pkg.duration}
                      </span>
                      <span className="font-semibold text-primary" data-testid={`package-list-price-${pkg.id}`}>
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`package-list-description-${pkg.id}`}>
                      {pkg.description}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span data-testid={`package-accommodation-${pkg.id}`}>
                        🏨 {pkg.accommodation}
                      </span>
                      <span data-testid={`package-transport-${pkg.id}`}>
                        ✈️ {pkg.transport}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-w-16"
                      onClick={() => onEdit(pkg)}
                      data-testid={`button-edit-package-${pkg.id}`}
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
                          disabled={deletingId === pkg.id}
                          data-testid={`button-delete-package-${pkg.id}`}
                        >
                          {deletingId === pkg.id ? (
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
                            This action cannot be undone. This will permanently delete the package "{pkg.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-testid={`button-cancel-delete-${pkg.id}`}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(pkg.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-testid={`button-confirm-delete-${pkg.id}`}
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
