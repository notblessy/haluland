"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/toaster";

export default function Provider({
  googleClientId,
  children,
}: {
  googleClientId?: string;
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher,
      }}
    >
      <CookiesProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={googleClientId || ""}>
            {children}
            <Toaster />
          </GoogleOAuthProvider>
        </AuthProvider>
      </CookiesProvider>
    </SWRConfig>
  );
}
