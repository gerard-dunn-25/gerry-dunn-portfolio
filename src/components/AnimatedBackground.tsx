import { useRef } from "react";
import { useTheme } from "next-themes";
import { useAnimatedBackground } from "../hooks/useAnimatedBackground";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useAnimatedBackground(canvasRef, isDark);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}