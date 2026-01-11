"use client";
import React, { useCallback, useEffect, useState } from "react";

interface DragGhostProps {
  type: string | null;
}

export default function DragGhost({ type }: DragGhostProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
console.log("DragGhost rendered with type:", type);
  const onPointerMove = useCallback((event: PointerEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  useEffect(() => {
    if (!type) return;

    document.addEventListener("pointermove", onPointerMove);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [type, onPointerMove]);

  if (!type) return null;

  return (
    <div
      className="
        fixed
        top-0 left-0
        z-[9999]
        pointer-events-none
        select-none
        bg-black
        text-white
        px-3 py-2
        rounded
        will-change-transform
      "
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <span className="text-[10px]">{type}</span>
    </div>
  );
}
