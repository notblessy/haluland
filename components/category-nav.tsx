"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { mockCategories } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function CategoryNav() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4">
            <Link href="/">
              <Badge
                variant={!activeCategory ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
              >
                All Stories
              </Badge>
            </Link>
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/?category=${category.slug}`}>
                <Badge
                  variant={activeCategory === category.slug ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                >
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
