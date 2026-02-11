"use client"

import { useEffect, useState, useCallback, useRef } from "react"

// --- Types ---
type MessageSide = "left" | "right"

interface ChatMessage {
  text: string
  time: string
  side: MessageSide
  mode?: "normal" | "type-delete"
}

interface ChatDay {
  date: string
  messages: ChatMessage[]
  showSilence?: boolean
  silenceDelay?: number
}

// --- Data ---
const STORY: ChatDay[] = [
  {
    date: "07.02.2026",
    messages: [{ text: "iyi geceler", time: "03.42", side: "right" }],
    showSilence: true,
    silenceDelay: 5000,
  },
  {
    date: "08.02.2026",
    messages: [
      { text: "1 ile 100 arasinda sayi sec", time: "03.18", side: "left" },
      { text: "5", time: "03.18", side: "right" },
      { text: "5 gun konusmicaz", time: "03.20", side: "left" },
    ],
  },
  {
    date: "08.02.2026 ",
    messages: [
      { text: "gunaydin", time: "14.27", side: "right" },
      {
        text: "cok ozledim nerdesin",
        time: "14.28",
        side: "right",
        mode: "type-delete",
      },
    ],
  },
  {
    date: "09.02.2026",
    messages: [
      { text: "gunaydin", time: "13.20", side: "right" },
      {
        text: "ozledim nerdesin",
        time: "14.00",
        side: "right",
        mode: "type-delete",
      },
      {
        text: "ozledim nerdesin",
        time: "15.00",
        side: "right",
        mode: "type-delete",
      },
      {
        text: "ozledim nerdesin",
        time: "16.00",
        side: "right",
        mode: "type-delete",
      },
      { text: "iyi misin", time: "19.39", side: "right" },
    ],
  },
  {
    date: "10.02.2026",
    messages: [
      { text: "nerdesin", time: "10.00", side: "right", mode: "type-delete" },
      { text: "seni cok ozledim", time: "11.00", side: "right", mode: "type-delete" },
      { text: "5 gun bu kadar uzun muydu", time: "12.00", side: "right", mode: "type-delete" },
      { text: "nerdesin", time: "13.00", side: "right", mode: "type-delete" },
      { text: "seni cok ozledim", time: "14.00", side: "right", mode: "type-delete" },
      { text: "5 gun bu kadar uzun muydu", time: "15.00", side: "right", mode: "type-delete" },
      { text: "nerdesin", time: "16.00", side: "right", mode: "type-delete" },
    ],
  },
  {
    date: "11.02.2026",
    messages: [
      { text: "fotograf", time: "01.21", side: "left" },
      { text: "noldu buraya olm", time: "01.25", side: "right" },
      { text: "dustum", time: "01.26", side: "left" },
    ],
  },
]

// --- Sub-components ---

function DateBadge({ date }: { date: string }) {
  return (
    <div className="flex justify-center mb-4 mt-2">
      <span className="bg-[#182229]/60 text-[#8696a0] text-[11px] px-3 py-1 rounded-lg font-sans">
        {date.trim()}
      </span>
    </div>
  )
}

function MessageBubble({
  text,
  time,
  side,
  isTyping,
  typedText,
  isDeleting,
}: {
  text: string
  time: string
  side: MessageSide
  isTyping?: boolean
  typedText?: string
  isDeleting?: boolean
}) {
  const isLeft = side === "left"
  const displayText = isTyping ? (typedText ?? "") : text

  if (isTyping && !typedText) return null

  return (
    <div
      className={`flex ${isLeft ? "justify-start" : "justify-end"} mb-1.5 px-3`}
      style={{ animation: isTyping ? "none" : "msgAppear 0.3s ease-out" }}
    >
      <div
        className={`relative max-w-[75%] rounded-lg px-3 py-1.5 shadow-sm ${
          isLeft
            ? "bg-[#202c33] rounded-tl-none"
            : "bg-[#005c4b] rounded-tr-none"
        } ${isDeleting ? "opacity-60" : ""}`}
      >
        <p className="text-[#e9edef] text-[14.2px] font-sans leading-relaxed break-words">
          {displayText}
          {isTyping && (
            <span className="animate-pulse text-[#e9edef]/50">|</span>
          )}
        </p>
        <div className="flex items-center justify-end gap-1 -mt-0.5">
          <span className="text-[11px] text-[#8696a0]">{time}</span>
          {!isLeft && (
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              className="text-[#53bdeb]"
              aria-hidden="true"
            >
              <path
                d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.36-.186.465.465 0 0 0-.344.153l-.311.339a.514.514 0 0 0-.14.36c0 .13.046.252.14.344l2.639 2.742.311.339c.095.102.204.153.343.153a.465.465 0 0 0 .381-.178l6.751-8.318.153-.178a.418.418 0 0 0 .085-.258.466.466 0 0 0-.14-.35l-.273-.254z"
                fill="currentColor"
              />
              <path
                d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.249-.273.338 1.536 1.6.311.339c.095.102.204.153.343.153a.465.465 0 0 0 .381-.178l6.751-8.318.153-.178a.418.418 0 0 0 .085-.258.466.466 0 0 0-.14-.35l-.273-.254z"
                fill="currentColor"
              />
            </svg>
          )}
          {isLeft && (
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              className="text-[#8696a0]"
              aria-hidden="true"
            >
              <path
                d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.36-.186.465.465 0 0 0-.344.153l-.311.339a.514.514 0 0 0-.14.36c0 .13.046.252.14.344l2.639 2.742.311.339c.095.102.204.153.343.153a.465.465 0 0 0 .381-.178l6.751-8.318.153-.178a.418.418 0 0 0 .085-.258.466.466 0 0 0-.14-.35l-.273-.254z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Main chat story ---
export function ChatStory({ onComplete }: { onComplete: () => void }) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  // Track which message indices within a day were type-deleted and should be hidden
  const [deletedIndices, setDeletedIndices] = useState<Set<number>>(new Set())
  const [typingState, setTypingState] = useState<{
    isActive: boolean
    typedText: string
    isDeleting: boolean
  }>({ isActive: false, typedText: "", isDeleting: false })
  const [fadeOut, setFadeOut] = useState(false)
  const [showSadEmojis, setShowSadEmojis] = useState(false)
  const [showSilence, setShowSilence] = useState(false)
  const [dayTransition, setDayTransition] = useState(false)

  const timersRef = useRef<number[]>([])

  const clearAllTimers = useCallback(() => {
    for (const id of timersRef.current) {
      clearTimeout(id)
      clearInterval(id)
    }
    timersRef.current = []
  }, [])

  const addTimer = useCallback((id: number) => {
    timersRef.current.push(id)
  }, [])

  const currentDay = STORY[currentDayIndex]
  const currentMessage = currentDay?.messages[visibleMessages]

  const goToNextDay = useCallback(() => {
    setFadeOut(true)
    const t1 = window.setTimeout(() => {
      // Show fast-forward transition
      setDayTransition(true)
      const t2 = window.setTimeout(() => {
        if (currentDayIndex < STORY.length - 1) {
          setCurrentDayIndex((prev) => prev + 1)
          setVisibleMessages(0)
          setDeletedIndices(new Set())
          setTypingState({ isActive: false, typedText: "", isDeleting: false })
          setShowSilence(false)
          setDayTransition(false)
          setFadeOut(false)
        }
      }, 1000)
      addTimer(t2)
    }, 500)
    addTimer(t1)
  }, [currentDayIndex, addTimer])

  useEffect(() => {
    if (!currentDay) return

    const totalMessages = currentDay.messages.length

    if (visibleMessages >= totalMessages) {
      const isLastDay = currentDayIndex === STORY.length - 1

      if (isLastDay) {
        const t1 = window.setTimeout(() => {
          setShowSadEmojis(true)
          const t2 = window.setTimeout(() => {
            onComplete()
          }, 5000)
          addTimer(t2)
        }, 1500)
        addTimer(t1)
        return () => clearAllTimers()
      }

      // If this day has a silence overlay, show it first
      if (currentDay.showSilence && !showSilence) {
        const t = window.setTimeout(() => {
          setShowSilence(true)
        }, 1000)
        addTimer(t)
        return () => clearAllTimers()
      }

      // If silence is already showing, wait silenceDelay then go to next day
      if (currentDay.showSilence && showSilence) {
        const t = window.setTimeout(goToNextDay, currentDay.silenceDelay ?? 5000)
        addTimer(t)
        return () => clearAllTimers()
      }

      const t = window.setTimeout(goToNextDay, 2000)
      addTimer(t)
      return () => clearAllTimers()
    }

    const msg = currentDay.messages[visibleMessages]

    if (msg.mode === "type-delete") {
      setTypingState({ isActive: true, typedText: "", isDeleting: false })

      let charIndex = 0
      const fullText = msg.text

      const typeInterval = window.setInterval(() => {
        charIndex++
        if (charIndex <= fullText.length) {
          setTypingState({
            isActive: true,
            typedText: fullText.slice(0, charIndex),
            isDeleting: false,
          })
        } else {
          clearInterval(typeInterval)
          const pauseTimer = window.setTimeout(() => {
            setTypingState((prev) => ({ ...prev, isDeleting: true }))
            let deleteIndex = fullText.length
            const deleteInterval = window.setInterval(() => {
              deleteIndex--
              if (deleteIndex >= 0) {
                setTypingState({
                  isActive: true,
                  typedText: fullText.slice(0, deleteIndex),
                  isDeleting: true,
                })
              } else {
                clearInterval(deleteInterval)
                // Mark this message index as deleted so it won't render,
                // and advance to next message in a single batch
                const deletedIdx = visibleMessages
                setTypingState({
                  isActive: false,
                  typedText: "",
                  isDeleting: false,
                })
                const nextTimer = window.setTimeout(() => {
                  setDeletedIndices((prev) => {
                    const next = new Set(prev)
                    next.add(deletedIdx)
                    return next
                  })
                  setVisibleMessages((prev) => prev + 1)
                }, 300)
                addTimer(nextTimer)
              }
            }, 40)
            addTimer(deleteInterval)
          }, 1200)
          addTimer(pauseTimer)
        }
      }, 70)
      addTimer(typeInterval)

      return () => clearAllTimers()
    }

    // Normal message
    const delay = visibleMessages === 0 ? 800 : 1200
    const t = window.setTimeout(() => {
      setVisibleMessages((prev) => prev + 1)
    }, delay)
    addTimer(t)
    return () => clearAllTimers()
  }, [
    visibleMessages,
    currentDayIndex,
    currentDay,
    goToNextDay,
    onComplete,
    addTimer,
    clearAllTimers,
    showSilence,
  ])

  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])

  if (!currentDay) return null

  // Only show messages up to visibleMessages count, excluding deleted ones
  const messagesToShow = currentDay.messages
    .slice(0, visibleMessages)
    .map((msg, i) => ({ ...msg, originalIndex: i }))
    .filter((msg) => !deletedIndices.has(msg.originalIndex))

  const isTypingActive =
    typingState.isActive && currentMessage?.mode === "type-delete"

  return (
    <div className="fixed inset-0 bg-[#0b141a] z-50 flex flex-col">
      {showSadEmojis && <SadEmojiRain />}

      {/* Day transition overlay */}
      {dayTransition && (
        <div className="absolute inset-0 z-[55] bg-[#0b141a]/80 flex items-center justify-center">
          <div
            className="text-5xl"
            style={{ animation: "fastForwardSlide 1s ease-in forwards" }}
            aria-hidden="true"
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M4 18l8.5-6L4 6v12z" fill="#53bdeb" />
              <path d="M13 18l8.5-6L13 6v12z" fill="#53bdeb" />
            </svg>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3 border-b border-[#2a3942]">
        <div className="w-10 h-10 rounded-full bg-[#2a3942] flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#8696a0]"
            aria-hidden="true"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#e9edef] text-base font-sans font-medium leading-tight">
            Asiri Guzel Sude
          </p>
          <p className="text-[#8696a0] text-xs font-sans">
            son gorulme Mertin kalbinde
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div
        className={`flex-1 overflow-y-auto py-2 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundColor: "#0b141a" }}
      >
        <DateBadge date={currentDay.date} />

        {messagesToShow.map((msg) => (
          <MessageBubble
            key={`${currentDayIndex}-${msg.originalIndex}`}
            text={msg.text}
            time={msg.time}
            side={msg.side}
          />
        ))}

        {isTypingActive && (
          <MessageBubble
            text={currentMessage.text}
            time={currentMessage.time}
            side={currentMessage.side}
            isTyping
            typedText={typingState.typedText}
            isDeleting={typingState.isDeleting}
          />
        )}

        {/* Silence overlay */}
        {showSilence && (
          <div className="flex flex-1 items-center justify-center py-12">
            <p
              className="text-[#e9edef] text-2xl font-sans font-semibold tracking-wide text-center"
              style={{ animation: "silenceFadeIn 1.5s ease-out forwards" }}
            >
              {"Sessizlik basladi..."}
            </p>
          </div>
        )}
      </div>

      {/* Input bar (decorative) */}
      <div className="bg-[#1f2c34] px-2 py-2 flex items-center gap-2 border-t border-[#2a3942]">
        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
          <span className="text-[#8696a0] text-sm font-sans">Mesaj</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#0b141a]"
            aria-hidden="true"
          >
            <path
              d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.516 13.239 2.212-13.239 2.212-.011 7.517z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>


    </div>
  )
}

// --- Sad Emoji Rain ---
function SadEmojiRain() {
  const [emojis, setEmojis] = useState<
    { id: number; left: number; delay: number; duration: number; size: number; emoji: string }[]
  >([])

  useEffect(() => {
    const emojiChars = ["\u{1F622}", "\u{1F61E}", "\u{1F614}", "\u{1F494}", "\u{1F625}", "\u{1F97A}"]
    setEmojis(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
        size: Math.random() * 20 + 18,
        emoji: emojiChars[Math.floor(Math.random() * 6)],
      }))
    )
  }, [])

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {emojis.map((e) => (
        <div
          key={e.id}
          className="absolute -top-10"
          style={{
            left: `${e.left}%`,
            fontSize: `${e.size}px`,
            animation: `sadFall ${e.duration}s ease-in ${e.delay}s forwards`,
          }}
        >
          {e.emoji}
        </div>
      ))}
      <style>{`
        @keyframes sadFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
