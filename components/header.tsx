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
import { Search, LogOut, PenTool, Home, Loader2 } from "lucide-react";
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
      <div className="flex items-center justify-center h-16 bg-[#FAFAFA] border-b border-gray-200">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a1a1a]" />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-blue-50 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Haluland Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wider whitespace-nowrap text-[#1a1a1a] group-hover:text-[#1a1a1a]/70 transition-colors">
              Haluland
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1a1a1a]/40" />
              <input
                type="search"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-[#FAFAFA] font-normal text-[#1a1a1a] focus:outline-none focus:border-black transition-all"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-10 w-10 border border-gray-300 bg-[#FAFAFA] hover:border-gray-300 transition-all font-semibold text-lg text-[#1a1a1a]">
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
                  className="w-56 border border-gray-300 bg-[#FAFAFA] shadow-lg"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-3 border-b border-gray-200">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-sm text-[#1a1a1a]">
                        {user.name}
                      </p>
                      <p className="w-[200px] truncate text-xs text-[#1a1a1a]/60">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className="flex items-center hover:bg-[#2a2a2a]/5 transition-colors px-3 py-2 text-[#1a1a1a]"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "JOURNALIST" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center hover:bg-[#2a2a2a]/5 transition-colors px-3 py-2 text-[#1a1a1a]"
                      >
                        <PenTool className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center hover:bg-[#2a2a2a]/5 transition-colors px-3 py-2 border-t border-gray-200 text-[#1a1a1a]"
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
                  <button className="bg-[#FAFAFA] text-[#1a1a1a] font-semibold px-6 py-2 border border-gray-300 hover:border-gray-300 hover:bg-[#2a2a2a]/5 transition-colors uppercase text-xs tracking-wider">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1a1a1a]/40" />
              <input
                type="search"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-[#FAFAFA] font-normal text-[#1a1a1a] focus:outline-none focus:border-black transition-all"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
