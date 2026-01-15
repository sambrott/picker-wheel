import './WheelPointer.css'

interface WheelPointerProps {
  isTicking: boolean
}

export default function WheelPointer({ isTicking }: WheelPointerProps) {
  return (
    <div 
      className={`wheel-pointer ${isTicking ? 'ticking' : ''}`}
    >
      <svg width="50" height="60" viewBox="0 0 50 60">
        <defs>
          <filter id="pointer-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)"/>
          </filter>
          <linearGradient id="pointer-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A04D45" />
            <stop offset="100%" stopColor="#7A3530" />
          </linearGradient>
        </defs>
        {/* Main pointer body */}
        <polygon 
          points="25,60 8,20 25,0 42,20" 
          fill="url(#pointer-gradient)"
          filter="url(#pointer-shadow)"
        />
        {/* Inner highlight */}
        <polygon 
          points="25,52 14,22 25,8 36,22" 
          fill="#8B3D35"
        />
        {/* Tip highlight */}
        <polygon 
          points="25,8 20,18 30,18" 
          fill="#B05D55"
        />
      </svg>
    </div>
  )
}
