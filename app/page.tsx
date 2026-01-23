"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { CategoryNav } from "@/components/category-nav";
import { StoryCard } from "@/components/story-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BreakingNewsTicker } from "@/components/breaking-news-ticker";
import { TrendingSection } from "@/components/trending-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "@/hooks/use-search";
import { ArrowRight, Sparkles, TrendingUp, Clock, Zap, Gift, Calendar, Play, User, Eye, Share2, BookOpen, Tag, TrendingDown, MessageSquare, ThumbsUp, Bookmark, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function HomeContent() {
  const searchParams = useSearchParams();

  const {
    data: stories,
    loading,
    loadingMore,
    onQuery,
    loadMore,
    hasNext,
  } = useSearch();

  const categoryFilter = searchParams.get("category");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [email, setEmail] = useState("");
  const [hasInitialQuery, setHasInitialQuery] = useState(false);

  const featuredStory = stories?.records ? stories.records[0] : null;
  const regularStories = stories?.records?.slice(1);
  const moreStories = stories?.records?.slice(1, 13);
  const latestStories = stories?.records?.slice(0, 8);
  
  // Calculate reading time (approximate: 200 words per minute)
  const calculateReadingTime = (text: string | null | undefined) => {
    if (!text) return 1;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  // Initial query on mount
  useEffect(() => {
    if (!hasInitialQuery) {
      onQuery({
        categorySlug: categoryFilter || "",
        size: 30,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
      setHasInitialQuery(true);
    }
  }, []);

  // Update query when filters change
  useEffect(() => {
    if (hasInitialQuery) {
      onQuery({
        categorySlug: categoryFilter || "",
        size: 30,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    }
  }, [categoryFilter, sortBy, hasInitialQuery]);


  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  // Show fullscreen loader until ALL content is loaded
  const shouldShowLoader = loading;
  const hasStories = stories?.records && stories.records.length > 0;
  const shouldShowTrending = !categoryFilter || hasStories;

  // Don't show page content until loading is complete
  if (shouldShowLoader) {
    return (
      <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#1a1a1a]" />
          <p className="text-sm font-semibold text-[#1a1a1a]">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <BreakingNewsTicker />
        <CategoryNav />

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Featured Story Card */}
          <section className="mb-16">
              <div className={`grid grid-cols-1 ${shouldShowTrending ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
              {/* Main Featured Story Card */}
                <div className={shouldShowTrending ? "lg:col-span-2" : "lg:col-span-1"}>
                {featuredStory ? (
                    <Link
                      href={`/stories/${featuredStory.slug}`}
                      className="group block"
                    >
                    <div className="bg-blue-50 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">
                      {/* Featured Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-[#1a1a1a]">
                        <Image
                          src={featuredStory.thumbnail || "/placeholder.svg"}
                          alt={featuredStory.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-6 bg-blue-50">
                        {/* Category */}
                        {featuredStory.category && (
                          <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-2">
                            {featuredStory.category.name}
                          </div>
                        )}
                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1a1a1a] leading-tight">
                          {featuredStory.title}
                        </h2>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-center gap-2 text-[#1a1a1a]/50">
                            <Calendar className="h-4 w-4" />
                            <span>{featuredStory.published_at ? formatDistanceToNow(new Date(featuredStory.published_at), { addSuffix: true }) : "Today"}</span>
                          </div>
                          {featuredStory.author && (
                            <div className="flex items-center gap-2 text-[#1a1a1a]/50">
                              <User className="h-4 w-4" />
                              <span>{featuredStory.author.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <p className="text-sm text-[#1a1a1a]/70 mb-3 leading-relaxed line-clamp-3">
                            {featuredStory.excerpt}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="bg-[#2a2a2a] text-white text-xs font-bold uppercase tracking-wider px-6 py-2 hover:bg-[#2a2a2a]/90 transition-colors flex items-center gap-2">
                            Read More
                            <ArrowRight className="h-3 w-3" />
                          </button>
                          <button className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] px-4 py-2 hover:border-gray-300 transition-colors flex items-center gap-2">
                            <Share2 className="h-3 w-3" />
                            <span className="text-xs uppercase tracking-wider">Share</span>
                          </button>
                          <button className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] px-4 py-2 hover:border-gray-300 transition-colors flex items-center gap-2">
                            <Bookmark className="h-3 w-3" />
                            <span className="text-xs uppercase tracking-wider">Save</span>
                          </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                ) : null}
                </div>

                {/* Trending Sidebar */}
                {shouldShowTrending && (
                  <div className="lg:col-span-1">
                    <div className="px-6 h-full">
                      <TrendingSection />
                    </div>
                  </div>
                )}
            </div>
          </section>

          {/* More Stories Grid */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#1a1a1a]">
                More Stories
              </h2>
              <Link href="/search">
                <button className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] font-bold uppercase tracking-wider px-6 py-3 text-xs flex items-center gap-2 hover:border-gray-300 transition-colors">
                  View all stories
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {moreStories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreStories?.slice(0, 9).map((story, index) => {
                  const colors = [
                    "bg-pink-50",
                    "bg-blue-50",
                    "bg-green-50",
                    "bg-yellow-50",
                    "bg-purple-50",
                    "bg-orange-50",
                  ];
                  const bgColor = colors[index % colors.length];
                  
                  return (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group block"
                    >
                    <div className={`${bgColor} border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden`}>
                      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#1a1a1a]">
                          <Image
                            src={story.thumbnail || "/placeholder.svg"}
                            alt={story.title}
                            fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      <div className="p-4">
                        {story.category && (
                          <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-2">
                            {story.category.name}
                          </div>
                        )}
                        <h3 className="text-base font-bold mb-2 leading-tight line-clamp-2 text-[#1a1a1a]">
                            {story.title}
                          </h3>
                        <p className="text-xs font-normal mb-3 line-clamp-2 text-gray-600">
                            {story.excerpt}
                          </p>
                        <div className="flex items-center justify-between text-xs mb-2">
                            {story.author && (
                              <span className="text-gray-600">
                                {story.author.name}
                              </span>
                            )}
                            {story.published_at && (
                              <span className="flex items-center gap-1 text-gray-600">
                                {formatDistanceToNow(
                                  new Date(story.published_at),
                                  { addSuffix: true }
                                )}
                              </span>
                            )}
                        </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#FAFAFA] border border-gray-200 p-12 text-center">
                <p className="text-base font-semibold text-[#1a1a1a]/60">
                  {categoryFilter
                    ? `No stories found in ${categoryFilter} category.`
                    : "No stories found."}
                </p>
              </div>
            )}

            {moreStories?.length > 0 && (
              <div className="text-center mt-12">
                <Link href="/search">
                  <button className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] font-bold uppercase tracking-wider px-8 py-4 text-sm hover:border-gray-400 transition-colors flex items-center gap-3 mx-auto">
                    View More Stories
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            )}
          </section>

          {/* Latest Stories Section */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#1a1a1a] mb-2">
                  Latest Stories
                </h2>
                <p className="text-[#1a1a1a]/50 text-xs">Stay updated with the most recent news and insights</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 font-bold uppercase tracking-wider text-xs border border-gray-300 transition-colors ${
                    sortBy === "latest"
                      ? "bg-[#2a2a2a] text-white border-black"
                      : "bg-[#FAFAFA] text-[#1a1a1a] hover:border-gray-300"
                  }`}
                  onClick={() => setSortBy("latest")}
                >
                  Latest
                </button>
                <button
                  className={`px-4 py-2 font-bold uppercase tracking-wider text-xs border border-gray-300 transition-colors ${
                    sortBy === "popular"
                      ? "bg-[#2a2a2a] text-white border-black"
                      : "bg-[#FAFAFA] text-[#1a1a1a] hover:border-gray-300"
                  }`}
                  onClick={() => setSortBy("popular")}
                >
                  Popular
                </button>
              </div>
            </div>

            {latestStories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestStories?.map((story, index) => {
                  const colors = [
                    "bg-pink-50",
                    "bg-blue-50",
                    "bg-green-50",
                    "bg-yellow-50",
                    "bg-purple-50",
                    "bg-orange-50",
                  ];
                  const bgColor = colors[index % colors.length];
                  
                  return (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group block"
                    >
                    <div className={`${bgColor} border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 h-full overflow-hidden`}>
                      <div className="relative aspect-[3/2] overflow-hidden border-b-2 border-[#1a1a1a]">
                        <Image
                          src={story.thumbnail || "/placeholder.svg"}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-bold mb-1 leading-tight line-clamp-2 text-[#1a1a1a]">
                          {story.title}
                        </h3>
                        {story.category && (
                          <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-2">
                            {story.category.name}
                          </div>
                        )}
                        {story.author && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                            <User className="h-3 w-3" />
                            <span className="truncate max-w-[80px]">{story.author.name}</span>
                          </div>
                        )}
                        {story.published_at && (
                          <div className="text-xs text-gray-600">
                            {formatDistanceToNow(new Date(story.published_at), { addSuffix: true })}
                          </div>
                        )}
                  </div>
                </div>
                  </Link>
                  );
                })}
              </div>
            ) : null}
          </section>

        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

function HomePageWithLoading() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#1a1a1a]" />
          <p className="text-sm font-semibold text-[#1a1a1a]">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

export default function HomePage() {
  return <HomePageWithLoading />;
}
