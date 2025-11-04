"use client";
import React from "react";

type Props = {
  size?: number;
  className?: string;
  color?: string; // permite sobrescrever a cor se necessário
};

export default function LoadingSpinner({
  size = 56,
  className = "",
  color = "#B91C1C", // vermelho (tailwind red-700)
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor={color} stopOpacity={1} />
          <stop offset=".3" stopColor={color} stopOpacity={0.9} />
          <stop offset=".6" stopColor={color} stopOpacity={0.6} />
          <stop offset=".8" stopColor={color} stopOpacity={0.3} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>

      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        stroke="url(#a12)"
        strokeWidth={15}
        strokeLinecap="round"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="360;0"
          keyTimes="0;1"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        opacity={0.2}
        stroke={color}
        strokeWidth={15}
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      />
    </svg>
  );
}
