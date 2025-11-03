"use client";
import React from "react";
import { createPortal } from "react-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";

type Props = {
  open: boolean;
  size?: number;
};

export default function FullScreenLoader({ open, size = 80 }: Props) {
  if (typeof window === "undefined" || !open) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[9] bg-white flex items-center justify-center"
    >
      <div className="flex items-center justify-center">
        <LoadingSpinner size={size} className="w-[5rem] h-[5rem]" />
      </div>
    </div>,
    document.body
  );
}
