"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StoryCard } from "@/components/story-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { useTagOptions } from "@/hooks/use-tags";
import { useCategoryOptions } from "@/hooks/use-categories";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

function SearchContent() {
  const searchParams = useSearchParams();

  const {
    data: stories,
    loading,
    loadingMore,
    onQuery,
    loadMore,
    hasNext,
  } = useSearch();

  const { data: tagOptions } = useTagOptions();
  const { data: categoryOptions } = useCategoryOptions();

  // Infinite scroll hook
  const infiniteScrollRef = useInfiniteScroll({
    hasNext,
    loading: loadingMore,
    onLoadMore: loadMore,
  });

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  useEffect(() => {
    if (searchQuery) {
      onQuery({
        search: searchQuery,
        size: 6,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    }

    if (selectedCategory) {
      if (selectedCategory === "all") {
        onQuery({
          categoryId: undefined,
          size: 6,
          sort: sortBy === "latest" ? "-published_at" : "-popular",
        });
      } else {
        onQuery({
          categoryId: selectedCategory,
          size: 6,
          sort: sortBy === "latest" ? "-published_at" : "-popular",
        });
      }
    }

    if (selectedTags) {
      onQuery({
        tagIds: selectedTags,
        size: 6,
        sort: sortBy === "latest" ? "-published_at" : "-popular",
      });
    }

    if (sortBy === "latest") {
      onQuery({
        sort: "-published_at",
      });
    } else {
      onQuery({
        sort: "-popular",
      });
    }
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleTagToggle = (tagSlug: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagSlug)
        ? prev.filter((t) => t !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTags([]);
    setSearchQuery("");

    // remove ?q from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());

    onQuery({
      search: "",
      categoryId: "",
      tagIds: [],
      size: 6,
      sort: sortBy === "latest" ? "-published_at" : "-popular",
    });
  };

  const hasActiveFilters =
    selectedCategory || selectedTags.length > 0 || searchQuery;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-8">
            Search Results
          </h1>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
            <input
              type="search"
              placeholder="Search stories, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg font-bold border-4 border-black focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-2 border-4 border-black rotate-[-3deg]">
                <Filter className="h-5 w-5" />
              </div>
              <span className="text-lg font-black uppercase">Filters:</span>
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px] border-4 border-black font-bold h-12 bg-blue-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="border-4 border-black bg-white">
                <SelectItem value="all" className="font-bold">
                  All Categories
                </SelectItem>
                {categoryOptions?.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toString()}
                    className="font-bold hover:bg-yellow-300"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={sortBy}
              onValueChange={(value: "latest" | "popular") => setSortBy(value)}
            >
              <SelectTrigger className="w-[160px] border-4 border-black font-bold h-12 bg-pink-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <SelectValue
                  placeholder={sortBy === "latest" ? "Latest" : "Popular"}
                />
              </SelectTrigger>
              <SelectContent className="border-4 border-black bg-white">
                <SelectItem
                  value="latest"
                  className="font-bold hover:bg-yellow-300"
                >
                  Latest
                </SelectItem>
                <SelectItem
                  value="popular"
                  className="font-bold hover:bg-yellow-300"
                >
                  Popular
                </SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-red-300 text-black font-black uppercase px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="mb-8">
            <p className="text-lg font-black uppercase mb-4">Filter by tags:</p>
            <div className="flex flex-wrap gap-3">
              {tagOptions?.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => handleTagToggle(tag.value)}
                  className={`px-4 py-2 font-black uppercase text-sm border-4 border-black transition-all duration-200 ${
                    selectedTags.includes(tag.value)
                      ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-green-200 text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-8 p-6 bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-sm font-black uppercase mb-3">
                Active filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="bg-white border-2 border-black px-3 py-1 font-bold text-sm">
                    Query: "{searchQuery}"
                  </div>
                )}
                {selectedCategory && (
                  <div className="bg-white border-2 border-black px-3 py-1 font-bold text-sm">
                    Category:{" "}
                    {
                      categoryOptions.find((c) => c.slug === selectedCategory)
                        ?.label
                    }
                  </div>
                )}
                {selectedTags.map((tagId) => (
                  <div
                    key={tagId}
                    className="bg-white border-2 border-black px-3 py-1 font-bold text-sm"
                  >
                    Tag: {tagOptions?.find((t) => t.value === tagId)?.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="bg-black text-white px-6 py-3 border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {loading
                ? "Searching..."
                : `Found ${stories?.records?.length} ${
                    stories?.records?.length === 1 ? "story" : "stories"
                  }`}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-[4/3] bg-gray-200 border-4 border-black mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 border-2 border-black w-3/4"></div>
                    <div className="h-4 bg-gray-200 border-2 border-black w-full"></div>
                    <div className="h-4 bg-gray-200 border-2 border-black w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stories?.records?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories?.records?.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              {/* Infinite scroll trigger */}
              {hasNext && (
                <div
                  ref={infiniteScrollRef}
                  className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-8"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-3 bg-yellow-300 border-4 border-black px-6 py-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent"></div>
                      <span>Loading more stories...</span>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border-4 border-black px-6 py-3 font-bold">
                      Scroll down to load more
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12">
                <div className="bg-blue-200 w-24 h-24 border-4 border-black mx-auto mb-6 flex items-center justify-center rotate-[-5deg]">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3">
                  No stories found
                </h3>
                <p className="font-bold mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-yellow-300 text-black font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
