"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { CategoryNav } from "@/components/category-nav";
import { StoryCard } from "@/components/story-card";
import { mockStories, type Story } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BreakingNewsTicker } from "@/components/breaking-news-ticker";
import { TrendingSection } from "@/components/trending-section";
import { EditorPicks } from "@/components/editor-picks";
import { FeaturedCategories } from "@/components/featured-categories";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Footer } from "@/components/footer";
import Link from "next/link";

function HomeContent() {
  const searchParams = useSearchParams();

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    // Simulate API call
    const loadStories = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading

      let filteredStories = mockStories.filter(
        (story) => story.status === "PUBLISHED"
      );

      if (categoryFilter) {
        filteredStories = filteredStories.filter(
          (story) => story.category?.slug === categoryFilter
        );
      }

      // Sort stories
      if (sortBy === "latest") {
        filteredStories.sort(
          (a, b) =>
            new Date(b.published_at || b.created_at).getTime() -
            new Date(a.published_at || a.created_at).getTime()
        );
      } else {
        filteredStories.sort(
          (a, b) => (b.views_count || 0) - (a.views_count || 0)
        );
      }

      setStories(filteredStories);
      setLoading(false);
    };

    loadStories();
  }, [categoryFilter, sortBy]);

  const featuredStory = stories[0];
  const regularStories = stories.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <CategoryNav />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              {categoryFilter
                ? `${
                    categoryFilter.charAt(0).toUpperCase() +
                    categoryFilter.slice(1)
                  } Stories`
                : "Latest Stories"}
            </h1>
            <div className="flex space-x-2">
              <Button
                variant={sortBy === "latest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("latest")}
              >
                Latest
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("popular")}
              >
                Popular
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Skeleton className="aspect-[16/9] w-full rounded-xl" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Featured Story */}
              <div className="lg:col-span-3">
                {featuredStory && <StoryCard story={featuredStory} featured />}
              </div>

              {/* Trending Sidebar */}
              <div className="lg:col-span-1">
                <TrendingSection />
              </div>
            </div>
          )}
        </section>

        {/* Editor's Picks */}
        <EditorPicks />

        {/* Regular Stories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">More Stories</h2>
            <Link
              href="/search"
              className="text-primary hover:underline text-sm font-medium"
            >
              View all stories →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : regularStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularStories.slice(0, 6).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {categoryFilter
                  ? `No stories found in ${categoryFilter} category.`
                  : "No stories found."}
              </p>
            </div>
          )}
        </section>

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* Newsletter Signup */}
        <section className="py-12">
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </section>
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
