import api from "@/lib/api";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryType } from "@/hooks/use-story";
import StoryDetail from "@/components/story-detail";

async function findStoryBySlug(slug: string): Promise<StoryType | null> {
  try {
    const res = await api.get(`/v1/public/stories/${slug}`);
    
    // Check if response is successful and has data
    if (res.status >= 200 && res.status < 300 && res.data?.data) {
      return res.data.data as StoryType;
    }
    
    // If response structure is different, try direct access
    if (res.data && !res.data.data && res.data.id) {
      return res.data as StoryType;
    }
    
    return null;
  } catch (err) {
    console.error("Error fetching story by slug:", err);
    return null;
  }
}

// Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await findStoryBySlug(slug);

  if (!story) return {};

  // SEO keywords (customize as needed)
  const keywords = story.tags ? story.tags.join(", ") : "haluland, news, stories";
  const canonicalUrl = `https://haluland.com/stories/${slug}`;

  return {
    title: `${story.title} | Haluland - ${keywords}`,
    description: story.excerpt || "Read the latest news and stories on Haluland.",
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: canonicalUrl,
      images: story.thumbnail ? [{ url: story.thumbnail }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: story.thumbnail ? [story.thumbnail] : [],
    },
    appleWebApp: {
      title: story.title,
      statusBarStyle: "default",
      capable: true,
    },
    other: {
      // JSON-LD structured data for Google
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": story.title,
        "image": story.thumbnail ? [story.thumbnail] : [],
      "datePublished": story.created_at,
      "dateModified": story.updated_at || story.created_at,
        "author": {
          "@type": "Person",
          "name": story.author?.name || "Haluland"
        },
        "description": story.excerpt || "Read the latest news and stories on Haluland.",
        "mainEntityOfPage": canonicalUrl
      })
    }
  };
}

// SSR Page
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await findStoryBySlug(slug);

  if (!story) return notFound();

  return (
    <>
      {/* Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": story.title,
            "image": story.thumbnail ? [story.thumbnail] : [],
            "datePublished": story.created_at,
            "dateModified": story.updated_at || story.created_at,
            "author": {
              "@type": "Person",
              "name": story.author?.name || "Haluland"
            },
            "description": story.excerpt || "Read the latest news and stories on Haluland.",
            "mainEntityOfPage": `https://haluland.com/stories/${story.slug}`
          })
        }}
      />
      <StoryDetail initialStory={story} />
    </>
  );
}
