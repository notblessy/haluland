"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoryOptions } from "@/hooks/use-categories";

export function CategoryNav() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const { data: categoryOptions } = useCategoryOptions();

  return (
    <div className="border-b border-gray-200 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            <Link href="/">
              <button
                className={`px-4 py-2 font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                  !activeCategory
                    ? "bg-[#2a2a2a] text-white border-[#2a2a2a]"
                    : "bg-[#FAFAFA] text-[#1a1a1a] border-gray-300 hover:border-gray-300"
                }`}
              >
                All Stories
              </button>
            </Link>
            {categoryOptions?.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <Link key={category.value} href={`/?category=${category.slug}`}>
                  <button
                    className={`px-4 py-2 font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                      isActive
                        ? "bg-[#2a2a2a] text-white border-[#2a2a2a]"
                        : "bg-[#FAFAFA] text-[#1a1a1a] border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    {category.label}
                  </button>
                </Link>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
