'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';

export default function MediaCarousel({
  slides = [],
  autoPlay = true,
  autoPlayDelay = 10000,
  fullHeight = true,
}) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timeoutRef = useRef(null);

  const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);

  useEffect(() => {
    clear();
    if (isPlaying && slides.length > 1) {
      timeoutRef.current = setTimeout(() => next(), autoPlayDelay);
    }
    return clear;
  }, [current, isPlaying, autoPlayDelay, slides.length]);

  const goTo = (idx) => setCurrent((idx + slides.length) % slides.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  if (slides.length === 0) return null;

  return (
    <section
      className={`relative w-full ${
        fullHeight ? 'h-screen' : 'aspect-video'
      } overflow-hidden select-none`}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.type === 'image' ? (
            <Image
              src={slide.src}
              alt={slide.alt || ''}
              fill
              priority={idx === 0}
              className="object-cover"
            />
          ) : (
            <ReactPlayer
              url={slide.src}
              playing={idx === current && isPlaying}
              muted
              loop
              width="100%"
              height="100%"
              className="object-cover"
            />
          )}

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text overlay */}
          {(slide.title || slide.subtitle || slide.cta) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-white z-10">
              {slide.title && (
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
              )}
              {slide.subtitle && (
                <p className="max-w-2xl text-lg md:text-xl drop-shadow-lg">
                  {slide.subtitle}
                </p>
              )}
              {slide.cta?.label && (
                <a
                  href={slide.cta.href || '#'}
                  className="inline-block rounded-full bg-white px-6 py-2 font-semibold text-black transition-colors hover:bg-black hover:text-white"
                >
                  {slide.cta.label}
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Controls & Pagination */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full border border-black bg-white px-4 py-2 text-black transition-colors hover:bg-black hover:text-white"
          >
            &#8249;
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="rounded-full border border-black bg-white px-4 py-2 text-black transition-colors hover:bg-black hover:text-white"
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="rounded-full border border-black bg-white px-4 py-2 text-black transition-colors hover:bg-black hover:text-white"
          >
            &#8250;
          </button>

          {/* Dots */}
          <div className="ml-4 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-3 w-3 rounded-full border border-white transition-all ${
                  idx === current ? 'bg-white' : 'bg-transparent hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
