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

export default function StoryPage() {
  const params = useParams();

  const { toast } = useToast();
  const { user } = useAuth();

  const { data: story, onTrackView, loading } = useStory(params.slug as string);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like stories.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toast({
      title: isLiked ? "Story unliked" : "Story liked",
      description: isLiked
        ? "Removed from your liked stories"
        : "Added to your liked stories",
    });
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

    // Simulate API call
    const comment: Comment = {
      id: Date.now().toString(),
      story_id: story!.id,
      user_id: user.id,
      content: newComment.trim(),
      created_at: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        picture: user.picture,
      },
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");

    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  useEffect(() => {
    if (story) {
      onTrackView(story.slug);
    }
  }, [story]);

  const handleShare = async () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="aspect-[16/9] bg-muted rounded-xl"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center space-x-2"
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{likesCount}</span>
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
              alt={story.title}
              width={800}
              height={450}
              className="w-full aspect-[16/9] object-cover rounded-xl"
            />
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
              Comments ({comments.length})
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
                    <Button type="submit" disabled={!newComment.trim()}>
                      Post Comment
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
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.user?.picture || undefined} />
                    <AvatarFallback>
                      {comment.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
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
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
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
