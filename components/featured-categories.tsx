import Link from "next/link";
import { Music, Film, Tv, Star, Award, Headphones } from "lucide-react";

const featuredCategories = [
  {
    name: "Music",
    slug: "music",
    icon: Music,
    description: "Latest hits, artist news, and album reviews",
    bgColor: "bg-[#E8DDD4]",
    storyCount: 156,
  },
  {
    name: "Movies",
    slug: "movies",
    icon: Film,
    description: "Box office updates, reviews, and behind-the-scenes",
    bgColor: "bg-[#D4A574]",
    storyCount: 142,
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
    icon: Tv,
    description: "Series reviews, streaming news, and episode guides",
    bgColor: "bg-[#A8C5A0]",
    storyCount: 98,
  },
  {
    name: "Celebrity News",
    slug: "celebrity-news",
    icon: Star,
    description: "Red carpet events, interviews, and lifestyle updates",
    bgColor: "bg-[#F4E4C1]",
    storyCount: 203,
  },
  {
    name: "Awards",
    slug: "awards",
    icon: Award,
    description: "Award shows, nominations, and winner predictions",
    bgColor: "bg-[#C4B5A0]",
    storyCount: 67,
  },
  {
    name: "Podcasts",
    slug: "podcasts",
    icon: Headphones,
    description: "Entertainment podcasts and audio content",
    bgColor: "bg-[#B8956A]",
    storyCount: 34,
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase mb-2 text-[#3D3529]">
          Explore by Category
        </h2>
        <p className="text-xs text-[#8B7355] max-w-2xl mx-auto">
          Dive deep into your favorite entertainment topics with our
          comprehensive coverage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link key={category.slug} href={`/?category=${category.slug}`}>
              <div
                className={`${category.bgColor} border border-[#C4B5A0]/40 hover:shadow-md transition-all duration-200 p-4 rounded-xs group`}
              >
                <div className="w-12 h-12 bg-[#3D3529] border border-[#C4B5A0]/40 flex items-center justify-center mb-3 rounded-xs">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-[#3D3529]">
                    {category.name}
                  </h3>
                  <div className="bg-[#0C3E2D] text-white border border-[#0C3E2D] px-2 py-1 text-xs font-semibold rounded-xs">
                    {category.storyCount}
                  </div>
                </div>

                <p className="text-xs text-[#5A4A3A] leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
