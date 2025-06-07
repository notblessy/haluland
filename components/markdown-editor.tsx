"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link,
  Eye,
  Edit,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({
  content,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector(
      "textarea[data-markdown-editor]"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
    { icon: Heading1, label: "Heading 1", action: () => insertMarkdown("# ") },
    { icon: Heading2, label: "Heading 2", action: () => insertMarkdown("## ") },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertMarkdown("### "),
    },
    { icon: Quote, label: "Quote", action: () => insertMarkdown("> ") },
    { icon: List, label: "Bullet List", action: () => insertMarkdown("- ") },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertMarkdown("1. "),
    },
    { icon: Link, label: "Link", action: () => insertMarkdown("[", "](url)") },
  ];

  return (
    <div className="border rounded-md">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "write" | "preview")}
      >
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.label}
              >
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-1">
              <Edit className="h-3 w-3" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="m-0">
          <Textarea
            data-markdown-editor
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Write your story in Markdown..."}
            className="min-h-[400px] border-0 resize-none focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:ring-offset-0 focus-visible:shadow-none rounded-tl-none rounded-tr-none rounded-bl-md rounded-br-md"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <Card className="border-0 rounded-none">
            <CardContent className="p-4">
              {content ? (
                <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-600 prose-a:text-purple-600 hover:prose-a:text-purple-700">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Nothing to preview yet. Start writing in the Write tab.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
