import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Redirect, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Shield, Lock, User } from "lucide-react";

type LoginFormData = z.infer<typeof insertUserSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  // Don't render anything if user is authenticated (will redirect)
  if (user) {
    return null;
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isRegistering) {
      registerMutation.mutate(data, {
        onSuccess: () => {
          setLocation("/admin");
        }
      });
    } else {
      loginMutation.mutate(data, {
        onSuccess: () => {
          setLocation("/admin");
        }
      });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to manage your Hajj and Umrah packages
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isRegistering ? "Create Admin Account" : "Sign In"}</CardTitle>
              <CardDescription>
                {isRegistering
                  ? "Create your administrator account"
                  : "Enter your credentials to access the admin panel"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    <User className="inline h-4 w-4 mr-1" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    data-testid="input-username"
                    placeholder="Enter your username"
                    {...form.register("username")}
                    className="w-full"
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    data-testid="input-password"
                    placeholder="Enter your password"
                    {...form.register("password")}
                    className="w-full"
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  data-testid={isRegistering ? "button-register" : "button-login"}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isRegistering ? "Creating Account..." : "Signing In..."}
                    </span>
                  ) : (
                    <span>{isRegistering ? "Create Account" : "Sign In"}</span>
                  )}
                </Button>
              </form>

              <Separator className="my-4" />

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsRegistering(!isRegistering)}
                  data-testid="button-toggle-mode"
                >
                  {isRegistering
                    ? "Already have an account? Sign in"
                    : "Need to create an account? Register"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h3 className="text-2xl font-bold mb-4">
            Manage Sacred Journeys
          </h3>
          <p className="text-blue-100 dark:text-blue-200 mb-6">
            Oversee and manage Hajj and Umrah packages for pilgrims from around the world. 
            Update content, manage bookings, and ensure every spiritual journey is perfect.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-sm">Package Management</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-sm">Content Administration</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-sm">Slider Configuration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}