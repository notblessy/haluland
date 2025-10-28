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
import { ArrowRight, Sparkles, TrendingUp, Clock, Zap } from "lucide-react";
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

  const featuredStory = stories?.records ? stories.records[0] : null;
  const regularStories = stories?.records?.slice(1);
  const topStories = stories?.records?.slice(0, 4);

  useEffect(() => {
    if (categoryFilter) {
      onQuery({
        categorySlug: categoryFilter,
        size: 10,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    } else {
      onQuery({
        categorySlug: "",
        size: 10,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    }
  }, [categoryFilter, sortBy]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <CategoryNav />

      <main className="flex-grow">
        {/* Top Stories Horizontal Scroll */}
        <section className="bg-yellow-300 border-b-4 border-black">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black text-white px-4 py-2 rotate-[-1deg]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Top Stories
              </h2>
              <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase">
                Today
              </div>
            </div>

            {loading ? (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex-none w-[300px]">
                    <div className="h-40 bg-gray-200 border-4 border-black"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {topStories?.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                    className="flex-none w-[300px] group"
                  >
                    <div className="h-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200">
                      <div className="flex gap-3 p-4">
                        <div className="relative w-24 h-24 flex-shrink-0 border-4 border-black overflow-hidden">
                          <Image
                            src={story.thumbnail || "/placeholder.svg"}
                            alt={story.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-blue-400 border-2 border-black text-black px-2 py-1 text-xs font-bold uppercase inline-block mb-2">
                            {story.category?.name || "News"}
                          </div>
                          <h3 className="font-bold text-sm line-clamp-2 leading-tight">
                            {story.title}
                          </h3>
                          <p className="text-xs font-mono mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {story.published_at &&
                              formatDistanceToNow(
                                new Date(story.published_at),
                                { addSuffix: true }
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Hero CTA Section */}
        <section className="bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 border-b-4 border-black relative overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 border-4 border-black rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 border-4 border-black rotate-[-15deg]"></div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-black text-yellow-300 px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] text-sm font-black uppercase mb-4">
                <Zap className="h-5 w-5" />
                Stay Informed, Stay Ahead
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none uppercase">
                Too busy? <br />
                <span className="bg-yellow-300 border-4 border-black px-4 inline-block rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  We've got the gist!
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-tight">
                Browse the best news on latest strategies, trends, and stories
                from around the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Link href="/search">
                  <button className="bg-yellow-300 text-black text-lg font-black uppercase px-10 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-3">
                    Get Started
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </Link>
                <div className="flex gap-4">
                  <button
                    className={`text-base font-black uppercase px-6 py-4 border-4 border-black transition-all duration-200 ${
                      sortBy === "latest"
                        ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    }`}
                    onClick={() => setSortBy("latest")}
                  >
                    Latest
                  </button>
                  <button
                    className={`text-base font-black uppercase px-6 py-4 border-4 border-black transition-all duration-200 ${
                      sortBy === "popular"
                        ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    }`}
                    onClick={() => setSortBy("popular")}
                  >
                    Popular
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Featured Story with Sidebar */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                {categoryFilter
                  ? `${
                      categoryFilter.charAt(0).toUpperCase() +
                      categoryFilter.slice(1)
                    } Headlines`
                  : "Featured Headlines"}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="aspect-[16/9] w-full bg-gray-200 border-4 border-black"></div>
                  <div className="mt-6 space-y-3">
                    <div className="h-10 w-3/4 bg-gray-200 border-4 border-black"></div>
                    <div className="h-4 w-full bg-gray-200 border-2 border-black"></div>
                    <div className="h-4 w-2/3 bg-gray-200 border-2 border-black"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-full min-h-[400px] bg-gray-200 border-4 border-black"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Featured Story */}
                <div className="lg:col-span-2">
                  {featuredStory && (
                    <Link
                      href={`/stories/${featuredStory.slug}`}
                      className="group block"
                    >
                      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 overflow-hidden">
                        <div className="relative aspect-[16/9] overflow-hidden border-b-4 border-black">
                          <Image
                            src={featuredStory.thumbnail || "/placeholder.svg"}
                            alt={featuredStory.title}
                            fill
                            className="object-cover"
                          />

                          {featuredStory.category && (
                            <div className="absolute top-6 left-6 bg-yellow-300 border-4 border-black text-black text-sm font-black uppercase px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                              {featuredStory.category.name}
                            </div>
                          )}
                        </div>

                        <div className="p-8 bg-white">
                          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight uppercase">
                            {featuredStory.title}
                          </h2>
                          <p className="text-lg font-bold mb-6 line-clamp-2">
                            {featuredStory.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm font-bold">
                            {featuredStory.author && (
                              <span className="bg-gray-100 border-2 border-black px-3 py-1">
                                {featuredStory.author.name}
                              </span>
                            )}
                            {featuredStory.published_at && (
                              <span className="flex items-center gap-2 bg-gray-100 border-2 border-black px-3 py-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(
                                  new Date(featuredStory.published_at),
                                  { addSuffix: true }
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Trending Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-blue-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 h-full">
                    <TrendingSection />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* More Stories Grid - Moved here for information density */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                More Stories
              </h2>
              <Link href="/search">
                <button className="bg-white border-4 border-black font-black uppercase px-6 py-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                  View all stories
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[4/3] w-full bg-gray-200 border-4 border-black"></div>
                    <div className="mt-4 space-y-3">
                      <div className="h-6 w-3/4 bg-gray-200 border-2 border-black"></div>
                      <div className="h-4 w-full bg-gray-200 border-2 border-black"></div>
                      <div className="h-4 w-1/2 bg-gray-200 border-2 border-black"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : regularStories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularStories?.slice(0, 6).map((story, index) => {
                  const colors = [
                    "bg-pink-200",
                    "bg-blue-200",
                    "bg-green-200",
                    "bg-yellow-200",
                    "bg-purple-200",
                    "bg-orange-200",
                  ];
                  const bgColor = colors[index % colors.length];

                  return (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group block"
                    >
                      <div
                        className={`${bgColor} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 overflow-hidden`}
                      >
                        <div className="relative aspect-[4/3] border-b-4 border-black overflow-hidden">
                          <Image
                            src={story.thumbnail || "/placeholder.svg"}
                            alt={story.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          {story.category && (
                            <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase mb-3 border-2 border-black">
                              {story.category.name}
                            </div>
                          )}
                          <h3 className="text-xl font-black mb-3 leading-tight line-clamp-2 uppercase">
                            {story.title}
                          </h3>
                          <p className="text-sm font-bold mb-4 line-clamp-2">
                            {story.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs font-bold">
                            {story.author && (
                              <span className="bg-white border-2 border-black px-2 py-1">
                                {story.author.name}
                              </span>
                            )}
                            {story.published_at && (
                              <span className="flex items-center gap-1">
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
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
                <p className="text-lg font-bold">
                  {categoryFilter
                    ? `No stories found in ${categoryFilter} category.`
                    : "No stories found."}
                </p>
              </div>
            )}

            {regularStories?.length > 0 && (
              <div className="text-center mt-12">
                <Link href="/search">
                  <button className="bg-yellow-300 text-black border-4 border-black font-black uppercase px-8 py-4 text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-3 mx-auto">
                    View More Stories
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            )}
          </section>

          {/* Newsletter Signup Section */}
          <section className="mb-16">
            <div className="relative bg-gradient-to-br from-green-300 via-yellow-300 to-pink-300 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 border-4 border-black rotate-45 translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 border-4 border-black rotate-12 -translate-x-24 translate-y-24"></div>

              <div className="relative grid md:grid-cols-2 gap-8 p-10 md:p-16">
                <div className="space-y-6 z-10">
                  <div className="space-y-4">
                    <div className="inline-block bg-black text-white px-4 py-2 border-4 border-black font-black uppercase text-sm rotate-[-2deg]">
                      Newsletter
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
                      Join the waitlist
                    </h2>
                    <p className="text-lg font-bold">
                      Get the latest news delivered straight to your inbox. Stay
                      updated with exclusive stories and insights.
                    </p>
                  </div>

                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white text-black border-4 border-black px-4 py-3 font-bold flex-1 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-black text-white font-black uppercase px-8 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                    >
                      Join
                    </button>
                  </form>

                  <p className="text-sm font-bold">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>

                <div className="relative hidden md:flex items-center justify-center z-10">
                  <div className="w-56 h-56 bg-white border-4 border-black rotate-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <Sparkles className="h-32 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="mb-16">
            <FeaturedCategories />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
