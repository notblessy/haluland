"use client";

import React from "react";
import { StoryType } from "@/hooks/use-story";

interface InstagramStoryImageProps {
  story: StoryType;
}

export function InstagramStoryImage({ story }: InstagramStoryImageProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div
      style={{
        width: '1080px',
        height: '1920px',
        background: '#F5F1E8',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '67px',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        lineHeight: 'normal',
        letterSpacing: '-0.02em',
        border: '3px solid rgba(196, 181, 160, 0.4)'
      }}
    >
      {/* Background Overlays - removed for minimalist design */}
      
      {/* Haluland Logo - Top Corner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(196, 181, 160, 0.4)'
          }}>
            <img
              src="/logo.png"
              alt="Haluland"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain'
              }}
            />
          </div>
          <span style={{
            color: '#3D3529',
            fontWeight: '600',
            fontSize: '33px',
            margin: 0,
            padding: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>haluland</span>
        </div>
      </div>

      {/* Story Image with Floating Title and Category */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          position: 'relative',
          width: '933px',
          height: '933px',
          margin: '0 auto',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          border: '3px solid rgba(196, 181, 160, 0.4)'
        }}>
          <img
            src={story.thumbnail || "/placeholder.svg"}
            alt={story.thumbnail_alt || story.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          {/* Light overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(245, 241, 232, 0.8) 0%, transparent 60%, rgba(245, 241, 232, 0.3) 100%)'
          }} />
          
          {/* Category Badge on Image */}
          {story.category && (
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              zIndex: 1000
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#6B8E5A',
                padding: '13px 27px',
                borderRadius: '6px',
                border: '3px solid #6B8E5A',
                minHeight: '60px'
              }}>
                <span style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontWeight: '600',
                  letterSpacing: '-0.02em',
                  lineHeight: '1',
                  fontSize: '30px',
                  color: '#FFFFFF',
                  margin: 0,
                  padding: 0
                }}>{story.category.name}</span>
              </div>
            </div>
          )}
          
          {/* Title Floating on Image */}
          <div style={{
            position: 'absolute',
            bottom: '67px',
            left: '53px',
            right: '53px'
          }}>
            <h2 style={{
              fontSize: '47px',
              fontWeight: '600',
              lineHeight: '1.3',
              color: '#3D3529',
              margin: 0,
              padding: 0,
              textAlign: 'left',
              letterSpacing: '-0.02em'
            }}>
              {truncateText(story.title, 65)}
            </h2>
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div style={{
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        padding: '0 67px',
        marginTop: '27px',
        marginBottom: '27px'
      }}>
        <p style={{
          opacity: 0.9,
          lineHeight: '1.6',
          fontSize: '37px',
          margin: 0,
          padding: 0,
          fontWeight: '400',
          color: '#5A4A3A',
          letterSpacing: '-0.02em'
        }}>
          {truncateText(story.excerpt || "", 85)}
        </p>
      </div>

      {/* Bottom Link */}
      <div style={{ position: 'relative' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          padding: '27px 53px',
          border: '3px solid rgba(196, 181, 160, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            color: '#3D3529',
            fontWeight: '600',
            textAlign: 'center',
            fontSize: '33px',
            margin: 0,
            padding: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>
            📖 Read full story on haluland.com
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '213px',
        right: '53px',
        width: '20px',
        height: '20px',
        backgroundColor: '#E8DDD4',
        borderRadius: '6px'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '427px',
        right: '80px',
        width: '27px',
        height: '27px',
        backgroundColor: '#D4A574',
        borderRadius: '6px'
      }} />
      <div style={{
        position: 'absolute',
        top: '267px',
        left: '53px',
        width: '20px',
        height: '20px',
        backgroundColor: '#A8C5A0',
        borderRadius: '6px'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '373px',
        left: '80px',
        width: '20px',
        height: '20px',
        backgroundColor: '#C4B5A0',
        borderRadius: '6px'
      }} />
    </div>
  );
}
