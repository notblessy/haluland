"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2, X } from "lucide-react";
import { StoryType } from "@/hooks/use-story";
import { useToast } from "@/hooks/use-toast";

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
        width: "1080px",
        height: "1920px",
        background: "#F5F1E8",
        border: "3px solid rgba(196, 181, 160, 0.4)",
        borderRadius: "6px",
        overflow: "hidden",
        margin: "0",
        padding: "67px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        boxSizing: "border-box",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Decorative Background Shapes */}
      <div
        style={{
          position: "absolute",
          top: "133px",
          right: "67px",
          width: "133px",
          height: "133px",
          background: "#E8DDD4",
          border: "3px solid rgba(196, 181, 160, 0.4)",
          borderRadius: "6px",
          zIndex: "1",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "533px",
          left: "67px",
          width: "100px",
          height: "100px",
          background: "#D4A574",
          border: "3px solid rgba(196, 181, 160, 0.4)",
          borderRadius: "6px",
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
          height: "133px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              background: "#FFFFFF",
              border: "3px solid rgba(196, 181, 160, 0.4)",
              borderRadius: "6px",
            }}
          >
            <img
              src="/logo.png"
              alt="Haluland"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
              }}
              crossOrigin="anonymous"
            />
          </div>
          <span
            style={{
              fontSize: "33px",
              color: "#3D3529",
              fontWeight: "600",
              letterSpacing: "-0.02em",
              marginLeft: "20px",
            }}
          >
            haluland
          </span>
        </div>
      </div>

      {/* Story Image with Floating Title and Category */}
      <div style={{ position: "relative", flexShrink: 0, zIndex: 100 }}>
        <div
          style={{
            position: "relative",
            width: "933px",
            height: "933px",
            margin: "0 auto",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            border: "3px solid rgba(196, 181, 160, 0.4)",
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
          {/* Light overlay for text readability */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(245, 241, 232, 0.8) 0%, transparent 60%, rgba(245, 241, 232, 0.3) 100%)"
          }} />

          {/* Category Badge on Image */}
          {story.category && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "40px",
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
                    fontSize: "30px",
                    background: "#6B8E5A",
                    color: "#FFFFFF",
                    padding: "13px 27px",
                    border: "3px solid #6B8E5A",
                    fontWeight: "600",
                    borderRadius: "6px",
                  }}
                >
                  {story.category.name}
                </span>
              </div>
            </div>
          )}
          
          {/* Title Floating on Image */}
          <div style={{
            position: "absolute",
            bottom: "67px",
            left: "53px",
            right: "53px"
          }}>
            <h2 style={{
              fontSize: "47px",
              fontWeight: "600",
              lineHeight: "1.3",
              color: "#3D3529",
              margin: 0,
              padding: 0,
              textAlign: "left",
              letterSpacing: "-0.02em"
            }}>
              {truncateText(story.title, 65)}
            </h2>
          </div>
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
          marginTop: "27px",
          marginBottom: "27px",
          padding: "0 67px",
        }}
      >
        <p
          style={{
            color: "#5A4A3A",
            lineHeight: "1.6",
            fontSize: "37px",
            margin: "0",
            padding: "0",
            fontWeight: "400",
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
            textAlign: "center",
            display: "block",
            width: "100%",
            letterSpacing: "-0.02em",
          }}
        >
          {truncateText(story.excerpt || "", 85)}
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
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "6px",
            padding: "27px 53px",
            border: "3px solid rgba(196, 181, 160, 0.4)",
            display: "inline-block",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
          }}>
            <p
              style={{
                fontSize: "33px",
                color: "#3D3529",
                fontWeight: "600",
                margin: 0,
                padding: 0,
                lineHeight: 1,
                letterSpacing: "-0.02em"
              }}
            >
              📖 Read full story on haluland.com
            </p>
          </div>
        </div>
      </div>

      {/* Additional Decorative Shapes */}
      <div
        style={{
          position: "absolute",
          top: "267px",
          right: "80px",
          width: "20px",
          height: "20px",
          background: "#A8C5A0",
          border: "3px solid rgba(196, 181, 160, 0.4)",
          borderRadius: "6px",
          zIndex: "1",
        }}
      />
      <div style={{
        position: "absolute",
        top: "213px",
        right: "53px",
        width: "20px",
        height: "20px",
        backgroundColor: "#E8DDD4",
        borderRadius: "6px"
      }} />
      <div style={{
        position: "absolute",
        bottom: "427px",
        right: "80px",
        width: "27px",
        height: "27px",
        backgroundColor: "#D4A574",
        borderRadius: "6px"
      }} />
      <div style={{
        position: "absolute",
        bottom: "373px",
        left: "80px",
        width: "20px",
        height: "20px",
        backgroundColor: "#C4B5A0",
        borderRadius: "6px"
      }} />
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

  // Check if Web Share API is available
  const canShare = typeof navigator !== 'undefined' && 
                   'share' in navigator && 
                   'canShare' in navigator;

  // Generate image blob (shared logic for download and share)
  const generateImageBlob = async (): Promise<Blob> => {
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

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Instagram story dimensions (element is already 1080x1920)
    const instagramWidth = 1080;
    const instagramHeight = 1920;
    
    // Get device pixel ratio for high-DPI displays
    const devicePixelRatio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    
    // Temporarily remove scale transform from parent and move off-screen for clean capture
    const parentElement = storyRef.current?.parentElement;
    const originalTransform = parentElement?.style.transform || '';
    const originalPosition = parentElement?.style.position || '';
    const originalLeft = parentElement?.style.left || '';
    const originalTop = parentElement?.style.top || '';
    
    if (parentElement && storyRef.current) {
      // Remove scale transform and position off-screen
      parentElement.style.transform = 'none';
      parentElement.style.position = 'fixed';
      parentElement.style.left = '0';
      parentElement.style.top = '0';
      parentElement.style.zIndex = '9999';
      
      // Ensure element is at full size
      storyRef.current.style.width = '1080px';
      storyRef.current.style.height = '1920px';
      storyRef.current.style.transform = 'none';
    }

    // Wait a frame for styles to apply
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Dynamically import html2canvas to avoid SSR issues
    const html2canvas = (await import("html2canvas")).default;

    // Element is already at 1080x1920, use higher scale for quality
    const scale = Math.max(devicePixelRatio, 2);

    // Capture the InstagramStoryPreview element (already at 1080x1920)
    const canvas = await html2canvas(storyRef.current, {
      useCORS: true,
      allowTaint: false,
      logging: false,
      scale: scale,
      backgroundColor: "#F5F1E8",
      imageTimeout: 15000,
      foreignObjectRendering: true,
      width: instagramWidth,
      height: instagramHeight,
      windowWidth: instagramWidth,
      windowHeight: instagramHeight,
    } as any);

    // Restore original styles
    if (parentElement) {
      parentElement.style.transform = originalTransform;
      parentElement.style.position = originalPosition;
      parentElement.style.left = originalLeft;
      parentElement.style.top = originalTop;
      parentElement.style.zIndex = '';
    }

    // Create final canvas at exact Instagram dimensions (1080x1920)
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = instagramWidth;
    finalCanvas.height = instagramHeight;
    const ctx = finalCanvas.getContext("2d");
    
    if (ctx) {
      // Use high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // Draw the captured canvas scaled to exact Instagram dimensions
      ctx.drawImage(canvas, 0, 0, instagramWidth, instagramHeight);
    }

    // Convert to blob
    return new Promise((resolve, reject) => {
      finalCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create image blob"));
          } else {
            resolve(blob);
          }
        },
        "image/png",
        1.0
      );
    });
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImageBlob();
      
      // Create a File from the blob
      const file = new File([blob], `haluland-story-${story.slug}.png`, {
        type: "image/png",
      });

      // Check if we can share files
      const shareData: ShareData = {
        files: [file],
        title: story.title,
        text: `Check out this story: ${story.title}`,
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        
        toast({
          title: "Shared!",
          description: "Your Instagram story has been shared.",
        });
        
        // Close modal after successful share
        onClose();
      } else {
        // Fallback to download if sharing files is not supported
        handleDownload();
      }
    } catch (error: any) {
      // User cancelled sharing or error occurred
      if (error.name !== "AbortError") {
        console.error("Error sharing image:", error);
        toast({
          title: "Error",
          description:
            "Failed to share the Instagram story. Please try downloading instead.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImageBlob();

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
      <DialogContent className="max-w-md bg-white border border-[#C4B5A0]/40 rounded-xs shadow-sm p-0 max-h-[95vh] flex flex-col">
        <DialogHeader className="p-4 pb-3 border-b border-[#C4B5A0]/40 bg-[#E8DDD4] relative flex-shrink-0 rounded-t-xs">
          <DialogTitle className="text-center text-[#3D3529] text-lg font-semibold">
            Instagram Story
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 bg-white overflow-y-auto flex-1">
          {/* Instagram Story Preview */}
          <div className="flex justify-center mb-4" style={{ transform: 'scale(0.3)', transformOrigin: 'top center' }}>
            <InstagramStoryPreview ref={storyRef} story={story} />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* Share button (disabled) */}
            {/* {canShare && (
              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="w-full bg-[#0C3E2D] text-white font-semibold text-sm px-4 py-3 rounded-xs hover:bg-[#0A3225] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share to Instagram
                  </>
                )}
              </button>
            )} */}

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-[#0C3E2D] text-white font-semibold text-sm px-4 py-3 rounded-xs hover:bg-[#0A3225] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download Story
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-white border border-[#C4B5A0]/40 text-[#3D3529] font-semibold text-sm px-4 py-3 rounded-xs hover:bg-[#F5F1E8] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
