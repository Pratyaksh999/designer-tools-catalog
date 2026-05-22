"use client";

import { motion } from "framer-motion";

interface SkeletonCardProps {
  index: number;
}

export default function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{
        padding: 26,
        borderRadius: 18,
        background: "rgba(0,0,0,0.02)",
        border: "1px solid rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
      }}
      className="dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.05)]"
    >
      {/* Shimmer effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Icon + Title skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(0,0,0,0.05)",
          }}
          className="dark:bg-[rgba(255,255,255,0.05)]"
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              width: "60%",
              height: 16,
              borderRadius: 4,
              background: "rgba(0,0,0,0.05)",
              marginBottom: 6,
            }}
            className="dark:bg-[rgba(255,255,255,0.05)]"
          />
          <div
            style={{
              width: "40%",
              height: 12,
              borderRadius: 4,
              background: "rgba(0,0,0,0.05)",
            }}
            className="dark:bg-[rgba(255,255,255,0.05)]"
          />
        </div>
      </div>

      {/* Description skeleton */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            width: "100%",
            height: 12,
            borderRadius: 4,
            background: "rgba(0,0,0,0.05)",
            marginBottom: 6,
          }}
          className="dark:bg-[rgba(255,255,255,0.05)]"
        />
        <div
          style={{
            width: "80%",
            height: 12,
            borderRadius: 4,
            background: "rgba(0,0,0,0.05)",
          }}
          className="dark:bg-[rgba(255,255,255,0.05)]"
        />
      </div>

      {/* Tags skeleton */}
      <div style={{ display: "flex", gap: 6 }}>
        {[60, 80, 70].map((width, i) => (
          <div
            key={i}
            style={{
              width,
              height: 24,
              borderRadius: 6,
              background: "rgba(0,0,0,0.05)",
            }}
            className="dark:bg-[rgba(255,255,255,0.05)]"
          />
        ))}
      </div>
    </motion.div>
  );
}
