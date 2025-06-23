'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaPause, FaPlay } from 'react-icons/fa';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function MediaCarousel({ slides = [], autoPlayDelay = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(autoPlayDelay);
  const timerRef = useRef(null);

  const len = slides.length;
  const goTo = (i) => {
    setCurrent(((i % len) + len) % len);
    setStartTime(Date.now());
    setRemainingTime(autoPlayDelay);
  };
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (isPlaying) {
      const elapsed = Date.now() - startTime;
      const timeout = remainingTime - elapsed;
      timerRef.current = setTimeout(() => {
        next();
      }, timeout);

      return () => clearTimeout(timerRef.current);
    } else {
      const elapsed = Date.now() - startTime;
      setRemainingTime((prev) => Math.max(0, prev - elapsed));
      clearTimeout(timerRef.current);
    }
  }, [isPlaying, current]);

  const renderMedia = (slide, active) => {
    if (slide.type === 'video') {
      return (
        <div className="w-full h-full pointer-events-none">
          <ReactPlayer
            url={slide.src}
            playing={active && isPlaying}
            muted
            loop
            width="100%"
            height="100%"
            playsinline
            className="object-cover w-full h-full pointer-events-none"
            config={{ youtube: { playerVars: { showinfo: 0, modestbranding: 1 } } }}
          />
        </div>
      );
    }
    return (
      <img src={slide.src} alt={slide.alt || 'slide'} className="object-cover w-full h-full pointer-events-none" />
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {renderMedia(s, i === current)}

          {(s.title || s.subtitle || s.cta) && (
            <div className="absolute bottom-20 left-10 text-white max-w-xl drop-shadow-lg z-20 pointer-events-auto">
              {s.title && <h2 className="text-4xl font-bold mb-4">{s.title}</h2>}
              {s.subtitle && <p className="text-lg mb-2 opacity-90">{s.subtitle}</p>}
              {s.cta && (
                <a href={s.cta.href} className="inline-block px-4 py-2 mt-2 text-black bg-white rounded shadow hover:bg-gray-200">
                  {s.cta.label}
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {/* play / pause */}
      <div className="absolute bottom-16 right-4 z-30 pointer-events-auto">
        <button
          onClick={() => {
            setIsPlaying((prev) => !prev);
            setStartTime(Date.now());
          }}
          className="text-white bg-white/20 p-2 rounded-full backdrop-blur-md hover:cursor-pointer hover:opacity-90"
        >
          {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
        </button>
      </div>

      {/* progress bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-8xl flex h-1 z-30 pointer-events-auto px-4">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className="flex-1 bg-white/20 mx-1 relative cursor-pointer overflow-hidden rounded-full transition-colors duration-100 ease-out transform-gpu hover:scale-y-150 hover:bg-white/40"
          >
            {i === current && (
              <span
                key={current}
                className="absolute inset-0 bg-white origin-left rounded-full"
                style={{
                  animation: `bar ${autoPlayDelay}ms linear forwards`,
                  animationPlayState: isPlaying ? 'running' : 'paused'
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
