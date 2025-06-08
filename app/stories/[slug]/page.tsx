import api from "@/lib/api";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryType } from "@/hooks/use-story";
import StoryDetail from "@/components/story-detail";

async function findStoryBySlug(slug: string): Promise<StoryType | null> {
  try {
    const res = await api.get(`/v1/public/stories/${slug}`);
    return res.data.data as StoryType;
  } catch (err) {
    return null;
  }
}

// Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const story = await findStoryBySlug(params.slug);

  if (!story) return {};

  return {
    title: `${story.title} | Haluland`,
    description: story.excerpt || "Read the latest on Haluland.",
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: story.thumbnail ? [{ url: story.thumbnail }] : [],
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
  };
}

// SSR Page
export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await findStoryBySlug(params.slug);

  if (!story) return notFound();

  return <StoryDetail initialStory={story} />;
}
