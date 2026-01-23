"use client";

import Link from "next/link";
import { TrendingUp, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSearch } from "@/hooks/use-search";
import { useEffect } from "react";

interface TrendingStory {
  id: string;
  title: string;
  slug: string;
  views_count: number;
  published_at: string;
  category: {
    name: string;
    slug: string;
  };
}

export function TrendingSection() {
  const { data: stories, onQuery } = useSearch();

  // add initial query for trending stories
  useEffect(() => {
    onQuery({
      size: 5,
      sort: "-popular",
    });
  }, [onQuery]);

  const colors = [
    "bg-pink-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-orange-50",
  ];

  return (
    <div>
      <div className="p-0">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-green-800 text-white p-2 border-2 border-green-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold uppercase tracking-wider text-[#1a1a1a]">Trending Now</h2>
        </div>

        <div className="space-y-6">
          {stories?.records?.map((story, index) => {
            const bgColor = colors[index % colors.length];
            return (
              <Link key={story.id} href={`/stories/${story.slug}`}>
                <div className={`${bgColor} my-3 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 p-4 group`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_0px_rgba(26,26,26,0.3)]">
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm leading-tight line-clamp-2 mb-2 text-[#1a1a1a]">
                        {story.title}
                      </h3>

                      <div className="flex items-center flex-wrap gap-2 text-xs">
                        {story?.category && (
                          <div className="text-gray-600 px-2 py-0.5 font-medium uppercase tracking-wider text-[10px] bg-white/50 border border-gray-300">
                            {story.category.name}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(
                              new Date(story?.published_at as string),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-[#1a1a1a]">
          <Link href="/search?sort=popular">
            <button className="w-full bg-[#FAFAFA] border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs px-4 py-2 hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              View All Trending →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
