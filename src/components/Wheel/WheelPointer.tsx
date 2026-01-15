import { useWheelStore, PointerId } from '../../stores/wheelStore'
import './WheelPointer.css'

interface WheelPointerProps {
  isTicking: boolean
}

// Pointer SVG definitions for each style
const pointerStyles: Record<PointerId, JSX.Element> = {
  // ========================================
  // FREE BASIC POINTERS
  // ========================================
  
  classic: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-classic" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-classic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C44536" />
          <stop offset="50%" stopColor="#A03428" />
          <stop offset="100%" stopColor="#7A2820" />
        </linearGradient>
      </defs>
      <polygon points="25,60 8,20 25,0 42,20" fill="url(#grad-classic)" filter="url(#shadow-classic)" />
      <polygon points="25,52 14,22 25,8 36,22" fill="#8B3D35" />
      <polygon points="25,8 20,18 30,18" fill="#D45D55" />
    </svg>
  ),
  
  triangle: (
    <svg width="50" height="55" viewBox="0 0 50 55">
      <defs>
        <filter id="shadow-tri" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-tri" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A5A5A" />
          <stop offset="50%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <polygon points="25,55 5,15 25,0 45,15" fill="url(#grad-tri)" filter="url(#shadow-tri)" />
      <polygon points="25,48 12,18 25,6 38,18" fill="#2A2A2A" />
      <polygon points="25,6 18,15 32,15" fill="#6A6A6A" />
      {/* Metallic edge */}
      <line x1="25" y1="6" x2="12" y2="18" stroke="#888" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  
  chevron: (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <defs>
        <filter id="shadow-chev" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-chev" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8B84A" />
          <stop offset="50%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#B8862A" />
        </linearGradient>
      </defs>
      <polygon points="25,50 5,30 15,30 15,10 25,0 35,10 35,30 45,30" fill="url(#grad-chev)" filter="url(#shadow-chev)" />
      <polygon points="25,42 12,28 18,28 18,14 25,6 32,14 32,28 38,28" fill="#C4922E" />
      <polygon points="25,6 21,12 29,12" fill="#F0C860" />
    </svg>
  ),

  // ========================================
  // THEME-MATCHED POINTERS (Pro)
  // ========================================
  
  dark: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-dark" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.6)"/>
        </filter>
        <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="50%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      <polygon points="25,60 6,22 25,0 44,22" fill="url(#grad-dark)" filter="url(#shadow-dark)" />
      <polygon points="25,52 13,24 25,8 37,24" fill="#0D0D0D" />
      {/* White accent line */}
      <line x1="25" y1="8" x2="25" y2="45" stroke="#D4D0C8" strokeWidth="2" opacity="0.8" />
      <circle cx="25" cy="48" r="3" fill="#D4D0C8" />
    </svg>
  ),
  
  light: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-light" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)"/>
        </filter>
        <linearGradient id="grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E8E4DC" />
          <stop offset="100%" stopColor="#D4D0C8" />
        </linearGradient>
      </defs>
      <polygon points="25,60 6,22 25,0 44,22" fill="url(#grad-light)" filter="url(#shadow-light)" stroke="#1A1A1A" strokeWidth="2" />
      <polygon points="25,50 14,24 25,10 36,24" fill="#EAE6DE" />
      {/* Dark accent */}
      <circle cx="25" cy="35" r="6" fill="#1A1A1A" />
      <circle cx="25" cy="35" r="3" fill="#EAE6DE" />
    </svg>
  ),
  
  cyberpunk: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="glow-cyber" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Outer glow */}
      <polygon points="25,58 10,22 25,2 40,22" fill="none" stroke="#00FFFF" strokeWidth="4" filter="url(#glow-cyber)" opacity="0.6" />
      {/* Main body */}
      <polygon points="25,55 12,22 25,5 38,22" fill="#0A0A0F" stroke="#00FFFF" strokeWidth="2" />
      {/* Inner circuit lines */}
      <line x1="25" y1="10" x2="25" y2="45" stroke="#FF00FF" strokeWidth="1" opacity="0.8" />
      <line x1="18" y1="25" x2="32" y2="25" stroke="#00FFFF" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="35" x2="30" y2="35" stroke="#00FFFF" strokeWidth="1" opacity="0.6" />
      {/* Tip glow */}
      <circle cx="25" cy="8" r="4" fill="#00FFFF" filter="url(#glow-cyber)" />
    </svg>
  ),
  
  retro: (
    <svg width="50" height="65" viewBox="0 0 50 65">
      <defs>
        <filter id="shadow-retro" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-retro" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5D547" />
          <stop offset="50%" stopColor="#E8922A" />
          <stop offset="100%" stopColor="#C44536" />
        </linearGradient>
      </defs>
      {/* Groovy 70s shape */}
      <path d="M25,65 Q5,45 10,25 Q15,5 25,0 Q35,5 40,25 Q45,45 25,65" fill="url(#grad-retro)" filter="url(#shadow-retro)" />
      <path d="M25,55 Q12,40 15,25 Q18,10 25,6 Q32,10 35,25 Q38,40 25,55" fill="#3D8F3D" />
      {/* Decorative circles */}
      <circle cx="25" cy="20" r="4" fill="#F5D547" />
      <circle cx="25" cy="35" r="3" fill="#F5D547" />
    </svg>
  ),
  
  ocean: (
    <svg width="50" height="65" viewBox="0 0 50 65">
      <defs>
        <filter id="shadow-ocean" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
        <linearGradient id="grad-ocean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="50%" stopColor="#0096C7" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
      {/* Wave-inspired shape */}
      <path d="M25,65 C10,55 5,40 10,25 C15,10 20,5 25,0 C30,5 35,10 40,25 C45,40 40,55 25,65" fill="url(#grad-ocean)" filter="url(#shadow-ocean)" />
      {/* Bubble details */}
      <circle cx="18" cy="30" r="3" fill="#48CAE4" opacity="0.7" />
      <circle cx="32" cy="25" r="2" fill="#90E0EF" opacity="0.6" />
      <circle cx="25" cy="40" r="4" fill="#00D4AA" opacity="0.5" />
      {/* Tip */}
      <circle cx="25" cy="8" r="5" fill="#00D4AA" />
    </svg>
  ),
  
  sunset: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-sunset" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
        <linearGradient id="grad-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD93D" />
          <stop offset="30%" stopColor="#FFB347" />
          <stop offset="60%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#6B2D5B" />
        </linearGradient>
      </defs>
      <polygon points="25,60 8,22 25,0 42,22" fill="url(#grad-sunset)" filter="url(#shadow-sunset)" />
      <polygon points="25,50 15,25 25,10 35,25" fill="#3D1A47" opacity="0.6" />
      {/* Sun rays */}
      <line x1="25" y1="5" x2="25" y2="15" stroke="#FFF0E5" strokeWidth="2" />
      <line x1="20" y1="8" x2="18" y2="16" stroke="#FFF0E5" strokeWidth="1" />
      <line x1="30" y1="8" x2="32" y2="16" stroke="#FFF0E5" strokeWidth="1" />
    </svg>
  ),
  
  forest: (
    <svg width="50" height="65" viewBox="0 0 50 65">
      <defs>
        <filter id="shadow-forest" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-forest-leaf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ACD32" />
          <stop offset="50%" stopColor="#6B8E23" />
          <stop offset="100%" stopColor="#2D4A2D" />
        </linearGradient>
      </defs>
      {/* Leaf shape */}
      <path d="M25,65 Q8,50 8,30 Q8,10 25,0 Q42,10 42,30 Q42,50 25,65" fill="url(#grad-forest-leaf)" filter="url(#shadow-forest)" />
      {/* Leaf vein */}
      <line x1="25" y1="5" x2="25" y2="55" stroke="#1A2F1A" strokeWidth="2" />
      <line x1="25" y1="20" x2="15" y2="30" stroke="#1A2F1A" strokeWidth="1" />
      <line x1="25" y1="20" x2="35" y2="30" stroke="#1A2F1A" strokeWidth="1" />
      <line x1="25" y1="35" x2="18" y2="42" stroke="#1A2F1A" strokeWidth="1" />
      <line x1="25" y1="35" x2="32" y2="42" stroke="#1A2F1A" strokeWidth="1" />
      {/* Acorn accent */}
      <ellipse cx="25" cy="50" rx="4" ry="5" fill="#C4A35A" />
    </svg>
  ),

  // ========================================
  // CREATIVE/FUN POINTERS (Pro)
  // ========================================
  
  lizard: (
    <svg width="55" height="80" viewBox="0 0 55 80">
      <defs>
        <filter id="shadow-lizard" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-lizard-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2E8B57" />
          <stop offset="50%" stopColor="#3CB371" />
          <stop offset="100%" stopColor="#228B22" />
        </linearGradient>
        <linearGradient id="grad-lizard-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#98FB98" />
          <stop offset="100%" stopColor="#7CCD7C" />
        </linearGradient>
      </defs>
      {/* Tail (pointer) - tapers to point */}
      <path d="M27,80 Q20,70 22,60 Q24,50 27,40" fill="none" stroke="url(#grad-lizard-body)" strokeWidth="8" strokeLinecap="round" filter="url(#shadow-lizard)" />
      <path d="M27,40 Q30,30 27,20" fill="none" stroke="url(#grad-lizard-body)" strokeWidth="6" strokeLinecap="round" />
      <path d="M27,20 Q24,10 27,0" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="27" cy="55" rx="12" ry="8" fill="url(#grad-lizard-body)" filter="url(#shadow-lizard)" />
      <ellipse cx="27" cy="56" rx="8" ry="5" fill="url(#grad-lizard-belly)" />
      {/* Head */}
      <ellipse cx="27" cy="68" rx="8" ry="6" fill="url(#grad-lizard-body)" />
      {/* Eyes */}
      <circle cx="23" cy="66" r="2.5" fill="#FFD700" />
      <circle cx="31" cy="66" r="2.5" fill="#FFD700" />
      <circle cx="23" cy="66" r="1" fill="#000" />
      <circle cx="31" cy="66" r="1" fill="#000" />
      {/* Front legs */}
      <path d="M18,52 Q10,55 8,60" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      <path d="M36,52 Q44,55 46,60" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      {/* Back legs */}
      <path d="M20,58 Q12,62 10,68" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      <path d="M34,58 Q42,62 44,68" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      {/* Scale pattern on tail */}
      <circle cx="27" cy="35" r="1.5" fill="#228B22" opacity="0.6" />
      <circle cx="27" cy="28" r="1" fill="#228B22" opacity="0.5" />
      <circle cx="27" cy="15" r="0.8" fill="#228B22" opacity="0.4" />
    </svg>
  ),
  
  frog: (
    <svg width="60" height="75" viewBox="0 0 60 75">
      <defs>
        <filter id="shadow-frog" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <radialGradient id="grad-frog-body" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#7CCD7C" />
          <stop offset="70%" stopColor="#32CD32" />
          <stop offset="100%" stopColor="#228B22" />
        </radialGradient>
        <linearGradient id="grad-tongue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#DC143C" />
        </linearGradient>
      </defs>
      {/* Tongue (pointer) */}
      <path d="M30,0 Q28,15 30,30 Q32,15 30,0" fill="url(#grad-tongue)" filter="url(#shadow-frog)" />
      <ellipse cx="30" cy="2" rx="3" ry="2" fill="#FF6B6B" />
      {/* Face/Head */}
      <ellipse cx="30" cy="55" rx="22" ry="18" fill="url(#grad-frog-body)" filter="url(#shadow-frog)" />
      {/* Mouth area */}
      <ellipse cx="30" cy="45" rx="10" ry="6" fill="#98FB98" />
      {/* Mouth opening */}
      <ellipse cx="30" cy="38" rx="4" ry="2" fill="#1A4D1A" />
      {/* Eye bumps */}
      <circle cx="18" cy="62" r="10" fill="url(#grad-frog-body)" />
      <circle cx="42" cy="62" r="10" fill="url(#grad-frog-body)" />
      {/* Eyes */}
      <circle cx="18" cy="60" r="7" fill="#FFFACD" />
      <circle cx="42" cy="60" r="7" fill="#FFFACD" />
      <circle cx="18" cy="60" r="4" fill="#000" />
      <circle cx="42" cy="60" r="4" fill="#000" />
      <circle cx="16" cy="58" r="1.5" fill="#FFF" />
      <circle cx="40" cy="58" r="1.5" fill="#FFF" />
      {/* Nostrils */}
      <circle cx="26" cy="48" r="1.5" fill="#1A4D1A" />
      <circle cx="34" cy="48" r="1.5" fill="#1A4D1A" />
      {/* Spots */}
      <circle cx="15" cy="50" r="2" fill="#228B22" opacity="0.5" />
      <circle cx="45" cy="50" r="2" fill="#228B22" opacity="0.5" />
    </svg>
  ),
  
  rocket: (
    <svg width="50" height="75" viewBox="0 0 50 75">
      <defs>
        <filter id="shadow-rocket" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-rocket-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </linearGradient>
        <linearGradient id="grad-rocket-tip" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="100%" stopColor="#CC0000" />
        </linearGradient>
        <linearGradient id="grad-flame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      {/* Flame */}
      <path d="M25,75 Q15,65 20,55 Q25,60 25,55 Q25,60 30,55 Q35,65 25,75" fill="url(#grad-flame)" opacity="0.9" />
      <path d="M25,70 Q20,62 22,56 Q25,58 28,56 Q30,62 25,70" fill="#FFFF00" opacity="0.8" />
      {/* Fins */}
      <polygon points="12,55 5,65 15,50" fill="#CC0000" filter="url(#shadow-rocket)" />
      <polygon points="38,55 45,65 35,50" fill="#CC0000" filter="url(#shadow-rocket)" />
      {/* Body */}
      <path d="M15,55 L15,25 Q15,5 25,0 Q35,5 35,25 L35,55 Z" fill="url(#grad-rocket-body)" filter="url(#shadow-rocket)" />
      {/* Tip */}
      <path d="M20,20 Q20,5 25,0 Q30,5 30,20 Z" fill="url(#grad-rocket-tip)" />
      {/* Window */}
      <circle cx="25" cy="30" r="6" fill="#4169E1" />
      <circle cx="25" cy="30" r="4" fill="#87CEEB" />
      <circle cx="23" cy="28" r="1.5" fill="#FFF" opacity="0.7" />
      {/* Stripe */}
      <rect x="15" y="42" width="20" height="3" fill="#CC0000" />
    </svg>
  ),
  
  lightning: (
    <svg width="50" height="70" viewBox="0 0 50 70">
      <defs>
        <filter id="glow-lightning" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="grad-lightning" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFF00" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
      {/* Outer glow */}
      <polygon points="30,0 10,30 22,30 15,70 40,35 28,35" fill="#FFFF00" filter="url(#glow-lightning)" opacity="0.4" />
      {/* Main bolt */}
      <polygon points="30,0 10,30 22,30 15,70 40,35 28,35" fill="url(#grad-lightning)" />
      {/* Highlight */}
      <polygon points="28,5 15,28 24,28 20,50 32,33 26,33" fill="#FFFACD" opacity="0.7" />
      {/* Core bright line */}
      <polyline points="28,8 18,28 24,28 22,45" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.8" />
    </svg>
  ),
  
  flame: (
    <svg width="50" height="70" viewBox="0 0 50 70">
      <defs>
        <filter id="shadow-flame" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="grad-flame-outer" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="40%" stopColor="#FF4500" />
          <stop offset="70%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient id="grad-flame-inner" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFFF00" />
        </linearGradient>
      </defs>
      {/* Outer flame */}
      <path d="M25,0 Q35,15 38,30 Q42,45 35,55 Q30,65 25,70 Q20,65 15,55 Q8,45 12,30 Q15,15 25,0" fill="url(#grad-flame-outer)" filter="url(#shadow-flame)" />
      {/* Middle flame */}
      <path d="M25,5 Q32,18 34,30 Q36,42 30,50 Q27,58 25,62 Q23,58 20,50 Q14,42 16,30 Q18,18 25,5" fill="url(#grad-flame-inner)" />
      {/* Inner flame (hottest) */}
      <path d="M25,15 Q30,25 30,35 Q30,45 25,52 Q20,45 20,35 Q20,25 25,15" fill="#FFFFE0" opacity="0.9" />
      {/* Core */}
      <ellipse cx="25" cy="40" rx="4" ry="8" fill="#FFF" opacity="0.7" />
    </svg>
  ),
}

export default function WheelPointer({ isTicking }: WheelPointerProps) {
  const { pointerId } = useWheelStore()
  
  return (
    <div className={`wheel-pointer ${isTicking ? 'ticking' : ''} pointer-${pointerId}`}>
      {pointerStyles[pointerId]}
    </div>
  )
}
