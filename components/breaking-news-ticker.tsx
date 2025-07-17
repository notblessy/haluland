"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
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
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <AlertCircle className="h-4 w-4 animate-pulse" />
            <Badge
              variant="secondary"
              className="bg-white text-red-600 font-bold text-xs"
            >
              BREAKING
            </Badge>
          </div>

          <div className="flex-1 overflow-hidden relative" style={{ minHeight: 24 }}>
            {breakingNews?.map((news, index) => (
              <span
                key={index}
                className={`absolute left-0 top-0 w-full text-sm font-medium transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex ? 'z-10' : 'z-0'}`}
                style={{
                  whiteSpace: 'nowrap',
                  paddingRight: '1rem',
                  paddingLeft: '1rem',
                  pointerEvents: index === currentIndex ? 'auto' : 'none',
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
