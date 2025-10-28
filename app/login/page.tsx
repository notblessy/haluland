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
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 border-4 border-black border-t-transparent animate-spin"></div>
          <p className="font-black uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 border-4 border-black rotate-12"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 border-4 border-black rotate-[-15deg]"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-300 border-4 border-black rotate-45"></div>
      <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-blue-300 border-4 border-black rotate-[-25deg]"></div>

      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-20 w-20 border-4 border-black bg-white rotate-[-5deg] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all overflow-hidden">
                <div className="rotate-[5deg] relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Haluland Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-5xl font-black uppercase group-hover:text-purple-600 transition-colors">
                Haluland
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-8 space-y-6">
              <div className="space-y-3 text-center">
                <h1 className="text-3xl md:text-4xl font-black uppercase">
                  Welcome back
                </h1>
                <p className="text-lg font-bold">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  onClick={() => login()}
                  disabled={loading}
                  className="flex justify-center items-center w-full gap-3 bg-white hover:bg-gray-50 py-4 px-6 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <GoogleIcon size={24} />
                  <span>Sign in with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-4 border-black"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 font-black uppercase text-sm">
                      Secure Login
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-100 border-4 border-black p-4">
                  <p className="text-sm font-bold text-center">
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
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Haluland
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
