import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { StoryType } from "@/hooks/use-story";

interface StoryCardProps {
  story: StoryType;
  featured?: boolean;
}

export function StoryCard({ story, featured = false }: StoryCardProps) {
  const cardClasses = featured
    ? "group relative overflow-hidden rounded-xl bg-card border shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-3"
    : "group relative overflow-hidden rounded-xl bg-card border shadow-lg hover:shadow-xl transition-all duration-300";

  const imageClasses = featured
    ? "aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-300"
    : "aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300";

  return (
    <article className={cardClasses}>
      <Link href={`/stories/${story.slug}`}>
        <div className="relative overflow-hidden">
          <Image
            src={story.thumbnail || "/placeholder.svg"}
            alt={story.title}
            width={featured ? 800 : 400}
            height={featured ? 450 : 300}
            className={imageClasses}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          {story.category && (
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-white/90 text-black hover:bg-white"
            >
              {story.category.name}
            </Badge>
          )}
        </div>

        <div className="p-6">
          <div className="space-y-3">
            <h2
              className={`font-bold leading-tight group-hover:text-primary transition-colors ${
                featured ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {story.title}
            </h2>

            <p
              className={`text-muted-foreground line-clamp-2 ${
                featured ? "text-base" : "text-sm"
              }`}
            >
              {story.excerpt}
            </p>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {story.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                {story.author && (
                  <span className="font-medium">{story.author.name}</span>
                )}
                {story.published_at && (
                  <span>
                    {formatDistanceToNow(new Date(story.published_at), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{story.total_likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{story.total_comments || 0}</span>
                </div>
                {/* <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{story.total_views || 0}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
