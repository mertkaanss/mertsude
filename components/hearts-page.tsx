import { FloatingHearts } from "@/components/floating-hearts"
import { WhatsAppBubble } from "@/components/whatsapp-bubble"
import { CountdownTimer } from "@/components/countdown-timer"

export function HeartsPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Floating hearts animation */}
      <FloatingHearts />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-md w-full">
        {/* WhatsApp message bubble */}
        <WhatsAppBubble />

        {/* Countdown timer */}
        <CountdownTimer />
      </div>
    </main>
  )
}
