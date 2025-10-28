"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, X } from "lucide-react";
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
        background: "#FBBF24",
        border: "8px solid #000000",
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
        boxShadow: "12px 12px 0px 0px rgba(0, 0, 0, 1)",
      }}
    >
      {/* Decorative Background Shapes */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "20px",
          width: "60px",
          height: "60px",
          background: "#EC4899",
          border: "4px solid #000000",
          transform: "rotate(15deg)",
          zIndex: "1",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "160px",
          left: "20px",
          width: "40px",
          height: "40px",
          background: "#3B82F6",
          border: "4px solid #000000",
          transform: "rotate(-20deg)",
          zIndex: "1",
        }}
      />

      {/* Haluland Logo - Top Corner */}
      <div
        style={{
          position: "relative",
          zIndex: "100",
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
            gap: "4px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              background: "#FFFFFF",
              border: "4px solid #000000",
              boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
            }}
          >
            <img
              src="/logo.png"
              alt="Haluland"
              style={{
                width: "24px",
                height: "24px",
                objectFit: "contain",
              }}
              crossOrigin="anonymous"
            />
          </div>
          <span
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              color: "#000000",
              fontWeight: "900",
              letterSpacing: "0.5px",
              marginLeft: "8px",
            }}
          >
            HALULAND
          </span>
        </div>
      </div>

      {/* Story Image with Floating Title and Category */}
      <div style={{ position: "relative", flexShrink: 0, zIndex: 100 }}>
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "180px",
            margin: "0 auto",
            borderRadius: "0px",
            overflow: "hidden",
            boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 1)",
            border: "6px solid #000000",
            background: "#FFFFFF",
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

          {/* Category Badge on Image */}
          {story.category && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                zIndex: "1000",
                transform: "translateZ(0)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    background: "#FBBF24",
                    padding: "4px 12px",
                    border: "3px solid #000000",
                    fontWeight: "900",
                    boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
                  }}
                >
                  {story.category.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Title Below Image */}
        <div
          style={{
            marginTop: "16px",
            background: "#FFFFFF",
            border: "4px solid #000000",
            padding: "12px",
            boxShadow: "6px 6px 0px 0px rgba(0, 0, 0, 1)",
          }}
        >
          <h2
            style={{
              fontSize: "10px",
              fontWeight: "900",
              color: "#000000",
              margin: "0",
              padding: "0",
              textAlign: "left",
              fontFamily: "Arial, Helvetica, sans-serif",
              display: "block",
              width: "100%",
              textTransform: "uppercase",
              lineHeight: "1.4",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {story.title}
          </h2>
        </div>
      </div>

      {/* Excerpt */}
      <div
        style={{
          position: "relative",
          zIndex: "100",
          transform: "translateZ(0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "12px",
          marginBottom: "12px",
          padding: "0 8px",
        }}
      >
        <p
          style={{
            color: "#000000",
            lineHeight: "1.5",
            fontSize: "11px",
            margin: "0",
            padding: "0",
            fontWeight: "700",
            fontFamily: "Arial, Helvetica, sans-serif",
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          {truncateText(story.excerpt || "", 80)}
        </p>
      </div>

      {/* Bottom Link */}
      <div
        style={{
          position: "relative",
          zIndex: "100",
          transform: "translateZ(0)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "10px",
              color: "#000000",
              background: "#FFFFFF",
              padding: "6px 12px",
              border: "3px solid #000000",
              fontWeight: "900",
              textTransform: "uppercase",
              display: "inline-block",
              boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
            }}
          >
            📖 haluland.com
          </p>
        </div>
      </div>

      {/* Additional Decorative Shape */}
      <div
        style={{
          position: "absolute",
          top: "120px",
          right: "30px",
          width: "30px",
          height: "30px",
          background: "#10B981",
          border: "4px solid #000000",
          transform: "rotate(45deg)",
          zIndex: "1",
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

          // Close modal after successful download
          onClose();
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
      <DialogContent className="max-w-md bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-0 max-h-[95vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b-4 border-black bg-yellow-300 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black text-white border-4 border-black hover:bg-red-500 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogTitle className="text-center text-black text-2xl font-black uppercase">
            Instagram Story
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 bg-white overflow-y-auto flex-1">
          {/* Instagram Story Preview */}
          <div className="flex justify-center mb-6">
            <InstagramStoryPreview ref={storyRef} story={story} />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-black text-white font-black uppercase px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="h-5 w-5 border-4 border-white border-t-transparent animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Download Story
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-white text-black font-black uppercase px-6 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
