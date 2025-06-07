"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TrendingStory {
  id: string
  title: string
  slug: string
  views_count: number
  published_at: string
  category: {
    name: string
    slug: string
  }
}

const trendingStories: TrendingStory[] = [
  {
    id: "t1",
    title: "Breaking: Major Music Festival Announces 2024 Lineup",
    slug: "major-music-festival-2024-lineup",
    views_count: 15420,
    published_at: "2024-12-07T08:30:00Z",
    category: { name: "Music", slug: "music" },
  },
  {
    id: "t2",
    title: "Hollywood A-Lister Spotted at Secret Recording Session",
    slug: "hollywood-star-secret-recording-session",
    views_count: 12890,
    published_at: "2024-12-07T06:15:00Z",
    category: { name: "Celebrity News", slug: "celebrity-news" },
  },
  {
    id: "t3",
    title: "Streaming Wars Heat Up with New Platform Launch",
    slug: "streaming-wars-new-platform-launch",
    views_count: 9750,
    published_at: "2024-12-07T04:45:00Z",
    category: { name: "TV Shows", slug: "tv-shows" },
  },
  {
    id: "t4",
    title: "Indie Band Goes Viral After Surprise Street Performance",
    slug: "indie-band-viral-street-performance",
    views_count: 8320,
    published_at: "2024-12-06T22:30:00Z",
    category: { name: "Music", slug: "music" },
  },
  {
    id: "t5",
    title: "Award Season Predictions: Who Will Take Home Gold?",
    slug: "award-season-predictions-2024",
    views_count: 7650,
    published_at: "2024-12-06T20:15:00Z",
    category: { name: "Awards", slug: "awards" },
  },
]

export function TrendingSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold">Trending Now</h2>
        </div>

        <div className="space-y-4">
          {trendingStories.map((story, index) => (
            <Link key={story.id} href={`/stories/${story.slug}`}>
              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {story.title}
                  </h3>

                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {story.category.name}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{story.views_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(new Date(story.published_at), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Link href="/search?sort=popular" className="text-sm text-primary hover:underline font-medium">
            View all trending stories →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
