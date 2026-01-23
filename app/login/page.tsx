"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/lib/auth-context";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/components/icon/google-icon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

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
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#1a1a1a]" />
          <p className="text-sm font-semibold text-[#1a1a1a]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-16 w-16 border border-gray-300 bg-[#FAFAFA] flex items-center justify-center hover:border-gray-400 transition-all overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Haluland Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-3xl font-bold tracking-wider group-hover:text-[#1a1a1a]/70 transition-colors text-[#1a1a1a]">
                Haluland
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-[#FAFAFA] border border-gray-200">
            <div className="p-8 space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#1a1a1a]">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-600">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  onClick={() => login()}
                  disabled={loading}
                  className="flex justify-center items-center w-full gap-3 bg-[#FAFAFA] hover:bg-gray-100 py-3 px-6 font-bold uppercase tracking-wider text-xs border border-gray-300 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1a1a]"
                >
                  <GoogleIcon size={20} />
                  <span>Sign in with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#FAFAFA] px-4 text-xs font-semibold text-gray-600">
                      Secure Login
                    </span>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] border border-gray-200 p-4">
                  <p className="text-xs text-center text-gray-600">
                    🔒 Your data is protected and secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#2a2a2a] text-white px-6 py-3 font-bold uppercase tracking-wider text-xs hover:bg-[#3a3a3a] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Haluland
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
