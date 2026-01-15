// SVG Icons for the picker wheel app

export function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M2.5 4.5L6 8L9.5 4.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 5L15 15M15 5L5 15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CelebrationIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="56" 
      height="56" 
      viewBox="0 0 56 56" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Trophy/Star burst celebration icon */}
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2" fill="none" />
      <path 
        d="M28 12L31 22H42L33 29L36 40L28 33L20 40L23 29L14 22H25L28 12Z" 
        fill="currentColor"
      />
      {/* Confetti lines */}
      <line x1="8" y1="14" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="14" x2="44" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="42" x2="12" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="42" x2="44" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6 2V10M2 6H10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

