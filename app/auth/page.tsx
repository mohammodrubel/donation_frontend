"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Heart, HandHeart, Mail, Lock, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/reudx/fetchers/auth/authAPi";
import { JwtDecode } from "@/lib/jwtDecoder";
import { setUser } from "@/lib/reudx/fetchers/auth/authSlice";

/* ---------------- TYPES ---------------- */
interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

/* ---------------- COMPONENT ---------------- */
export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [loginData] = useLoginMutation();
  const [registerData] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const values: LoginFormValues = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const res = await loginData(values).unwrap();
      if (!res?.success) {
        toast.error(res?.message || "Login failed");
        return;
      }
      const token = res?.data?.access_token;
      if (!token) {
        toast.error("Token not received");
        return;
      }
      const user: any = JwtDecode(token);
      dispatch(setUser({ user, token }));
      toast.success(res.message || "Login successful");
      if(user.role === "ADMIN"){
        router.push("/dashboard");
      }else{
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REGISTER ---------------- */
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const values: RegisterFormValues = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const res = await registerData(values).unwrap();
      if (res?.success) {
        toast.success(res.message || "Registration successful");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI (Donation Theme with Your Primary Color) ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-3 text-center">
          {/* Decorative icon using your primary color */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <HandHeart className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Give<span className="text-primary">Hope</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Start your journey of generosity. <br />
            Every act of kindness counts.
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="login" className="data-[state=active]:bg-background data-[state=active]:text-primary">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-background data-[state=active]:text-primary">
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5 mt-4">
                <div className="relative">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 animate-pulse" /> Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER TAB */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-5 mt-4">
                <div className="relative">
                  <Label htmlFor="reg-name" className="text-sm font-medium">Full name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-name"
                      name="name"
                      placeholder="John Doe"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="reg-email" className="text-sm font-medium">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="reg-password" className="text-sm font-medium">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 animate-pulse" /> Creating account...
                    </span>
                  ) : (
                    "Join the Mission"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Donation Trust Message */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            By joining, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            <div className="mt-3 flex items-center justify-center gap-1 text-primary/80">
              <Heart className="h-3 w-3 fill-primary/30" /> 100% of donations go directly to causes
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}