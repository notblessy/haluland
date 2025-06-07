"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RichTextEditor } from "@/components/rich-text-editor";
import { mockCategories, mockTags } from "@/lib/mock-data";
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
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ImageUpload } from "@/components/image-upload";
import { StoryRequestType, StoryType, useStories } from "@/hooks/use-story";
import { useTagOptions } from "@/hooks/use-tags";
import { MarkdownEditor } from "@/components/markdown-editor";

export default function NewStoryPage() {
  const router = useRouter();

  const { user } = useAuth();
  const { toast } = useToast();

  const { onAdd, loading } = useStories();
  const { data: tags } = useTagOptions();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
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
    console.log("selectedTags", selectedTags);

    const newStory: Partial<StoryRequestType> = {
      author_id: user?.id as string,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      thumbnail: thumbnail || "/placeholder.svg?height=400&width=600",
      thumbnail_public_id: null,
      category_id: categoryId ? Number.parseInt(categoryId) : null,
      status,
      published_at: status === "PUBLISHED" ? new Date().toISOString() : null,
      tags: selectedTags.length > 0 ? selectedTags : [],
    };

    onAdd(newStory);
  };

  if (!user || user.role !== "JOURNALIST") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Button variant="ghost" size="sm" className="mb-5" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Create New Story</h1>
              <p className="text-muted-foreground">
                Write and publish your story
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleSave("DRAFT")}
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave("PUBLISHED")}
                disabled={loading}
              >
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Content</CardTitle>
                  <CardDescription>
                    Write your story content using the rich text editor
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
                      {tags?.map((tag) => (
                        <Badge
                          key={tag.value}
                          variant={
                            selectedTags.includes(tag.value)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer hover:bg-primary/80 transition-colors"
                          onClick={() => handleTagToggle(tag.value)}
                        >
                          {tag.label}
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
                    Control when and how your story is published
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">
                      Save as draft to continue editing later, or publish to
                      make it live immediately.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSave("DRAFT")}
                      disabled={loading}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={() => handleSave("PUBLISHED")}
                      disabled={loading}
                      className="w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {loading ? "Publishing..." : "Publish Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
