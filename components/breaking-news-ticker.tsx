"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { useBreaking } from "@/hooks/use-story";

export function BreakingNewsTicker() {
  const { data: breakingNews } = useBreaking();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!breakingNews || breakingNews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [breakingNews]);

  return (
    <div className="bg-[#CD5756] text-white py-3 overflow-hidden border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-yellow-100 text-[#1a1a1a] p-2 border border-yellow-200">
              <Zap className="h-4 w-4" />
            </div>
            <div className="bg-white text-[#CD5756] border border-white/20 px-3 py-1 font-bold text-xs uppercase tracking-wider">
              BREAKING
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden relative flex items-center"
            style={{ minHeight: 28 }}
          >
            {breakingNews?.map((news, index) => (
              <span
                key={index}
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full text-sm font-medium transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                } ${index === currentIndex ? "z-10" : "z-0"}`}
                style={{
                  whiteSpace: "nowrap",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                  pointerEvents: index === currentIndex ? "auto" : "none",
                }}
              >
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
