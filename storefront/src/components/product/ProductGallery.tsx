'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-none py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={clsx(
                'relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 bg-stone-100 transition-all shrink-0 focus:outline-none',
                selectedIndex === idx
                  ? 'border-stone-950 ring-1 ring-stone-950 scale-105 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              )}
              aria-label={`Thumbnail ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden border border-stone-200/80 group">
        <Image
          src={currentImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Zoom Button Trigger */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-stone-950 shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          aria-label="Expand image preview"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Carousel arrows if multiple images */}
        {images.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-stone-800 hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-stone-800 hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-stone-900/80"
            aria-label="Close zoom preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full aspect-[4/5]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
