// src/components/SplineScene.tsx
"use client";

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="w-full h-full flex items-center justify-center translate-x-8 lg:translate-x-12">
      <Spline 
        scene="https://prod.spline.design/V2AYxQjTygn3hBwm/scene.splinecode" 
      />
    </div>
  );
}