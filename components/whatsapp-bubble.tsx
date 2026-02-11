"use client"

export function WhatsAppBubble() {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="relative max-w-xs">
        {/* WhatsApp message bubble */}
        <div className="bg-[#dcf8c6] rounded-xl rounded-br-sm px-4 py-2.5 shadow-md relative">
          {/* Bubble tail */}
          <div className="absolute -bottom-0 -right-2 w-0 h-0 border-l-[10px] border-l-[#dcf8c6] border-b-[10px] border-b-transparent" />
          
          <p className="text-[#303030] text-sm font-sans leading-relaxed">
            iyi geceler
          </p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[10px] text-[#667781]">03.42</span>
            {/* Double check marks */}
            <svg width="16" height="11" viewBox="0 0 16 11" className="text-[#53bdeb]" aria-hidden="true">
              <path
                d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.36-.186.465.465 0 0 0-.344.153l-.311.339a.514.514 0 0 0-.14.36c0 .13.046.252.14.344l2.639 2.742.311.339c.095.102.204.153.343.153a.465.465 0 0 0 .381-.178l6.751-8.318.153-.178a.418.418 0 0 0 .085-.258.466.466 0 0 0-.14-.35l-.273-.254z"
                fill="currentColor"
              />
              <path
                d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.249-.273.338 1.536 1.6.311.339c.095.102.204.153.343.153a.465.465 0 0 0 .381-.178l6.751-8.318.153-.178a.418.418 0 0 0 .085-.258.466.466 0 0 0-.14-.35l-.273-.254z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Day label */}
        <div className="flex justify-center mt-3">
          <span className="bg-[#e1f2fb] text-[#54656f] text-[11px] px-3 py-1 rounded-lg shadow-sm font-sans">
            Cumartesi
          </span>
        </div>
      </div>
    </div>
  )
}
