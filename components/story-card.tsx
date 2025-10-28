import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { StoryType } from "@/hooks/use-story";

interface StoryCardProps {
  story: StoryType;
  featured?: boolean;
}

export function StoryCard({ story, featured = false }: StoryCardProps) {
  const colors = [
    "bg-pink-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-orange-200",
  ];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  if (featured) {
    return (
      <article className="group">
        <Link href={`/stories/${story.slug}`}>
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden border-b-4 border-black">
              <Image
                src={story.thumbnail || "/placeholder.svg"}
                alt={story.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />

              {story.category && (
                <div className="absolute top-6 left-6 bg-yellow-300 border-4 border-black text-black text-sm font-black uppercase px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {story.category.name}
                </div>
              )}
            </div>

            <div className="p-8 bg-white">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight uppercase">
                {story.title}
              </h2>
              <p className="text-lg font-bold mb-6 line-clamp-2">
                {story.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm font-bold">
                {story.author && (
                  <span className="bg-gray-100 border-2 border-black px-3 py-1">
                    {story.author.name}
                  </span>
                )}
                {story.published_at && (
                  <span className="flex items-center gap-2 bg-gray-100 border-2 border-black px-3 py-1">
                    {formatDistanceToNow(new Date(story.published_at), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`}>
        <div
          className={`${bgColor} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 overflow-hidden`}
        >
          <div className="relative aspect-[4/3] border-b-4 border-black overflow-hidden">
            <Image
              src={story.thumbnail || "/placeholder.svg"}
              alt={story.title}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            {story.category && (
              <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase mb-3 border-2 border-black">
                {story.category.name}
              </div>
            )}
            <h3 className="text-xl font-black mb-3 leading-tight line-clamp-2 uppercase">
              {story.title}
            </h3>
            <p className="text-sm font-bold mb-4 line-clamp-2">
              {story.excerpt}
            </p>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.slice(0, 3).map((tag) => (
                  <div
                    key={tag.id}
                    className="bg-white border-2 border-black px-2 py-1 text-xs font-bold"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-bold">
              {story.author && (
                <span className="bg-white border-2 border-black px-2 py-1">
                  {story.author.name}
                </span>
              )}
              {story.published_at && (
                <span className="flex items-center gap-1">
                  {formatDistanceToNow(new Date(story.published_at), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3 text-xs font-bold">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{story.total_likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{story.total_comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
