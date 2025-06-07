import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const editorPicks = [
  {
    id: "ep1",
    title: "The Rise of AI in Music Production: A Game Changer",
    slug: "ai-music-production-game-changer",
    excerpt: "How artificial intelligence is revolutionizing the way artists create and produce music in 2024.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: {
      name: "Sarah Wilson",
      picture: "/placeholder.svg?height=40&width=40",
    },
    category: { name: "Music", slug: "music" },
    published_at: "2024-12-06T14:30:00Z",
    readTime: "5 min read",
  },
  {
    id: "ep2",
    title: "Behind the Scenes: Making of the Year's Biggest Blockbuster",
    slug: "behind-scenes-biggest-blockbuster",
    excerpt:
      "An exclusive look at the production challenges and creative decisions that shaped this year's most anticipated film.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: {
      name: "John Smith",
      picture: "/placeholder.svg?height=40&width=40",
    },
    category: { name: "Movies", slug: "movies" },
    published_at: "2024-12-05T16:45:00Z",
    readTime: "8 min read",
  },
  {
    id: "ep3",
    title: "Streaming Platform Wars: Who's Winning in 2024?",
    slug: "streaming-platform-wars-2024",
    excerpt:
      "A comprehensive analysis of subscriber numbers, content quality, and market positioning across major platforms.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: {
      name: "Sarah Wilson",
      picture: "/placeholder.svg?height=40&width=40",
    },
    category: { name: "TV Shows", slug: "tv-shows" },
    published_at: "2024-12-04T12:20:00Z",
    readTime: "6 min read",
  },
]

export function EditorPicks() {
  return (
    <section className="py-12">
      <div className="flex items-center space-x-2 mb-8">
        <Star className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Editor's Picks</h2>
        <Badge variant="outline" className="ml-2">
          Curated
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editorPicks.map((story) => (
          <Link key={story.id} href={`/stories/${story.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={story.thumbnail || "/placeholder.svg"}
                  alt={story.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-3 left-3 bg-black/70 text-white hover:bg-black/80">
                  {story.category.name}
                </Badge>
                <div className="absolute top-3 right-3">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{story.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={story.author.picture || "/placeholder.svg"} />
                      <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{story.author.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(story.published_at), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
