import Link from "next/link";
import { Music, Film, Tv, Star, Award, Headphones } from "lucide-react";

const featuredCategories = [
  {
    name: "Music",
    slug: "music",
    icon: Music,
    description: "Latest hits, artist news, and album reviews",
    bgColor: "bg-blue-300",
    storyCount: 156,
  },
  {
    name: "Movies",
    slug: "movies",
    icon: Film,
    description: "Box office updates, reviews, and behind-the-scenes",
    bgColor: "bg-pink-300",
    storyCount: 142,
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
    icon: Tv,
    description: "Series reviews, streaming news, and episode guides",
    bgColor: "bg-green-300",
    storyCount: 98,
  },
  {
    name: "Celebrity News",
    slug: "celebrity-news",
    icon: Star,
    description: "Red carpet events, interviews, and lifestyle updates",
    bgColor: "bg-yellow-300",
    storyCount: 203,
  },
  {
    name: "Awards",
    slug: "awards",
    icon: Award,
    description: "Award shows, nominations, and winner predictions",
    bgColor: "bg-purple-300",
    storyCount: 67,
  },
  {
    name: "Podcasts",
    slug: "podcasts",
    icon: Headphones,
    description: "Entertainment podcasts and audio content",
    bgColor: "bg-orange-300",
    storyCount: 34,
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
          Explore by Category
        </h2>
        <p className="text-lg font-bold max-w-2xl mx-auto">
          Dive deep into your favorite entertainment topics with our
          comprehensive coverage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link key={category.slug} href={`/?category=${category.slug}`}>
              <div
                className={`${category.bgColor} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 p-6 group`}
              >
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-4 rotate-[-5deg] group-hover:rotate-[5deg] transition-transform">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-black uppercase">
                    {category.name}
                  </h3>
                  <div className="bg-black text-white border-2 border-black px-3 py-1 text-xs font-black uppercase">
                    {category.storyCount}
                  </div>
                </div>

                <p className="text-sm font-bold leading-relaxed">
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
