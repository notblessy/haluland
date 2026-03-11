"use client";

import { cn } from "@/lib/utils";

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
