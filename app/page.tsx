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
import { FeaturedCategories } from "@/components/featured-categories";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const featuredStory = stories?.records ? stories.records[0] : null;
  const regularStories = stories?.records?.slice(1);
  const topStories = stories?.records?.slice(0, 4);
  const moreStories = stories?.records?.slice(1, 13);
  const latestStories = stories?.records?.slice(0, 8);
  
  // Calculate reading time (approximate: 200 words per minute)
  const calculateReadingTime = (text: string | null | undefined) => {
    if (!text) return 1;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  useEffect(() => {
    if (categoryFilter) {
      onQuery({
        categorySlug: categoryFilter,
        size: 30,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    } else {
      onQuery({
        categorySlug: "",
        size: 30,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    }
  }, [categoryFilter, sortBy]);

  // Track when initial data is loaded
  useEffect(() => {
    if (!loading && stories?.records && stories.records.length > 0 && isInitialLoad) {
      // Start fade out animation
      setIsFadingOut(true);
      // Remove loader after fade out completes
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        setIsFadingOut(false);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [loading, stories, isInitialLoad]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  // Show fullscreen loader until initial data is loaded
  const shouldShowLoader = isInitialLoad && (loading || !stories?.records || stories.records.length === 0);

  return (
    <>
      {(shouldShowLoader || isFadingOut) && (
        <div 
          className={`fixed inset-0 bg-[#F5F1E8] flex items-center justify-center z-50 transition-opacity duration-500 ease-out ${
            isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#0C3E2D]" />
            <p className="text-sm font-semibold text-[#3D3529]">Loading stories...</p>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
        <Header />
        <BreakingNewsTicker />
        <CategoryNav />

      <main className="flex-grow">
        {/* Top News Cards Row */}
        <section className="bg-[#F5F1E8] border-b border-[#C4B5A0]/30">
          <div className="container mx-auto px-4 py-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#0C3E2D]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topStories?.map((story) => {
                  return (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                      className="group"
                    >
                      <div className="bg-white border border-[#C4B5A0]/40 hover:shadow-md transition-all duration-200 h-full rounded-xs overflow-hidden">
                        <div className="flex gap-3 p-4 h-full">
                          <div className="relative w-20 h-20 flex-shrink-0 border border-[#C4B5A0]/40 overflow-hidden rounded-xs">
                            <Image
                              src={story.thumbnail || "/placeholder.svg"}
                              alt={story.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            {story.category && (
                              <div className="inline-block bg-[#6B8E5A] text-white px-2 py-1 text-xs font-semibold uppercase mb-2 rounded-xs">
                                {story.category.name}
                              </div>
                            )}
                            <h3 className="font-semibold text-xs mb-2 text-[#3D3529] line-clamp-2 leading-snug">
                              {story.title}
                            </h3>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[#8B7355] text-xs">
                                <Calendar className="h-3 w-3" />
                                <span>{story.published_at ? formatDistanceToNow(new Date(story.published_at), { addSuffix: true }) : "Today"}</span>
                              </div>
                              {story.author && (
                                <div className="flex items-center gap-2 text-[#8B7355] text-xs">
                                  <User className="h-3 w-3" />
                                  <span className="truncate">{story.author.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Featured Story Card */}
          <section className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Featured Story Card */}
                <div className="lg:col-span-2">
                {loading ? (
                  <div className="flex items-center justify-center py-24">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0C3E2D]" />
                  </div>
                ) : featuredStory ? (
                    <Link
                      href={`/stories/${featuredStory.slug}`}
                      className="group block"
                    >
                    <div className="bg-white border border-[#C4B5A0]/40 hover:shadow-md transition-all duration-200 rounded-xs overflow-hidden">
                      {/* Featured Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#C4B5A0]/30">
                        <Image
                          src={featuredStory.thumbnail || "/placeholder.svg"}
                          alt={featuredStory.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {featuredStory.category && (
                          <div className="absolute top-4 left-4 bg-[#6B8E5A] text-white px-3 py-1 text-xs font-semibold uppercase rounded-xs border border-white/20">
                            {featuredStory.category.name}
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Sparkles className="h-6 w-6 text-[#D4A574]" />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-[#3D3529] leading-tight">
                          {featuredStory.title}
                        </h2>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs mb-4 pb-4 border-b border-[#C4B5A0]/30">
                          <div className="flex items-center gap-2 text-[#8B7355]">
                            <Calendar className="h-4 w-4" />
                            <span>{featuredStory.published_at ? formatDistanceToNow(new Date(featuredStory.published_at), { addSuffix: true }) : "Today"}</span>
                          </div>
                          {featuredStory.author && (
                            <div className="flex items-center gap-2 text-[#8B7355]">
                              <User className="h-4 w-4" />
                              <span>{featuredStory.author.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Description with BY AI badge */}
                        <div className="mb-6">
                          <p className="text-sm text-[#5A4A3A] mb-3 leading-relaxed">
                            {featuredStory.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {featuredStory.category && (
                              <span className="inline-block bg-[#6B8E5A] text-white px-3 py-1 text-xs font-semibold uppercase rounded-xs border border-[#6B8E5A]">
                                {featuredStory.category.name}
                              </span>
                            )}
                            <span className="inline-block bg-[#E8DDD4] text-[#5A4A3A] px-3 py-1 text-xs font-medium rounded-xs border border-[#C4B5A0]/40">
                              <Tag className="h-3 w-3 inline mr-1" />
                              Trending
                              </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="bg-white border border-[#0C3E2D] text-[#0C3E2D] text-xs font-semibold px-6 py-2 rounded-xs hover:bg-[#0C3E2D]/10 transition-colors flex items-center gap-2">
                            Read More
                            <ArrowRight className="h-3 w-3" />
                          </button>
                          <button className="bg-white border border-[#C4B5A0]/40 text-[#5A4A3A] px-4 py-2 rounded-xs hover:bg-[#F5F1E8] transition-colors flex items-center gap-2">
                            <Share2 className="h-3 w-3" />
                            <span className="text-xs">Share</span>
                          </button>
                          <button className="bg-white border border-[#C4B5A0]/40 text-[#5A4A3A] px-4 py-2 rounded-xs hover:bg-[#F5F1E8] transition-colors flex items-center gap-2">
                            <Bookmark className="h-3 w-3" />
                            <span className="text-xs">Save</span>
                          </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                ) : null}
                </div>

                {/* Trending Sidebar */}
                <div className="lg:col-span-1">
                <div className="bg-white border border-[#C4B5A0]/40 p-6 h-full rounded-xs">
                    <TrendingSection />
                </div>
              </div>
            </div>
          </section>

          {/* More Stories Grid */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-[#3D3529]">
                More Stories
              </h2>
              <Link href="/search">
                <button className="bg-white border border-[#C4B5A0]/60 text-[#5A4A3A] font-semibold px-6 py-3 text-sm flex items-center gap-2 rounded-xs hover:bg-[#F5F1E8] transition-colors">
                  View all stories
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#0C3E2D]" />
              </div>
            ) : moreStories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreStories?.slice(0, 9).map((story) => (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group block"
                    >
                    <div className="bg-white border border-[#C4B5A0]/40 hover:shadow-md transition-all duration-200 rounded-xs overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#C4B5A0]/30">
                          <Image
                            src={story.thumbnail || "/placeholder.svg"}
                            alt={story.title}
                            fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          {story.category && (
                            <div className="inline-block bg-[#6B8E5A] text-white px-3 py-1 text-xs font-semibold uppercase rounded-xs border border-[#6B8E5A]">
                              {story.category.name}
                            </div>
                          )}
                          <button className="text-[#8B7355] hover:text-[#5A4A3A] transition-colors">
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>
                        <h3 className="text-base font-semibold mb-2 leading-tight line-clamp-2 text-[#3D3529]">
                            {story.title}
                          </h3>
                        <p className="text-xs text-[#5A4A3A] mb-3 line-clamp-2 leading-relaxed">
                            {story.excerpt}
                          </p>
                        <div className="space-y-2 mb-3 pb-3 border-b border-[#C4B5A0]/30">
                          <div className="flex items-center justify-between text-xs">
                            {story.author && (
                              <div className="flex items-center gap-1 text-[#8B7355]">
                                <User className="h-3 w-3" />
                                <span>{story.author.name}</span>
                              </div>
                            )}
                            {story.published_at && (
                              <div className="flex items-center gap-1 text-[#8B7355]">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDistanceToNow(
                                  new Date(story.published_at),
                                  { addSuffix: true }
                                )}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 bg-white border border-[#0C3E2D] text-[#0C3E2D] text-xs font-semibold px-3 py-2 rounded-xs hover:bg-[#0C3E2D]/10 transition-colors">
                            Read
                          </button>
                          <button className="bg-white border border-[#C4B5A0]/40 text-[#5A4A3A] px-3 py-2 rounded-xs hover:bg-[#F5F1E8] transition-colors">
                            <Share2 className="h-3 w-3" />
                          </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#C4B5A0]/40 p-12 text-center rounded-xs">
                <p className="text-base font-semibold text-[#5A4A3A]">
                  {categoryFilter
                    ? `No stories found in ${categoryFilter} category.`
                    : "No stories found."}
                </p>
              </div>
            )}

            {moreStories?.length > 0 && (
              <div className="text-center mt-12">
                <Link href="/search">
                  <button className="bg-[#0C3E2D] text-white font-semibold px-8 py-4 text-base rounded-xs hover:bg-[#0A3225] transition-colors flex items-center gap-3 mx-auto">
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
                <h2 className="text-2xl md:text-3xl font-black uppercase text-[#3D3529] mb-2">
                  Latest Stories
                </h2>
                <p className="text-[#8B7355] text-xs">Stay updated with the most recent news and insights</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 font-semibold text-sm border border-[#C4B5A0]/60 rounded-xs transition-colors ${
                    sortBy === "latest"
                      ? "bg-[#0C3E2D] text-white border-[#0C3E2D]"
                      : "bg-white text-[#5A4A3A] hover:bg-[#F5F1E8]"
                  }`}
                  onClick={() => setSortBy("latest")}
                >
                  Latest
                </button>
                <button
                  className={`px-4 py-2 font-semibold text-sm border border-[#C4B5A0]/60 rounded-xs transition-colors ${
                    sortBy === "popular"
                      ? "bg-[#0C3E2D] text-white border-[#0C3E2D]"
                      : "bg-white text-[#5A4A3A] hover:bg-[#F5F1E8]"
                  }`}
                  onClick={() => setSortBy("popular")}
                >
                  Popular
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#0C3E2D]" />
              </div>
            ) : latestStories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestStories?.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                    className="group block"
                  >
                    <div className="bg-white border border-[#C4B5A0]/40 hover:shadow-md transition-all duration-200 h-full rounded-xs overflow-hidden">
                      <div className="relative aspect-[3/2] overflow-hidden border-b border-[#C4B5A0]/30">
                        <Image
                          src={story.thumbnail || "/placeholder.svg"}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {story.category && (
                          <div className="absolute top-2 left-2 bg-[#6B8E5A] text-white px-2 py-1 text-xs font-semibold uppercase rounded-xs border border-white/20">
                            {story.category.name}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold mb-2 leading-tight line-clamp-2 text-[#3D3529]">
                          {story.title}
                        </h3>
                        {story.author && (
                          <div className="flex items-center gap-1 text-xs text-[#8B7355] mb-2">
                            <User className="h-3 w-3" />
                            <span className="truncate max-w-[80px]">{story.author.name}</span>
                          </div>
                        )}
                        {story.published_at && (
                          <div className="text-xs text-[#8B7355]/70">
                            {formatDistanceToNow(new Date(story.published_at), { addSuffix: true })}
                </div>
                        )}
                  </div>
                </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>

          {/* Featured Categories */}
          <section className="mb-16">
            <FeaturedCategories />
          </section>

          {/* Statistics & Insights Section */}
          <section className="mb-16 bg-white border border-[#C4B5A0]/40 p-6 rounded-xs">
            <h2 className="text-xl md:text-2xl font-black uppercase text-[#3D3529] mb-4">Platform Insights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#0C3E2D] mb-1">1.2M+</div>
                <div className="text-xs text-[#8B7355] font-semibold">Total Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#0C3E2D] mb-1">45K+</div>
                <div className="text-xs text-[#8B7355] font-semibold">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#0C3E2D] mb-1">850+</div>
                <div className="text-xs text-[#8B7355] font-semibold">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#0C3E2D] mb-1">2.5M+</div>
                <div className="text-xs text-[#8B7355] font-semibold">Monthly Views</div>
              </div>
            </div>
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
      <div className="fixed inset-0 bg-[#F5F1E8] flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#0C3E2D]" />
          <p className="text-sm font-semibold text-[#3D3529]">Loading...</p>
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
