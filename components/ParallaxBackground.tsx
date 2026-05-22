"use client";

import { useEffect, useState } from "react";

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Parallax animated background */}
      <div className="animated-bg" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="bg-blob-1" style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
        <div className="bg-blob-2" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="bg-blob-3" style={{ transform: `translateY(${scrollY * 0.25}px)` }} />
      </div>

      {/* Parallax floating characters with depth */}
      <div className="floating-character char-1" style={{ transform: `translateY(${-scrollY * 0.1}px)` }}>🎨</div>
      <div className="floating-character char-2" style={{ transform: `translateY(${-scrollY * 0.15}px)` }}>✨</div>
      <div className="floating-character char-3" style={{ transform: `translateY(${-scrollY * 0.08}px)` }}>🚀</div>
      <div className="floating-character char-4" style={{ transform: `translateY(${-scrollY * 0.12}px)` }}>💫</div>
      <div className="floating-character char-5" style={{ transform: `translateY(${-scrollY * 0.18}px)` }}>🎯</div>
      <div className="floating-character char-6" style={{ transform: `translateY(${-scrollY * 0.14}px)` }}>⚡</div>
      <div className="floating-character char-7" style={{ transform: `translateY(${-scrollY * 0.09}px)` }}>🌟</div>
      <div className="floating-character char-8" style={{ transform: `translateY(${-scrollY * 0.16}px)` }}>🔥</div>
    </>
  );
}
