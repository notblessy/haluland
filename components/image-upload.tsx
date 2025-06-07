"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { upload } from "@/lib/uploader";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, publicId: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    await upload(file, (data) => {
      if (data?.url && data?.public_id) {
        onChange(data.url, data.public_id);
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been uploaded and is ready to use.",
        });
      } else {
        toast({
          title: "Upload failed",
          description:
            "There was an error uploading your image. Please try again.",
          variant: "destructive",
        });
      }
    });

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    onChange("", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <Label className="text-sm font-medium">Featured Image</Label>

      {value ? (
        <Card className="relative mt-2">
          <img
            src={value || "/placeholder.svg"}
            alt="Featured image preview"
            className="w-full h-48 object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.svg?height=192&width=384&text=Image+Error";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <Card
          className={`mt-2 border-2 border-dashed transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
        >
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {uploading
                  ? "Uploading..."
                  : "Drop your image here, or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, GIF up to 5MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>
        </Card>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
