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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search stories, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 text-lg h-12"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions?.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toString()}
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
              <SelectTrigger className="w-[140px]">
                <SelectValue
                  placeholder={sortBy === "latest" ? "Latest" : "Popular"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Filter by tags:</p>
            <div className="flex flex-wrap gap-2">
              {tagOptions?.map((tag) => (
                <Badge
                  key={tag.value}
                  variant={
                    selectedTags.includes(tag.value) ? "default" : "outline"
                  }
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => handleTagToggle(tag.value)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Active filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary">Query: "{searchQuery}"</Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary">
                    Category:{" "}
                    {
                      categoryOptions.find((c) => c.slug === selectedCategory)
                        ?.label
                    }
                  </Badge>
                )}
                {selectedTags.map((tagId) => (
                  <Badge key={tagId} variant="secondary">
                    Tag: {tagOptions?.find((t) => t.value === tagId)?.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {loading
                ? "Searching..."
                : `Found ${stories?.records?.length} ${
                    stories?.records?.length === 1 ? "story" : "stories"
                  }`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stories?.records?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories?.records?.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              {hasNext && (
                <button onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No stories found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
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
