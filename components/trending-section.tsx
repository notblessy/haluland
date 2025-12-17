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

  return (
    <div>
      <div className="p-0">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-[#CD5756] text-white p-2 border border-[#C4B5A0]/40 rounded-xs">
            <TrendingUp className="h-4 w-4" />
          </div>
          <h2 className="text-base font-semibold text-[#3D3529]">Trending Now</h2>
        </div>

        <div className="space-y-3">
          {stories?.records?.map((story, index) => (
            <Link key={story.id} href={`/stories/${story.slug}`}>
              <div className="flex items-start my-5 gap-3 p-3 border border-[#C4B5A0]/40 bg-white hover:bg-[#F5F1E8] hover:shadow-md transition-all duration-200 rounded-xs group">
                <div className="flex-shrink-0 w-8 h-8 bg-[#0C3E2D] text-white border border-[#0C3E2D] flex items-center justify-center font-semibold text-xs rounded-xs">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs leading-tight line-clamp-2 mb-2 text-[#3D3529]">
                    {story.title}
                  </h3>

                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    {story?.category && (
                      <div className="bg-[#E8DDD4] text-[#5A4A3A] border border-[#C4B5A0]/40 px-1.5 py-0.5 rounded-xs font-normal text-xs">
                        {story.category.name}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[#8B7355]">
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
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#C4B5A0]/40">
          <Link href="/search?sort=popular">
            <button className="w-full bg-[#0C3E2D] text-white font-semibold text-sm px-4 py-2 rounded-xs hover:bg-[#0A3225] transition-colors">
              View All Trending →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
