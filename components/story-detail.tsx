"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";
import { Heart, Share2, Instagram, Loader2 } from "lucide-react";
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
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-16 flex-grow">
          <div className="max-w-2xl mx-auto text-center bg-[#FAFAFA] border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-3">
              Story Not Found
            </h1>
            <p className="text-sm text-gray-600">
              The story you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow">
        <article>
          {/* Story Header */}
          <header className="mb-8">
            {story.category && (
              <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-3">
                {story.category.name}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[#1a1a1a]">
              {story.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {story.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-300 bg-[#2a2a2a] flex items-center justify-center font-semibold text-sm text-white">
                      {story.author.picture ? (
                        <img
                          src={story.author.picture}
                          alt={story.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        story.author.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1a1a1a]">{story.author.name}</p>
                      {story.published_at && (
                        <p className="text-xs text-gray-600">
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
                  className={`px-3 py-2 font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2 ${
                    story?.is_liked
                      ? "bg-[#2a2a2a] text-white border border-[#2a2a2a] hover:bg-[#3a3a3a]"
                      : "bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] hover:border-gray-400"
                  }`}
                >
                  {reactionLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
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
                  className="bg-[#FAFAFA] border border-gray-300 text-[#1a1a1a] px-3 py-2 hover:border-gray-400 transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="border border-gray-200 overflow-hidden">
              <Image
                src={story.thumbnail || "/placeholder.svg"}
                alt={story.thumbnail_alt as string}
                width={800}
                height={450}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            {story.thumbnail_alt && (
              <p className="text-xs text-gray-600 mt-2 pl-1">
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

          <div className="my-8 border-t border-gray-200"></div>

          {/* Comments Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-[#1a1a1a]">
                Comments ({story?.comments?.length || 0})
              </h2>
            </div>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleComment} className="mb-8">
                <div className="bg-[#FAFAFA] border border-gray-200 p-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 border border-gray-300 bg-[#2a2a2a] flex items-center justify-center font-semibold text-sm flex-shrink-0 text-white">
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-full h-full object-cover"
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
                        className="w-full px-3 py-2 border border-gray-300 font-normal text-sm mb-3 focus:outline-none focus:border-gray-400 transition-all text-[#1a1a1a] bg-[#FAFAFA]"
                        rows={3}
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim() || reactionCommentLoading}
                        className="bg-[#2a2a2a] text-white font-bold uppercase tracking-wider text-xs px-4 py-2 hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reactionCommentLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
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
              <div className="mb-8 p-6 border border-gray-200 bg-[#FAFAFA] text-center">
                <p className="text-sm text-gray-600">
                  Please{" "}
                  <a href="/login" className="underline hover:text-[#1a1a1a] text-[#1a1a1a]">
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
                  className="bg-[#FAFAFA] border border-gray-200 p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 border border-gray-300 bg-[#2a2a2a] flex items-center justify-center font-semibold text-sm flex-shrink-0 text-white">
                      {comment.user?.picture ? (
                        <img
                          src={comment.user.picture}
                          alt={comment.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        comment.user?.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-sm text-[#1a1a1a]">
                              {comment.user?.name || "Anonymous"}
                            </span>
                            <span className="text-xs font-normal bg-[#FAFAFA] border border-gray-200 px-2 py-1 text-gray-600">
                              {formatDistanceToNow(
                                new Date(comment.created_at),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                        {user?.id === comment.user?.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="bg-[#FAFAFA] border border-gray-300 text-gray-600 p-2 hover:border-gray-400 transition-colors"
                          >
                            {reactionDeleteCommentLoading &&
                            comment?.id === deletingId ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
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
                <div className="text-center py-8 bg-[#FAFAFA] border border-gray-200">
                  <p className="text-sm text-gray-600">
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
