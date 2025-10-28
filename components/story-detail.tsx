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
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="max-w-2xl mx-auto text-center bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12">
            <h1 className="text-3xl font-black uppercase mb-4">
              Story Not Found
            </h1>
            <p className="font-bold">
              The story you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <article>
          {/* Story Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {story.category && (
                <div className="bg-yellow-300 border-4 border-black text-black font-black uppercase px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {story.category.name}
                </div>
              )}
              {story.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-blue-200 border-2 border-black text-black font-bold px-3 py-1 text-sm"
                >
                  {tag.name}
                </div>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 uppercase">
              {story.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-6 mb-8 p-6 bg-gray-50 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4">
                {story.author && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 border-4 border-black bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center font-black text-xl">
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
                      <p className="font-black text-lg">{story.author.name}</p>
                      {story.published_at && (
                        <p className="text-sm font-bold">
                          {formatDistanceToNow(new Date(story.published_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`px-4 py-2 font-black uppercase text-sm border-4 border-black transition-all duration-200 flex items-center gap-2 ${
                    story?.is_liked
                      ? "bg-red-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  }`}
                >
                  {reactionLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent" />
                  ) : (
                    <Heart
                      className={`h-4 w-4 ${
                        story?.is_liked ? "fill-current" : ""
                      }`}
                    />
                  )}
                  <span>{story?.total_likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="bg-blue-300 text-black px-4 py-2 font-black uppercase text-sm border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsInstagramModalOpen(true)}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 font-black uppercase text-sm border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  <Instagram className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10">
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <Image
                src={story.thumbnail || "/placeholder.svg"}
                alt={story.thumbnail_alt as string}
                width={800}
                height={450}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            {story.thumbnail_alt && (
              <p className="text-sm font-bold mt-3 pl-2">
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

          <div className="my-10 border-t-4 border-black"></div>

          {/* Comments Section */}
          <section>
            <div className="bg-purple-200 border-4 border-black px-6 py-3 inline-block mb-8 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl">Comments ({story?.comments?.length})</h2>
            </div>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleComment} className="mb-10">
                <div className="bg-gray-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border-4 border-black bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center font-black text-lg flex-shrink-0">
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
                        className="w-full px-4 py-3 border-4 border-black font-bold mb-4 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        rows={3}
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim() || reactionCommentLoading}
                        className="bg-yellow-300 text-black font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reactionCommentLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent"></span>
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
              <div className="mb-10 p-8 border-4 border-black bg-yellow-100 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold text-lg">
                  Please{" "}
                  <a href="/login" className="underline hover:text-blue-600">
                    login
                  </a>{" "}
                  to comment on this story.
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {story?.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border-4 border-black bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center font-black text-lg flex-shrink-0">
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
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-black text-lg">
                              {comment.user?.name || "Anonymous"}
                            </span>
                            <span className="text-xs font-bold bg-gray-100 border-2 border-black px-2 py-1">
                              {formatDistanceToNow(
                                new Date(comment.created_at),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>
                          </div>
                          <p className="font-bold">{comment.content}</p>
                        </div>
                        {user?.id === comment.user?.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="bg-red-300 text-black p-2 border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                          >
                            {reactionDeleteCommentLoading &&
                            comment?.id === deletingId ? (
                              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent block" />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
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
                <div className="text-center py-12 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-bold text-lg">
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
      <InstagramShareModal
        story={story}
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
      />
    </div>
  );
}
