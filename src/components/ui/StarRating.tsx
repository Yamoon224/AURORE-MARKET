"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number | null;
  max?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  max = 5,
  size = 14,
  showValue = false,
  className,
}: StarRatingProps) {
  if (!rating) return null;

  const filled = Math.round(rating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < filled
                ? "fill-[#d4a853] text-[#d4a853]"
                : "fill-transparent text-[#d4a853] opacity-30"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-[var(--text-muted)] ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
