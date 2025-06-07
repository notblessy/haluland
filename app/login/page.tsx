"use client";

import type React from "react";
import Link from "next/link";

import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGoogleLogin } from "@react-oauth/google";

import GoogleIcon from "@/components/icon/google-icon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const { user, onAuthenticateGoogle, loading } = useAuth();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      return onAuthenticateGoogle(tokenResponse);
    },
    onError: (tokenResponse) => console.error(tokenResponse),
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (!user && loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-r-transparent border-l-purple-600 border-b-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Haluland
              </span>
            </Link>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <button
                  type="submit"
                  onClick={() => login()}
                  disabled={loading}
                  className="flex justify-center items-center w-full space-x-2 bg-white py-2 text-gray-700 rounded-md border border-gray-200 hover:bg-blue-600/5 transition"
                >
                  <GoogleIcon size={20} />
                  <span className="text-sm">Sign in with Google</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Back to Haluland
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
