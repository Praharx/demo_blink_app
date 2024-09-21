import React from "react";
import { SpotlightPreview } from "./Spotlight";

export default function GridBackgroundDemo() {
  return (
    <div className="h-[40rem] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
      <SpotlightPreview/>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      </div>
    </div>
  );
}
