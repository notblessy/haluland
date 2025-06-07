"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

const breakingNews = [
  "Taylor Swift announces surprise album release for next month",
  "Marvel Studios reveals Phase 6 timeline at Comic-Con",
  "Netflix orders 10 new original series for 2024",
  "Grammy nominations announced with record-breaking diversity",
  "Box office records shattered by latest superhero blockbuster",
]

export function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <AlertCircle className="h-4 w-4 animate-pulse" />
            <Badge variant="secondary" className="bg-white text-red-600 font-bold text-xs">
              BREAKING
            </Badge>
          </div>

          <div className="flex-1 overflow-hidden">
            <div
              className="whitespace-nowrap transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {breakingNews.map((news, index) => (
                <span key={index} className="inline-block w-full text-sm font-medium">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
