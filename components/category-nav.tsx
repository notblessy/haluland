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
    "bg-pink-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-orange-300",
  ];

  return (
    <div className="border-b-4 border-black bg-white">
      <div className="container mx-auto px-4 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            <Link href="/">
              <button
                className={`px-4 py-2 font-black uppercase text-sm border-4 border-black transition-all duration-200 ${
                  !activeCategory
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
              >
                All Stories
              </button>
            </Link>
            {categoryOptions?.map((category, index) => {
              const isActive = activeCategory === category.slug;
              const bgColor = isActive
                ? "bg-black"
                : colors[index % colors.length];
              const textColor = isActive ? "text-white" : "text-black";

              return (
                <Link key={category.value} href={`/?category=${category.slug}`}>
                  <button
                    className={`px-4 py-2 font-black uppercase text-sm border-4 border-black transition-all duration-200 ${bgColor} ${textColor} ${
                      isActive
                        ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
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
