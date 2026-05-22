"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Create blob cursor
    const blob = document.createElement("div");
    blob.className = "cursor-blob";
    document.body.appendChild(blob);

    // Create center dot
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let blobX = 0, blobY = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail dots
      const now = Date.now();
      if (now - lastTrailTime > 30) {
        const trail = document.createElement("div");
        trail.className = "cursor-trail";
        trail.style.left = `${mouseX}px`;
        trail.style.top = `${mouseY}px`;
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 600);
        lastTrailTime = now;
      }

      // Update dot position instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const handleMouseDown = () => {
      document.body.classList.add("cursor-click");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("cursor-click");
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a, button, [role='button']")
      ) {
        document.body.classList.add("cursor-hover");
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a, button, [role='button']")
      ) {
        document.body.classList.remove("cursor-hover");
      }
    };

    const animate = () => {
      // Smooth follow for blob
      blobX += (mouseX - blobX) * 0.12;
      blobY += (mouseY - blobY) * 0.12;
      blob.style.left = `${blobX}px`;
      blob.style.top = `${blobY}px`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      blob.remove();
      dot.remove();
      document.querySelectorAll(".cursor-trail").forEach(t => t.remove());
    };
  }, []);

  return null;
}
