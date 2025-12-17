"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, LogOut, PenTool, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const { user, onLogout, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    router.push("/");
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-16 bg-white border-b border-[#C4B5A0]/40">
        <div className="h-8 w-8 border-2 border-t-transparent border-r-transparent border-l-[#6B8E5A] border-b-[#0C3E2D] animate-spin" />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C4B5A0]/40 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 border border-[#C4B5A0]/40 bg-white flex items-center justify-center hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Haluland Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-2xl font-semibold whitespace-nowrap text-[#3D3529] group-hover:text-[#0C3E2D] transition-colors">
              haluland
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8B7355]" />
              <input
                type="search"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#C4B5A0]/60 bg-white font-normal text-[#3D3529] focus:outline-none focus:ring-2 focus:ring-[#0C3E2D]/30 focus:border-[#0C3E2D] transition-all"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-10 w-10 border border-[#C4B5A0]/40 bg-gradient-to-br from-[#6B8E5A] to-[#A8C5A0] hover:shadow-md transition-all font-semibold text-lg text-white">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border border-[#C4B5A0]/40 bg-white shadow-md"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-3 border-b border-[#C4B5A0]/40">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-sm text-[#3D3529]">
                        {user.name}
                      </p>
                      <p className="w-[200px] truncate text-xs text-[#8B7355]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className="flex items-center hover:bg-[#F5F1E8] transition-colors px-3 py-2 text-[#3D3529]"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "JOURNALIST" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center hover:bg-[#F5F1E8] transition-colors px-3 py-2 text-[#3D3529]"
                      >
                        <PenTool className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center hover:bg-[#F5F1E8] transition-colors px-3 py-2 border-t border-[#C4B5A0]/40 text-[#0C3E2D]"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!user && !loading && (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <button className="bg-[#0C3E2D] text-white font-semibold px-6 py-2 border border-[#0C3E2D] hover:bg-[#0A3225] transition-colors">
                    Log in
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8B7355]" />
              <input
                type="search"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#C4B5A0]/60 bg-white font-normal text-[#3D3529] focus:outline-none focus:ring-2 focus:ring-[#0C3E2D]/30 focus:border-[#0C3E2D] transition-all"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
