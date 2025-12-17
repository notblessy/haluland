"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoryOptions } from "@/hooks/use-categories";

export function CategoryNav() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const { data: categoryOptions } = useCategoryOptions();

  const colors = [
    "bg-[#6B8E5A]",
    "bg-[#D4A574]",
    "bg-[#C4B5A0]",
    "bg-[#F4E4C1]",
    "bg-[#B8956A]",
    "bg-[#A8C5A0]",
  ];

  return (
    <div className="border-b border-[#C4B5A0]/40 bg-white">
      <div className="container mx-auto px-4 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            <Link href="/">
              <button
                className={`px-4 py-2 font-semibold text-sm border border-[#C4B5A0]/60 transition-all duration-200 ${
                  !activeCategory
                    ? "bg-[#0C3E2D] text-white border-[#0C3E2D]"
                    : "bg-white text-[#3D3529] hover:bg-[#F5F1E8]"
                }`}
              >
                All Stories
              </button>
            </Link>
            {categoryOptions?.map((category, index) => {
              const isActive = activeCategory === category.slug;
              const bgColor = isActive
                ? "bg-[#0C3E2D]"
                : colors[index % colors.length];
              const textColor = isActive ? "text-white" : "text-[#3D3529]";
              const borderColor = isActive ? "border-[#0C3E2D]" : "border-[#C4B5A0]/60";

              return (
                <Link key={category.value} href={`/?category=${category.slug}`}>
                  <button
                    className={`px-4 py-2 font-semibold text-sm border transition-all duration-200 ${bgColor} ${textColor} ${borderColor} ${
                      !isActive ? "hover:bg-[#F5F1E8]" : ""
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
