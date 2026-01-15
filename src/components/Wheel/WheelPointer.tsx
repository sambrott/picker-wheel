import { useWheelStore, PointerId } from '../../stores/wheelStore'
import './WheelPointer.css'

interface WheelPointerProps {
  isTicking: boolean
}

// Pointer SVG definitions for each style
const pointerStyles: Record<PointerId, JSX.Element> = {
  // FREE POINTERS (3)
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
  
  arrow: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-arrow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-arrow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A4A4A" />
          <stop offset="50%" stopColor="#2D2D2D" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <polygon points="25,60 5,35 15,35 15,15 25,0 35,15 35,35 45,35" fill="url(#grad-arrow)" filter="url(#shadow-arrow)" />
      <polygon points="25,55 12,37 18,37 18,18 25,6 32,18 32,37 38,37" fill="#3A3A3A" />
      <polygon points="25,6 21,14 29,14" fill="#5A5A5A" />
    </svg>
  ),
  
  pin: (
    <svg width="50" height="65" viewBox="0 0 50 65">
      <defs>
        <filter id="shadow-pin" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-pin-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#666" />
          <stop offset="50%" stopColor="#888" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <radialGradient id="grad-pin-head" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="70%" stopColor="#C44536" />
          <stop offset="100%" stopColor="#8B2D20" />
        </radialGradient>
      </defs>
      <rect x="22" y="25" width="6" height="40" rx="1" fill="url(#grad-pin-body)" filter="url(#shadow-pin)" />
      <circle cx="25" cy="15" r="15" fill="url(#grad-pin-head)" filter="url(#shadow-pin)" />
      <circle cx="20" cy="10" r="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  ),

  // PREMIUM POINTERS (5)
  crystal: (
    <svg width="50" height="70" viewBox="0 0 50 70">
      <defs>
        <filter id="shadow-crystal" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
        <linearGradient id="grad-crystal-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F4FC" />
          <stop offset="30%" stopColor="#A8D4F0" />
          <stop offset="70%" stopColor="#5BA8D8" />
          <stop offset="100%" stopColor="#2E7EB8" />
        </linearGradient>
        <linearGradient id="grad-crystal-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A9CC8" />
          <stop offset="100%" stopColor="#2E6A90" />
        </linearGradient>
      </defs>
      {/* Main crystal body */}
      <polygon points="25,70 10,40 10,20 25,0 40,20 40,40" fill="url(#grad-crystal-main)" filter="url(#shadow-crystal)" />
      {/* Left facet */}
      <polygon points="10,40 10,20 25,30 25,55" fill="url(#grad-crystal-side)" opacity="0.8" />
      {/* Right facet */}
      <polygon points="40,40 40,20 25,30 25,55" fill="#6BB8E0" opacity="0.6" />
      {/* Top highlight */}
      <polygon points="25,0 15,15 25,25 35,15" fill="#D0E8F8" opacity="0.9" />
      {/* Shine */}
      <polygon points="18,12 22,20 26,12 22,8" fill="white" opacity="0.6" />
    </svg>
  ),
  
  neon: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="glow-neon" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="grad-neon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="50%" stopColor="#00D4D4" />
          <stop offset="100%" stopColor="#00AAAA" />
        </linearGradient>
      </defs>
      {/* Outer glow */}
      <polygon points="25,58 10,22 25,2 40,22" fill="none" stroke="#00FFFF" strokeWidth="4" filter="url(#glow-neon)" opacity="0.6" />
      {/* Main body */}
      <polygon points="25,55 12,22 25,5 38,22" fill="#0A1A1A" stroke="url(#grad-neon)" strokeWidth="3" />
      {/* Inner lines */}
      <line x1="25" y1="10" x2="25" y2="45" stroke="#00FFFF" strokeWidth="1" opacity="0.8" />
      <line x1="18" y1="25" x2="32" y2="25" stroke="#00FFFF" strokeWidth="1" opacity="0.6" />
      {/* Tip glow */}
      <circle cx="25" cy="8" r="3" fill="#00FFFF" filter="url(#glow-neon)" />
    </svg>
  ),
  
  golden: (
    <svg width="50" height="65" viewBox="0 0 50 65">
      <defs>
        <filter id="shadow-gold" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="grad-gold-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="25%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="75%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="grad-gold-shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      {/* Main ornate body */}
      <polygon points="25,65 5,35 12,30 8,20 25,0 42,20 38,30 45,35" fill="url(#grad-gold-main)" filter="url(#shadow-gold)" />
      {/* Inner detail */}
      <polygon points="25,58 12,38 17,34 14,26 25,10 36,26 33,34 38,38" fill="#C9A227" />
      {/* Crown top */}
      <polygon points="25,10 20,18 25,15 30,18" fill="url(#grad-gold-shine)" />
      {/* Side gems */}
      <circle cx="14" cy="28" r="3" fill="#FF4444" />
      <circle cx="36" cy="28" r="3" fill="#FF4444" />
      {/* Center gem */}
      <circle cx="25" cy="35" r="4" fill="#4444FF" />
      <circle cx="24" cy="34" r="1.5" fill="white" opacity="0.6" />
    </svg>
  ),
  
  blade: (
    <svg width="50" height="70" viewBox="0 0 50 70">
      <defs>
        <filter id="shadow-blade" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)"/>
        </filter>
        <linearGradient id="grad-blade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="30%" stopColor="#E8E8E8" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient id="grad-blade-handle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A3728" />
          <stop offset="50%" stopColor="#6B4C3A" />
          <stop offset="100%" stopColor="#3A2818" />
        </linearGradient>
      </defs>
      {/* Blade */}
      <polygon points="25,0 18,35 22,35 22,45 28,45 28,35 32,35" fill="url(#grad-blade)" filter="url(#shadow-blade)" />
      {/* Blade edge highlight */}
      <polygon points="25,2 22,30 25,30" fill="white" opacity="0.4" />
      {/* Guard */}
      <rect x="12" y="45" width="26" height="6" rx="2" fill="#8B7355" />
      <rect x="14" y="46" width="22" height="4" rx="1" fill="#A08060" />
      {/* Handle */}
      <rect x="20" y="51" width="10" height="18" rx="2" fill="url(#grad-blade-handle)" />
      {/* Handle wrap */}
      <rect x="20" y="54" width="10" height="2" fill="#2A1A10" />
      <rect x="20" y="59" width="10" height="2" fill="#2A1A10" />
      <rect x="20" y="64" width="10" height="2" fill="#2A1A10" />
      {/* Pommel */}
      <circle cx="25" cy="70" r="4" fill="#8B7355" />
    </svg>
  ),
  
  gem: (
    <svg width="50" height="60" viewBox="0 0 50 60">
      <defs>
        <filter id="shadow-gem" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
        <linearGradient id="grad-gem-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8D0F0" />
          <stop offset="30%" stopColor="#9B59B6" />
          <stop offset="70%" stopColor="#8E44AD" />
          <stop offset="100%" stopColor="#6C3483" />
        </linearGradient>
        <linearGradient id="grad-gem-setting" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
      </defs>
      {/* Setting/mount */}
      <polygon points="25,60 15,45 10,45 10,35 15,30 35,30 40,35 40,45 35,45" fill="url(#grad-gem-setting)" filter="url(#shadow-gem)" />
      {/* Gem body - hexagonal cut */}
      <polygon points="25,5 38,15 38,28 25,38 12,28 12,15" fill="url(#grad-gem-purple)" filter="url(#shadow-gem)" />
      {/* Gem facets */}
      <polygon points="25,5 12,15 25,22" fill="#B87DD0" opacity="0.8" />
      <polygon points="25,5 38,15 25,22" fill="#D4A0E8" opacity="0.6" />
      <polygon points="12,15 12,28 25,22" fill="#7D3C98" opacity="0.9" />
      <polygon points="38,15 38,28 25,22" fill="#9B59B6" opacity="0.7" />
      {/* Top shine */}
      <polygon points="25,8 18,14 25,18 28,12" fill="white" opacity="0.5" />
      {/* Prongs */}
      <rect x="13" y="28" width="4" height="8" fill="#D0D0D0" />
      <rect x="33" y="28" width="4" height="8" fill="#D0D0D0" />
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
