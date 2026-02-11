"use client"

import { useState } from "react"
import { ChatStory } from "@/components/chat-story"
import { HeartsPage } from "@/components/hearts-page"

export default function Page() {
  const [storyComplete, setStoryComplete] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  function handleStoryComplete() {
    setStoryComplete(true)
    // Small delay for fade transition
    setTimeout(() => {
      setShowHearts(true)
    }, 800)
  }

  return (
    <>
      {!storyComplete && <ChatStory onComplete={handleStoryComplete} />}

      {storyComplete && (
        <div className={`transition-opacity duration-1000 ${showHearts ? "opacity-100" : "opacity-0"}`}>
          <HeartsPage />
        </div>
      )}
    </>
  )
}
