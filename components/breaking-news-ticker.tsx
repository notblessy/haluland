"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { useBreaking } from "@/hooks/use-story";

export function BreakingNewsTicker() {
  const { data: breakingNews } = useBreaking();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-500 text-black py-3 overflow-hidden border-b-4 border-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-black text-yellow-300 p-2 border-4 border-black rotate-[-5deg] animate-pulse">
              <Zap className="h-4 w-4" />
            </div>
            <div className="bg-white text-red-500 border-4 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              BREAKING
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden relative"
            style={{ minHeight: 28 }}
          >
            {breakingNews?.map((news, index) => (
              <span
                key={index}
                className={`absolute left-0 top-0 w-full text-base font-black uppercase transition-opacity duration-500 ease-in-out ${
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
