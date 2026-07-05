type IconProps = { className?: string }

export function CursorIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 3l12 8.5-5.2.8L11 20 5 3z"
        fill="currentColor"
      />
      <path
        d="M5 3l6.8 9.3-2.5 3.9L5 3z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  )
}

export function ClaudeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#D97757" />
      <path
        d="M12 6.5c-1.2 1.8-2.4 3.1-3.6 4.1 1.2.8 2.4 1.5 3.6 2.1 1.2-.6 2.4-1.3 3.6-2.1-1.2-1-2.4-2.3-3.6-4.1z"
        fill="#FAF5EE"
      />
      <path
        d="M8.4 12.6c-.9 1.1-1.5 2.3-1.8 3.6 1.3.3 2.5.9 3.4 1.8.9-.9 2.1-1.5 3.4-1.8-.3-1.3-.9-2.5-1.8-3.6-.9 1.1-2.1 1.7-3.4 1.7s-2.5-.6-3.4-1.7z"
        fill="#FAF5EE"
        opacity="0.92"
      />
    </svg>
  )
}

export function CodexIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#10A37F" />
      <path
        d="M8 8h8v1.6H10.4v2.2H15v1.6H10.4V16H8V8z"
        fill="#FAF5EE"
      />
      <path
        d="M15.2 8H17l-2.2 8h-1.6L15.2 8z"
        fill="#FAF5EE"
        opacity="0.9"
      />
    </svg>
  )
}
