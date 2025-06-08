"use client";

import type React from "react";
import useSWR, { mutate } from "swr";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useCookies } from "react-cookie";

import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "USER" | "JOURNALIST";

export interface UserType {
  id: string;
  username: string | null;
  email: string;
  name: string;
  picture: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  loading: boolean;
  user: UserType | null;
  onAuthenticateGoogle: (data: any) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  onAuthenticateGoogle: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [accessToken, setAccessToken] = useState(cookies.accessToken || "");

  const {
    data: user,
    error,
    isLoading,
    isValidating,
  } = useSWR(() => (accessToken ? "/v1/users/me" : null), {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (cookies.accessToken) {
      setAccessToken(cookies.accessToken);
    }
  }, [cookies]);

  const [loading, setLoading] = useState(false);

  const onAuthenticateGoogle = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const { data: res } = await api.post("/v1/auth/google", data);

        if (res.data && res.success) {
          var expiredAt = new Date();
          expiredAt.setMonth(expiredAt.getMonth() + 1);

          setAccessToken(res.data.token);
          setCookie("accessToken", res.data.token, {
            path: "/",
            expires: expiredAt,
          });

          router.push("/");
          setTimeout(async () => {
            await mutate("/v1/users/me");
          }, 500);
        } else if (res.success && !res.data) {
          toast({
            title: "Login failed",
            description: res.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Login failed",
          description: "An error occurred during login.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [setCookie, toast]
  );

  const onLogout = () => {
    setAccessToken("");
    removeCookie("accessToken", { path: "/" });
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading || isValidating || loading,
        user: user?.data,
        onAuthenticateGoogle,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
