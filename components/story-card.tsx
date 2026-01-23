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
    "bg-pink-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-orange-50",
  ];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  if (featured) {
    return (
      <article className="group">
        <Link href={`/stories/${story.slug}`}>
          <div className="bg-[#FAFAFA] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[#1a1a1a]">
              <Image
                src={story.thumbnail || "/placeholder.svg"}
                alt={story.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />

              {story.category && (
                <div className="absolute top-4 left-4 bg-yellow-100 border-2 border-[#1a1a1a] text-[#1a1a1a] text-xs font-bold uppercase px-3 py-1 shadow-[2px_2px_0px_0px_rgba(26,26,26,0.2)]">
                  {story.category.name}
                </div>
              )}
            </div>

            <div className="p-6 bg-[#FAFAFA]">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-[#1a1a1a]">
                {story.title}
              </h2>
              <p className="text-sm font-normal mb-6 line-clamp-2 text-gray-700">
                {story.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold">
                {story.author && (
                  <span className="bg-[#FAFAFA] border border-gray-300 px-3 py-1 text-[#1a1a1a]">
                    {story.author.name}
                  </span>
                )}
                {story.published_at && (
                  <span className="flex items-center gap-2 bg-[#FAFAFA] border border-gray-300 px-3 py-1 text-gray-600">
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
        <div className={`${bgColor} border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden`}>
          <div className="relative aspect-[4/3] border-b-2 border-[#1a1a1a] overflow-hidden">
            <Image
              src={story.thumbnail || "/placeholder.svg"}
              alt={story.title}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            {story.category && (
              <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-2">
                {story.category.name}
              </div>
            )}
            <h3 className="text-base font-bold mb-2 leading-tight line-clamp-2 text-[#1a1a1a]">
              {story.title}
            </h3>
            <p className="text-xs font-normal mb-3 line-clamp-2 text-gray-600">
              {story.excerpt}
            </p>

            <div className="flex items-center justify-between text-xs mb-2">
              {story.author && (
                <span className="text-gray-600">
                  {story.author.name}
                </span>
              )}
              {story.published_at && (
                <span className="flex items-center gap-1 text-gray-600">
                  {formatDistanceToNow(new Date(story.published_at), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{story.total_likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                <span>{story.total_comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
