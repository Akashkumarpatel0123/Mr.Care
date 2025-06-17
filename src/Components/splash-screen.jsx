"use client"

import { Flower } from "lucide-react"
import { cn } from "../lib/utils"
import { useEffect, useState } from "react"

export default function SplashScreen({ isFullscreen, isFading, onTransitionComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1.7
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-[#8D2E7D] transition-all duration-800",
    isFading ? "animate-fade-out" : ""
      )}
      onAnimationEnd={() => {
        if (isFading && onTransitionComplete) {
          onTransitionComplete()
        }
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-[60vh] w-[60vh] animate-[spin_30s_linear_infinite] rounded-full border-[40px] border-white/10"></div>
        <div className="absolute right-[15%] top-[30%] h-[40vh] w-[40vh] animate-[spin_20s_linear_infinite_reverse] rounded-full border-[30px] border-white/10"></div>
        <div className="absolute bottom-[10%] left-[20%] h-[30vh] w-[30vh] animate-[spin_25s_linear_infinite] rounded-full border-[20px] border-white/10"></div>
      </div>

      {/* Logo and text */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center",
          isFading ? "animate-scale-out" : "animate-[fadeIn_1s_ease-out]"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-500",
            isFullscreen ? "scale-150" : "scale-100"
          )}
        >
          <Flower className="h-16 w-16 text-white animate-[pulse_2s_infinite]" />
          <h1 className="text-6xl font-bold text-white">Mr.care</h1>
        </div>
        <p className="mt-6 text-white/80 text-xl">Your Health, Our Responsibility</p>

        {/* Loading spinner */}
        <div className="mt-12 relative" aria-label="Loading" role="status">
          <div className="h-16 w-16 rounded-full border-4 border-white/20"></div>

          <svg className="absolute inset-0" viewBox="0 0 100 100" width="100%" height="100%">
            <circle
              className="text-white transition-all duration-300 ease-in-out"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
