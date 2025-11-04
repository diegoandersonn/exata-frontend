"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function FullScreenLoaderPortal({
  open,
  size = 80,
}: {
  open: boolean;
  size?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9] bg-white flex items-center justify-center">
      <LoadingSpinner size={size} className="w-[5rem] h-[5rem]" />
    </div>,
    document.body
  );
}
