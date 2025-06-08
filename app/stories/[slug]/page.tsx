"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { type Comment } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useStory } from "@/hooks/use-story";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { useReactions } from "@/hooks/use-reactions";
import { set } from "lodash";

export default function StoryPage() {
  const params = useParams();

  const { toast } = useToast();
  const { user } = useAuth();

  const { data: story, onTrackView, refetch } = useStory(params.slug as string);

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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
            <p className="text-muted-foreground">
              The story you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8 flex-grow">
        <article className="max-w-4xl mx-auto">
          {/* Story Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {story.category && (
                <Badge variant="secondary">{story.category.name}</Badge>
              )}
              {story.tags?.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {story.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-4">
                {story.author && (
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={story.author.picture || undefined} />
                      <AvatarFallback>
                        {story.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{story.author.name}</p>
                      {story.published_at && (
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(story.published_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant={story?.is_liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center space-x-2"
                >
                  {reactionLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Heart
                        className={`h-4 w-4 ${
                          story?.is_liked ? "fill-current" : ""
                        }`}
                      />
                    </>
                  )}
                  <span>{story?.total_likes}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <Image
              src={story.thumbnail || "/placeholder.svg"}
              alt={story.thumbnail_alt as string}
              width={800}
              height={450}
              className="w-full aspect-[16/9] object-cover rounded-xl"
            />
            {story.thumbnail_alt && (
              <p className="text-sm italic text-muted-foreground mt-2">
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

          <Separator className="my-8" />

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Comments ({story?.comments?.length})
            </h2>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleComment} className="mb-8">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={user.picture || undefined} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button
                      type="submit"
                      variant="default"
                      disabled={!newComment.trim() || reactionCommentLoading}
                    >
                      {reactionCommentLoading && (
                        <span className="absolute animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      )}
                      <span
                        className={
                          reactionCommentLoading ? "invisible" : "visible"
                        }
                      >
                        Post Comment
                      </span>
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-8 p-4 border rounded-lg text-center">
                <p className="text-muted-foreground">
                  Please{" "}
                  <a href="/login" className="text-primary hover:underline">
                    login
                  </a>{" "}
                  to comment on this story.
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {story?.comments?.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.user?.picture || undefined} />
                    <AvatarFallback>
                      {comment.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">
                            {comment.user?.name || "Anonymous"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                      {user?.id === comment.user?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          {reactionDeleteCommentLoading &&
                          comment?.id === deletingId ? (
                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          ) : (
                            <>
                              <span className="sr-only">Delete Comment</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {story?.comments?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
