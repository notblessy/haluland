"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { StoryType } from "@/hooks/use-story";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface InstagramShareModalProps {
  story: StoryType;
  isOpen: boolean;
  onClose: () => void;
}

// Instagram Story Component that renders consistently
const InstagramStoryPreview = React.forwardRef<
  HTMLDivElement,
  { story: StoryType }
>(({ story }, ref) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      ref={ref}
      style={{
        width: "324px",
        height: "576px",
        background:
          "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
        borderRadius: "0px",
        overflow: "hidden",
        margin: "0",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Background Overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)",
        }}
      />

      {/* Haluland Logo - Top Corner */}
      <div
        style={{
          position: "relative",
          zIndex: "999999",
          transform: "translateZ(0)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "100%",
          }}
        >
          <div className="flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Haluland"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
              crossOrigin="anonymous"
            />
          </div>
          <span className="text-xs uppercase text-white py-1 font-bold">
            HALULAND
          </span>
        </div>
      </div>

      {/* Story Image with Floating Title and Category */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            position: "relative",
            width: "280px",
            height: "280px",
            margin: "0 auto",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${story.thumbnail || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Dark overlay for text readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 100%)",
            }}
          />

          {/* Category Badge on Image */}
          {story.category && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                zIndex: "999999",
                transform: "translateZ(0)",
              }}
            >
              <div className="flex flex-row items-center justify-center">
                <span className="text-[10px] uppercase bg-white py-1 px-3 rounded-full border border-gray-50 shadow-md">
                  {story.category.name}
                </span>
              </div>
            </div>
          )}

          {/* Title Floating on Image */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              zIndex: "999998",
              transform: "translateZ(0)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                margin: "0",
                padding: "0",
                textAlign: "left",
                fontFamily: "Arial, Helvetica, sans-serif",
                display: "block",
                width: "100%",
              }}
            >
              {truncateText(story.title, 65)}
            </h2>
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div
        style={{
          position: "relative",
          zIndex: "999997",
          transform: "translateZ(0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          marginTop: "12px",
          marginBottom: "12px",
          minHeight: "40px",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            lineHeight: "1.5",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
            fontSize: "12px",
            margin: "0",
            padding: "0",
            fontWeight: "normal",
            fontFamily: "Arial, Helvetica, sans-serif",
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          {truncateText(story.excerpt || "", 85)}
        </p>
      </div>

      {/* Bottom Link */}
      <div
        style={{
          position: "relative",
          zIndex: "999996",
          transform: "translateZ(0)",
        }}
      >
        <div className="text-center">
          <p className="text-[10px] text-white bg-white/10 px-2 py-1 rounded-full border border-white/20 shadow-sm">
            📖 Read full story on haluland.com
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "64px",
          right: "16px",
          width: "4px",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "128px",
          right: "24px",
          width: "8px",
          height: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "16px",
          width: "4px",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "112px",
          left: "24px",
          width: "4px",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
});

InstagramStoryPreview.displayName = "InstagramStoryPreview";

export function InstagramShareModal({
  story,
  isOpen,
  onClose,
}: InstagramShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const storyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      if (!storyRef.current) throw new Error("Story element not found");

      // Ensure all images are loaded
      const images = storyRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          });
        })
      );

      // Additional wait for rendering and force reflow
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Force reflow to ensure all elements are properly positioned
      storyRef.current.offsetHeight;

      // Scroll to top-left to ensure consistent rendering position
      window.scrollTo(0, 0);

      // Hide scrollbar to prevent it from affecting the captured image (especially on macOS with external mouse)
      const originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";

      const canvas = await html2canvas(storyRef.current, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      } as any);

      // Restore original overflow setting
      document.documentElement.style.overflow = originalOverflow;

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error("Failed to create image blob");

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `haluland-story-${story.slug}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast({
            title: "Story Downloaded!",
            description: "Your Instagram story has been saved to your device.",
          });
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description:
          "Failed to generate the Instagram story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-transparent border-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center text-white">
            Instagram Story
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Instagram Story Preview */}
          <div className="flex justify-center">
            <InstagramStoryPreview ref={storyRef} story={story} />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? "Generating..." : "Download Story"}
            </Button>

            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
