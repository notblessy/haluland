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
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-500 text-white p-2 border-4 border-black rotate-[-3deg]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-black uppercase">Trending Now</h2>
        </div>

        <div className="space-y-5">
          {stories?.records?.map((story, index) => (
            <Link key={story.id} href={`/stories/${story.slug}`}>
              <div className="flex items-start gap-4 p-5 border-4 border-black bg-white hover:bg-yellow-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white border-4 border-black flex items-center justify-center font-black text-lg">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm leading-tight line-clamp-2 mb-3">
                    {story.title}
                  </h3>

                  <div className="flex items-center flex-wrap gap-3 text-xs font-bold">
                    <div className="bg-blue-300 border-2 border-black px-2 py-1 uppercase">
                      {story?.category?.name}
                    </div>
                    <div className="flex items-center gap-1.5">
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

        <div className="mt-6 pt-4 border-t-4 border-black">
          <Link href="/search?sort=popular">
            <button className="w-full bg-black text-white font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              View All Trending →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
