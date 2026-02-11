"use client"

import { useEffect, useState } from "react"

interface TimeElapsed {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Cumartesi 7 Subat 2026, gece 03:42 (Turkey time UTC+3)
const START_DATE = new Date("2026-02-07T00:42:00.000Z") // 03:42 Turkey time = 00:42 UTC

function getTimeElapsed(): TimeElapsed {
  const now = new Date()
  const diff = now.getTime() - START_DATE.getTime()
  
  const seconds = Math.floor((diff / 1000) % 60)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return { days, hours, minutes, seconds }
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeElapsed())
    const interval = setInterval(() => {
      setTime(getTimeElapsed())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main days counter */}
      <div className="text-center">
        <div className="relative">
          <span className="text-8xl md:text-9xl font-bold text-primary tracking-tight tabular-nums">
            {time.days}
          </span>
          <span className="block text-xl md:text-2xl text-foreground/70 font-medium mt-2 tracking-wide">
            {time.days === 1 ? "gün" : "gün"} oldu
          </span>
        </div>
      </div>

      {/* Detailed timer */}
      <div className="flex items-center gap-3 md:gap-5">
        <TimeBlock value={time.days} label="Gün" />
        <Separator />
        <TimeBlock value={time.hours} label="Saat" />
        <Separator />
        <TimeBlock value={time.minutes} label="Dakika" />
        <Separator />
        <TimeBlock value={time.seconds} label="Saniye" />
      </div>

      {/* Emotional text */}
      <p className="text-foreground/50 text-sm font-sans mt-2 tracking-wide">
        sessizligin baslangici...
      </p>
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card/80 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-sm border border-border/50 min-w-[60px] md:min-w-[72px]">
        <span className="text-2xl md:text-3xl font-bold text-foreground tabular-nums block text-center">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[11px] md:text-xs text-foreground/50 mt-1.5 font-medium tracking-wider uppercase">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="text-2xl md:text-3xl font-bold text-primary/40 self-start mt-2 md:mt-3">:</span>
  )
}
