"use client"

import { useEffect, useState, useMemo } from "react"

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
  sway: number
  rotation: number
}

function generateHearts(count: number): Heart[] {
  const colors = [
    "hsla(340, 80%, 55%, VAR)",
    "hsla(340, 70%, 65%, VAR)",
    "hsla(350, 85%, 60%, VAR)",
    "hsla(330, 75%, 50%, VAR)",
    "hsla(345, 90%, 70%, VAR)",
  ]

  return Array.from({ length: count }, (_, i) => {
    const opacity = Math.random() * 0.5 + 0.15
    return {
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 22 + 10,
      duration: Math.random() * 7 + 5,
      delay: Math.random() * 10,
      opacity,
      color: colors[Math.floor(Math.random() * colors.length)].replace("VAR", String(opacity)),
      sway: (Math.random() - 0.5) * 60,
      rotation: (Math.random() - 0.5) * 90,
    }
  })
}

export function FloatingHearts() {
  const [mounted, setMounted] = useState(false)
  const hearts = useMemo(() => generateHearts(30), [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animation: `heartFloat${heart.id} ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={heart.color}
            />
          </svg>
        </div>
      ))}

      <style>
        {hearts.map(
          (heart) => `
          @keyframes heartFloat${heart.id} {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg) scale(0.4);
              opacity: 0;
            }
            10% {
              opacity: ${heart.opacity};
            }
            30% {
              transform: translateY(-30vh) translateX(${heart.sway * 0.5}px) rotate(${heart.rotation * 0.3}deg) scale(0.8);
              opacity: ${heart.opacity * 0.9};
            }
            60% {
              transform: translateY(-60vh) translateX(${heart.sway}px) rotate(${heart.rotation * 0.7}deg) scale(1);
              opacity: ${heart.opacity * 0.6};
            }
            100% {
              transform: translateY(-110vh) translateX(${heart.sway * 0.8}px) rotate(${heart.rotation}deg) scale(0.9);
              opacity: 0;
            }
          }
        `
        ).join("")}
      </style>
    </div>
  )
}
