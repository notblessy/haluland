"use client";

import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, BookOpen, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AdBannerPlaceholderProps = {
  className?: string;
};

export function AdBannerPlaceholder({ className }: AdBannerPlaceholderProps) {
  return (
    <div
      role="region"
      aria-label="Advertisement Banner"
      className={cn("w-full mx-auto max-w-5xl", className)}
    >
      <div className="w-full border-2 border-[#1a1a1a] bg-gradient-to-r from-[#FFF0F5] via-[#FDF7E3] to-[#E8F7FF] shadow-[4px_4px_0px_0px_rgba(26,26,26,0.15)] overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg md:text-xl font-extrabold tracking-wide text-[#1a1a1a]">
                Ekspresi Film
              </h3>
              <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[#1a1a1a] text-white px-2 py-1">
                Coming Soon
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#1a1a1a]/70 line-clamp-2">
              A platform for short and indie films, giving creators space to
              share their work. Express your ideas and reach new audiences.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#"
              aria-label="Express your idea on Ekspresi Film"
              className="bg-[#2a2a2a] text-white text-xs md:text-sm font-bold uppercase tracking-wider px-4 md:px-6 py-2 hover:bg-[#2a2a2a]/90 transition-colors"
            >
              Express Your Idea
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

type SideAdBannersProps = {
  topOffset?: number; // fine-tune vertical position
  gap?: number; // gap from container edge
  containerWidth?: number; // matches max-w-5xl (1024)
  bannerWidth?: number;
  bannerHeight?: number;
  anchorId?: string; // element id to align top with (featured/trending)
};

export function SideAdBanners({
  topOffset = 0,
  gap = 24,
  containerWidth = 1024,
  bannerWidth = 160,
  bannerHeight = 660,
  anchorId = "featured-anchor",
}: SideAdBannersProps) {
  const leftPos = `calc(50% - ${
    containerWidth / 2
  }px - ${bannerWidth}px - ${gap}px)`;
  const rightPos = `calc(50% + ${containerWidth / 2}px + ${gap}px)`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [computedTop, setComputedTop] = useState<number>(0);

  useEffect(() => {
    const updateTop = () => {
      const anchorEl = document.getElementById(anchorId);
      const parentEl = wrapperRef.current?.offsetParent as HTMLElement | null;
      if (anchorEl && parentEl) {
        const anchorRect = anchorEl.getBoundingClientRect();
        const parentRect = parentEl.getBoundingClientRect();
        const top = anchorRect.top - parentRect.top + topOffset;
        setComputedTop(Math.max(0, Math.round(top)));
      }
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [anchorId, topOffset]);

  return (
    <>
      {/* Left Vertical Banner (Haluland) */}
      <div
        role="region"
        aria-label="Left Advertisement Banner"
        ref={wrapperRef}
        className="hidden xl:block absolute z-30"
        style={{
          top: computedTop,
          left: leftPos,
          width: bannerWidth,
          height: bannerHeight,
        }}
      >
        <div className="relative w-full h-full border-2 border-[#1a1a1a] bg-gradient-to-b from-[#E8F7FF] via-white to-[#FFF0F5] shadow-[4px_4px_0px_0px_rgba(26,26,26,0.15)] overflow-hidden p-4 flex flex-col">
          <div className="text-center">
            <h4 className="text-base font-extrabold tracking-wide text-[#1a1a1a]">
              HALULAND
            </h4>
            <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider bg-[#1a1a1a] text-white px-2 py-1">
              Explore Daily
            </span>
            <p className="text-[11px] text-[#1a1a1a]/60 mt-2">
              Captivating stories • Culture • Trends
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              <BookOpen className="h-3 w-3 text-[#1a1a1a]/70" />
              <span className="text-[11px] text-[#1a1a1a]/80">
                Deep Dives & Editor Picks
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              <TrendingUp className="h-3 w-3 text-[#1a1a1a]/70" />
              <span className="text-[11px] text-[#1a1a1a]/80">
                Trending Now & Insights
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              <Sparkles className="h-3 w-3 text-[#1a1a1a]/70" />
              <span className="text-[11px] text-[#1a1a1a]/80">
                Fresh Perspectives
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Music
            </span>
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Movies
            </span>
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              TV Shows
            </span>
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Pop Culture
            </span>
          </div>
          <div className="mt-auto text-center">
            <a
              href="#"
              className="inline-block bg-[#2a2a2a] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 hover:bg-[#2a2a2a]/90"
            >
              Read Today
            </a>
          </div>
        </div>
      </div>

      {/* Right Vertical Banner (Nada Nessa) */}
      <div
        role="region"
        aria-label="Right Advertisement Banner"
        className="hidden xl:block absolute z-30"
        style={{
          top: computedTop,
          left: rightPos,
          width: bannerWidth,
          height: bannerHeight,
        }}
      >
        <div className="relative w-full h-full border-2 border-[#1a1a1a] bg-gradient-to-b from-[#FFF0F5] via-white to-[#E8F7FF] shadow-[4px_4px_0px_0px_rgba(26,26,26,0.15)] overflow-hidden p-4 flex flex-col">
          <div className="text-center">
            <h4 className="text-base font-extrabold tracking-wide text-[#1a1a1a]">
              Nada Nessa
            </h4>
            <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider bg-[#1a1a1a] text-white px-2 py-1">
              Coming Feb 14
            </span>
            <p className="text-[11px] text-[#1a1a1a]/60 mt-2">
              Bossanova × Keroncong vibes
            </p>
          </div>
          <div
            className="mt-4 w-full border-2 border-[#1a1a1a]/20 bg-gradient-to-br from-[#FFF0F5] via-white to-[#E8F7FF] h-28"
            aria-label="Metafora cover art placeholder"
          />
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Indie
            </span>
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Fusion
            </span>
            <span className="text-[10px] uppercase tracking-wider border border-[#1a1a1a]/20 bg-white/70 px-2 py-1">
              Acoustic
            </span>
          </div>
          <div className="mt-3 flex-1 border border-[#1a1a1a]/20 bg-white/70 p-3 flex flex-col">
            <div className="flex items-center gap-2">
              <Music2 className="h-3 w-3 text-[#1a1a1a]/70" />
              <div className="text-[11px]">
                <p className="font-semibold text-[#1a1a1a]">“Metafora”</p>
                <p className="text-[#1a1a1a]/60">Debut Single • Feb 14</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[#1a1a1a]/70">
              Layers of meaning drift through warm bossanova textures and
              timeless keroncong rhythms.
            </p>
            <div className="mt-3 flex items-end gap-[3px] h-16">
              <div
                className="w-[3px] bg-[#1a1a1a]/20 h-6 animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/30 h-10 animate-pulse"
                style={{ animationDelay: "100ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/20 h-8 animate-pulse"
                style={{ animationDelay: "200ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/30 h-12 animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/20 h-9 animate-pulse"
                style={{ animationDelay: "400ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/30 h-11 animate-pulse"
                style={{ animationDelay: "500ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/20 h-7 animate-pulse"
                style={{ animationDelay: "600ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/30 h-13 animate-pulse"
                style={{ animationDelay: "700ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/20 h-9 animate-pulse"
                style={{ animationDelay: "800ms" }}
              />
              <div
                className="w-[3px] bg-[#1a1a1a]/30 h-12 animate-pulse"
                style={{ animationDelay: "900ms" }}
              />
            </div>
            <p className="mt-3 text-[10px] text-[#1a1a1a]/50 italic">
              “Melodi yang menari—metafora hati.”
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
