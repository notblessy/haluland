"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/lib/auth-context";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/components/icon/google-icon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
      <div className="flex items-center justify-center h-screen bg-[#F5F1E8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-2 border-[#0C3E2D] border-t-transparent animate-spin rounded-xs"></div>
          <p className="text-sm font-semibold text-[#3D3529]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-16 w-16 border border-[#C4B5A0]/40 bg-white flex items-center justify-center hover:shadow-md transition-all overflow-hidden rounded-xs">
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
              <span className="text-3xl font-semibold group-hover:text-[#0C3E2D] transition-colors text-[#3D3529]">
                Haluland
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-[#C4B5A0]/40 rounded-xs shadow-sm">
            <div className="p-8 space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl md:text-3xl font-black uppercase text-[#3D3529]">
                  Welcome back
                </h1>
                <p className="text-sm text-[#5A4A3A]">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  onClick={() => login()}
                  disabled={loading}
                  className="flex justify-center items-center w-full gap-3 bg-white hover:bg-[#F5F1E8] py-3 px-6 font-semibold text-sm border border-[#C4B5A0]/60 rounded-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#3D3529]"
                >
                  <GoogleIcon size={20} />
                  <span>Sign in with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#C4B5A0]/40"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs font-semibold text-[#8B7355]">
                      Secure Login
                    </span>
                  </div>
                </div>

                <div className="bg-[#E8DDD4] border border-[#C4B5A0]/40 p-4 rounded-xs">
                  <p className="text-xs text-center text-[#5A4A3A]">
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
              className="inline-flex items-center gap-2 bg-[#0C3E2D] text-white px-6 py-3 font-semibold text-sm rounded-xs hover:bg-[#0A3225] transition-colors"
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
