"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const smooth = reduceMotion !== true;

  return (
    <ReactLenis
      root
      options={{
        lerp: smooth ? 0.07 : 1,
        smoothWheel: smooth,
        autoRaf: true,
        anchors: smooth,
        wheelMultiplier: smooth ? 0.92 : 1,
        touchMultiplier: 1,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
