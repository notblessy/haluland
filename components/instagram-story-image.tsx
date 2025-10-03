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
        width: '324px',
        height: '576px',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
        borderRadius: '0px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 'normal',
        letterSpacing: 'normal'
      }}
    >
      {/* Background Overlays */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.2)'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)'
      }} />
      
      {/* Haluland Logo - Top Corner */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src="/logo.png"
              alt="Haluland"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%'
              }}
            />
          </div>
          <span style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '11px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            margin: 0,
            padding: 0,
            lineHeight: 1,
            letterSpacing: '0.5px'
          }}>HALULAND</span>
        </div>
        {/* Decorative dot */}
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%'
        }} />
      </div>

      {/* Story Image with Floating Title and Category */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.3)'
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
          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 100%)'
          }} />
          
          {/* Category Badge on Image */}
          {story.category && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 1000
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '6px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)',
                minHeight: '20px'
              }}>
                <span style={{
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  lineHeight: '1',
                  fontSize: '9px',
                  color: '#1F2937',
                  margin: 0,
                  padding: 0
                }}>{story.category.name}</span>
              </div>
            </div>
          )}
          
          {/* Title Floating on Image */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '16px',
            right: '16px'
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '1.3',
              color: '#FFFFFF',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
              margin: 0,
              padding: 0,
              textAlign: 'left',
              letterSpacing: 'normal'
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
        padding: '0 20px',
        marginTop: '8px',
        marginBottom: '8px'
      }}>
        <p style={{
          opacity: 0.95,
          lineHeight: '1.6',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          fontSize: '12px',
          margin: 0,
          padding: 0,
          fontWeight: '400',
          letterSpacing: 'normal'
        }}>
          {truncateText(story.excerpt || "", 85)}
        </p>
      </div>

      {/* Bottom Link */}
      <div style={{ position: 'relative' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '28px',
          padding: '12px 20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            color: 'white',
            fontWeight: '600',
            textAlign: 'center',
            fontSize: '11px',
            margin: 0,
            padding: 0,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            lineHeight: 1,
            letterSpacing: 'normal'
          }}>
            📖 Read full story on haluland.com
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '64px',
        right: '16px',
        width: '4px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '128px',
        right: '24px',
        width: '8px',
        height: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '16px',
        width: '4px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '112px',
        left: '24px',
        width: '4px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%'
      }} />
    </div>
  );
}
