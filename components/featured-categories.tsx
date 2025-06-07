import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Film, Tv, Star, Award, Headphones } from "lucide-react"

const featuredCategories = [
  {
    name: "Music",
    slug: "music",
    icon: Music,
    description: "Latest hits, artist news, and album reviews",
    color: "from-blue-500 to-purple-600",
    storyCount: 156,
  },
  {
    name: "Movies",
    slug: "movies",
    icon: Film,
    description: "Box office updates, reviews, and behind-the-scenes",
    color: "from-red-500 to-pink-600",
    storyCount: 142,
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
    icon: Tv,
    description: "Series reviews, streaming news, and episode guides",
    color: "from-green-500 to-teal-600",
    storyCount: 98,
  },
  {
    name: "Celebrity News",
    slug: "celebrity-news",
    icon: Star,
    description: "Red carpet events, interviews, and lifestyle updates",
    color: "from-yellow-500 to-orange-600",
    storyCount: 203,
  },
  {
    name: "Awards",
    slug: "awards",
    icon: Award,
    description: "Award shows, nominations, and winner predictions",
    color: "from-purple-500 to-indigo-600",
    storyCount: 67,
  },
  {
    name: "Podcasts",
    slug: "podcasts",
    icon: Headphones,
    description: "Entertainment podcasts and audio content",
    color: "from-pink-500 to-rose-600",
    storyCount: 34,
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dive deep into your favorite entertainment topics with our comprehensive coverage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link key={category.slug} href={`/?category=${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.storyCount} stories
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
