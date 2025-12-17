"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";
import { Heart, Share2, Instagram } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { StoryType, useStory } from "@/hooks/use-story";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { useReactions } from "@/hooks/use-reactions";
import { InstagramShareModal } from "@/components/instagram-share-modal";

import Image from "next/image";

export default function StoryPage({
  initialStory,
}: {
  initialStory?: StoryType;
}) {
  const params = useParams();

  const { toast } = useToast();
  const { user } = useAuth();

  const {
    data: story,
    onTrackView,
    refetch,
  } = useStory(params.slug as string, initialStory);

  const {
    onLike,
    onDislike,
    onComment,
    onDeleteComment,
    loading: reactionLoading,
    commentLoading: reactionCommentLoading,
    deleteCommentLoading: reactionDeleteCommentLoading,
  } = useReactions();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like stories.",
        variant: "destructive",
      });

      return;
    }

    if (!story) return;

    if (story.is_liked) {
      await onDislike(story.id);
    } else {
      await onLike(story.id);
    }

    refetch();
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to comment on stories.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    await onComment(story?.id as string, newComment.trim());

    refetch();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to delete comments.",
        variant: "destructive",
      });
      return;
    }

    setDeletingId(commentId);

    await onDeleteComment(commentId);
    refetch();

    setDeletingId(null);
  };

  useEffect(() => {
    if (story) {
      onTrackView(story.slug);
    }
  }, [story]);

  const handleShare = async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: story?.title,
          text: story?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Story link has been copied to clipboard.",
      });
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="max-w-2xl mx-auto text-center bg-white border border-[#C4B5A0]/40 rounded-xs shadow-sm p-8">
            <h1 className="text-2xl font-semibold text-[#3D3529] mb-3">
              Story Not Found
            </h1>
            <p className="text-sm text-[#5A4A3A]">
              The story you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow">
        <article>
          {/* Story Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {story.category && (
                <div className="bg-[#6B8E5A] border border-[#6B8E5A] text-white font-semibold uppercase px-3 py-1 text-xs rounded-xs">
                  {story.category.name}
                </div>
              )}
              {story.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-[#E8DDD4] border border-[#C4B5A0]/40 text-[#5A4A3A] font-medium px-2 py-1 text-xs rounded-xs"
                >
                  {tag.name}
                </div>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-6 text-[#3D3529]">
              {story.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 p-4 bg-white border border-[#C4B5A0]/40 rounded-xs">
              <div className="flex items-center gap-3">
                {story.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-[#C4B5A0]/40 bg-gradient-to-br from-[#6B8E5A] to-[#A8C5A0] flex items-center justify-center font-semibold text-sm rounded-xs">
                      {story.author.picture ? (
                        <img
                          src={story.author.picture}
                          alt={story.author.name}
                          className="w-full h-full object-cover rounded-xs"
                        />
                      ) : (
                        story.author.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#3D3529]">{story.author.name}</p>
                      {story.published_at && (
                        <p className="text-xs text-[#8B7355]">
                          {formatDistanceToNow(new Date(story.published_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-3 py-2 font-semibold text-xs rounded-xs transition-colors flex items-center gap-2 ${
                    story?.is_liked
                      ? "bg-[#0C3E2D] text-white border border-[#0C3E2D]"
                      : "bg-white border border-[#C4B5A0]/40 text-[#3D3529] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {reactionLoading ? (
                    <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-xs" />
                  ) : (
                    <Heart
                      className={`h-3 w-3 ${
                        story?.is_liked ? "fill-current" : ""
                      }`}
                    />
                  )}
                  <span>{story?.total_likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="bg-white border border-[#C4B5A0]/40 text-[#3D3529] px-3 py-2 rounded-xs hover:bg-[#F5F1E8] transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                </button>
                {/* <button
                  onClick={() => setIsInstagramModalOpen(true)}
                  className="bg-white border border-[#C4B5A0]/40 text-[#3D3529] px-3 py-2 rounded-xs hover:bg-[#F5F1E8] transition-colors"
                >
                  <Instagram className="h-3 w-3" />
                </button> */}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="border border-[#C4B5A0]/40 rounded-xs overflow-hidden">
              <Image
                src={story.thumbnail || "/placeholder.svg"}
                alt={story.thumbnail_alt as string}
                width={800}
                height={450}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            {story.thumbnail_alt && (
              <p className="text-xs text-[#8B7355] mt-2 pl-1">
                {story.thumbnail_alt}
              </p>
            )}
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {/* Story Content */}
            <div className="mb-12">
              <MarkdownRenderer content={story.content} />
            </div>
          </div>

          <div className="my-8 border-t border-[#C4B5A0]/40"></div>

          {/* Comments Section */}
          <section>
            <div className="bg-[#E8DDD4] border border-[#C4B5A0]/40 px-4 py-2 inline-block mb-6 font-semibold text-sm rounded-xs text-[#3D3529]">
              <h2 className="text-base">Comments ({story?.comments?.length})</h2>
            </div>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleComment} className="mb-8">
                <div className="bg-white border border-[#C4B5A0]/40 rounded-xs shadow-sm p-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 border border-[#C4B5A0]/40 bg-gradient-to-br from-[#6B8E5A] to-[#A8C5A0] flex items-center justify-center font-semibold text-sm flex-shrink-0 rounded-xs">
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-full h-full object-cover rounded-xs"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 border border-[#C4B5A0]/60 font-normal text-sm mb-3 rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0C3E2D]/30 focus:border-[#0C3E2D] transition-all text-[#3D3529]"
                        rows={3}
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim() || reactionCommentLoading}
                        className="bg-[#0C3E2D] text-white font-semibold text-xs px-4 py-2 rounded-xs hover:bg-[#0A3225] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reactionCommentLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-xs"></span>
                            Posting...
                          </span>
                        ) : (
                          "Post Comment"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-8 p-6 border border-[#C4B5A0]/40 bg-[#E8DDD4] text-center rounded-xs">
                <p className="text-sm text-[#5A4A3A]">
                  Please{" "}
                  <a href="/login" className="underline hover:text-[#0C3E2D] text-[#0C3E2D]">
                    login
                  </a>{" "}
                  to comment on this story.
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {story?.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border border-[#C4B5A0]/40 rounded-xs shadow-sm p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 border border-[#C4B5A0]/40 bg-gradient-to-br from-[#6B8E5A] to-[#A8C5A0] flex items-center justify-center font-semibold text-sm flex-shrink-0 rounded-xs">
                      {comment.user?.picture ? (
                        <img
                          src={comment.user.picture}
                          alt={comment.user.name}
                          className="w-full h-full object-cover rounded-xs"
                        />
                      ) : (
                        comment.user?.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm text-[#3D3529]">
                              {comment.user?.name || "Anonymous"}
                            </span>
                            <span className="text-xs font-normal bg-[#F5F1E8] border border-[#C4B5A0]/40 px-2 py-1 rounded-xs text-[#8B7355]">
                              {formatDistanceToNow(
                                new Date(comment.created_at),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-[#5A4A3A] leading-relaxed">{comment.content}</p>
                        </div>
                        {user?.id === comment.user?.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="bg-white border border-[#C4B5A0]/40 text-[#5A4A3A] p-2 rounded-xs hover:bg-[#F5F1E8] transition-colors"
                          >
                            {reactionDeleteCommentLoading &&
                            comment?.id === deletingId ? (
                              <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent block rounded-xs" />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {story?.comments?.length === 0 && (
                <div className="text-center py-8 bg-white border border-[#C4B5A0]/40 rounded-xs">
                  <p className="text-sm text-[#5A4A3A]">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />

      {/* Instagram Share Modal */}
      {/* <InstagramShareModal
        story={story}
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
      /> */}
    </div>
  );
}
