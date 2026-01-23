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
import { Search, Filter, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
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
  const [tagsExpanded, setTagsExpanded] = useState(false);

  // Consolidate all query parameters into a single effect
  useEffect(() => {
    const queryParams: {
      search?: string;
      categoryId?: string;
      categorySlug?: string;
      tagIds?: number[];
      size?: number;
      sort?: string;
    } = {
      size: 12,
      sort: sortBy === "latest" ? "-published_at" : "-popular",
    };

    if (searchQuery) {
      queryParams.search = searchQuery;
    }

    if (selectedCategory) {
      if (selectedCategory === "all") {
        queryParams.categoryId = undefined;
      } else {
        queryParams.categoryId = selectedCategory;
      }
    }

    if (selectedTags.length > 0) {
      queryParams.tagIds = selectedTags;
    }

    onQuery(queryParams);
  }, [searchQuery, selectedCategory, selectedTags, sortBy, onQuery]);

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
      size: 12,
      sort: sortBy === "latest" ? "-published_at" : "-popular",
    });
  };

  const hasActiveFilters =
    selectedCategory || selectedTags.length > 0 || searchQuery;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 flex-grow">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6 text-[#1a1a1a]">
            Search Results
          </h1>

          {/* Search Input and Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              <input
                type="search"
                placeholder="Search stories, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-10 text-sm font-normal border border-gray-300 bg-[#FAFAFA] text-[#1a1a1a] focus:outline-none focus:border-gray-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] border border-gray-300 font-normal text-sm h-10 bg-[#FAFAFA] text-[#1a1a1a] hover:border-gray-400 transition-colors">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="border border-gray-200 bg-[#FAFAFA]">
                <SelectItem value="all" className="text-sm">
                  All Categories
                </SelectItem>
                {categoryOptions?.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toString()}
                    className="text-sm hover:bg-gray-100"
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
              <SelectTrigger className="w-[140px] border border-gray-300 font-normal text-sm h-10 bg-[#FAFAFA] text-[#1a1a1a] hover:border-gray-400 transition-colors">
                <SelectValue
                  placeholder={sortBy === "latest" ? "Latest" : "Popular"}
                />
              </SelectTrigger>
              <SelectContent className="border border-gray-200 bg-[#FAFAFA]">
                <SelectItem
                  value="latest"
                  className="text-sm hover:bg-gray-100"
                >
                  Latest
                </SelectItem>
                <SelectItem
                  value="popular"
                  className="text-sm hover:bg-gray-100"
                >
                  Popular
                </SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] font-bold uppercase tracking-wider text-xs px-4 py-2 hover:border-gray-400 transition-colors flex items-center gap-2"
              >
                <X className="h-3 w-3" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="mb-6">
            <button
              onClick={() => setTagsExpanded(!tagsExpanded)}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a]">Filter by tags:</p>
              {tagsExpanded ? (
                <ChevronUp className="h-4 w-4 text-[#1a1a1a]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#1a1a1a]" />
              )}
            </button>
            {tagsExpanded && (
              <div className="flex flex-wrap gap-2">
                {tagOptions?.map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => handleTagToggle(tag.value)}
                    className={`px-3 py-1 font-bold uppercase tracking-wider text-xs transition-colors ${
                      selectedTags.includes(tag.value)
                        ? "bg-[#2a2a2a] text-white border border-[#2a2a2a] hover:bg-[#3a3a3a]"
                        : "bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6 p-4 bg-[#FAFAFA] border border-gray-200">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2">
                Active filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="bg-[#FAFAFA] border border-gray-300 px-2 py-1 font-normal text-xs text-[#1a1a1a]">
                    Query: "{searchQuery}"
                  </div>
                )}
                {selectedCategory && (
                  <div className="bg-[#FAFAFA] border border-gray-300 px-2 py-1 font-normal text-xs text-[#1a1a1a]">
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
                    className="bg-[#FAFAFA] border border-gray-300 px-2 py-1 font-normal text-xs text-[#1a1a1a]"
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
          <div className="flex items-center justify-between mb-6">
            <div className="bg-[#2a2a2a] text-white px-4 py-2 border border-[#2a2a2a] font-bold uppercase tracking-wider text-xs">
              {loading
                ? "Searching..."
                : `Found ${stories?.records?.length} ${
                    stories?.records?.length === 1 ? "story" : "stories"
                  }`}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#1a1a1a]" />
            </div>
          ) : stories?.records?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories?.records?.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              {/* Infinite scroll trigger */}
              {hasNext && (
                <div
                  ref={infiniteScrollRef}
                  className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-6"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-3 bg-[#FAFAFA] border border-gray-200 px-6 py-3 font-bold uppercase tracking-wider text-xs text-[#1a1a1a]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading more stories...</span>
                    </div>
                  ) : (
                    <div className="bg-[#FAFAFA] border border-gray-200 px-6 py-3 font-normal text-xs text-gray-600">
                      Scroll down to load more
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-[#FAFAFA] border border-gray-200 p-8">
                <div className="bg-[#FAFAFA] w-16 h-16 border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-[#1a1a1a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                  No stories found
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] font-bold uppercase tracking-wider text-xs px-6 py-2 hover:border-gray-400 transition-colors"
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a1a1a]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
