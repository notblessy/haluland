export async function findStoryBySlugSSR(slug: string) {
  const res = await fetch(`${process.env.API_URL}/api/stories/${slug}`, {
    cache: "no-store", // for SSR
  });

  if (!res.ok) return null;

  return res.json();
}
