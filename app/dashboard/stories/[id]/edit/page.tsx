"use client";

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  mockStories,
  mockCategories,
  mockTags,
  type Story,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ImageUpload } from "@/components/image-upload";
import { useStories, useStoryById } from "@/hooks/use-story";
import { MarkdownEditor } from "@/components/markdown-editor";

export default function EditStoryPage() {
  const params = useParams();
  const router = useRouter();

  const { user } = useAuth();
  const { toast } = useToast();

  const { edit: editStory, delete: deleteStory } = useStories();
  const { data: story, loading } = useStoryById(params?.id as string);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setExcerpt(story.excerpt);
      setContent(story.content);
      setThumbnail(story.thumbnail);
      setCategoryId(story.category_id?.toString() || "");
      setSelectedTags(story.tags?.map((tag) => tag.id) || []);
    }
  }, [story]);

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSave = async (status?: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your story.",
        variant: "destructive",
      });
      return;
    }

    if (!excerpt.trim()) {
      toast({
        title: "Excerpt required",
        description: "Please enter an excerpt for your story.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add content to your story.",
        variant: "destructive",
      });
      return;
    }

    editStory.onEdit(story?.id as string, {
      title: title === story?.title ? undefined : title.trim(),
      excerpt: excerpt === story?.excerpt ? undefined : excerpt.trim(),
      content: content === story?.content ? undefined : content.trim(),
      thumbnail: thumbnail || story?.thumbnail,
      thumbnail_public_id: null,
      category_id: categoryId ? parseInt(categoryId) : null,
      status: status || story?.status,
      tags: selectedTags,
    });
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this story? This action cannot be undone."
      )
    ) {
      return;
    }

    deleteStory.onDelete(story?.id as string);
  };

  if (!user || user.role !== "JOURNALIST") {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold">Edit Story</h1>
                <p className="text-muted-foreground">
                  Update your story content and settings
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleSave()}
                disabled={editStory.loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              {story.status !== "PUBLISHED" && (
                <Button
                  onClick={() => handleSave("PUBLISHED")}
                  disabled={editStory.loading}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Content</CardTitle>
                  <CardDescription>
                    Edit your story content using the rich text editor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your story title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Write a brief excerpt that summarizes your story..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {excerpt.length}/200 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <MarkdownEditor
                      content={content}
                      onChange={setContent}
                      placeholder="Start writing your story in Markdown..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Settings</CardTitle>
                  <CardDescription>
                    Configure your story metadata
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ImageUpload value={thumbnail} onChange={setThumbnail} />

                  <Separator />

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {mockTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={
                            selectedTags.includes(tag.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer hover:bg-primary/80 transition-colors"
                          onClick={() => handleTagToggle(tag.id)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click tags to add them to your story
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                  <CardDescription>
                    Control your story status and visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Status</p>
                    <Badge
                      className={
                        story.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : story.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {story.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSave()}
                      disabled={editStory.loading}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editStory.loading ? "Saving..." : "Save Changes"}
                    </Button>
                    {story.status !== "PUBLISHED" && (
                      <Button
                        onClick={() => handleSave("PUBLISHED")}
                        disabled={editStory.loading}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {editStory.loading ? "Publishing..." : "Publish Now"}
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-destructive">
                      Danger Zone
                    </p>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleteStory.loading}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
