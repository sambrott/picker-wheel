import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore, PointerId } from '../../stores/wheelStore'
import { ChevronDownIcon } from '../Icons/Icons'
import './PointerPicker.css'

interface PointerOption {
  id: PointerId
  name: string
  premium: boolean
}

const pointers: PointerOption[] = [
  // Free pointers
  { id: 'classic', name: 'Classic', premium: false },
  { id: 'arrow', name: 'Arrow', premium: false },
  { id: 'pin', name: 'Pin', premium: false },
  // Premium pointers
  { id: 'crystal', name: 'Crystal', premium: true },
  { id: 'neon', name: 'Neon', premium: true },
  { id: 'golden', name: 'Royal', premium: true },
  { id: 'blade', name: 'Blade', premium: true },
  { id: 'gem', name: 'Amethyst', premium: true },
]

// Mini preview SVGs for the picker
const pointerPreviews: Record<PointerId, JSX.Element> = {
  classic: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-classic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C44536" />
          <stop offset="100%" stopColor="#7A2820" />
        </linearGradient>
      </defs>
      <polygon points="25,58 10,22 25,2 40,22" fill="url(#prev-classic)" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-arrow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A4A4A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <polygon points="25,58 8,38 16,38 16,18 25,2 34,18 34,38 42,38" fill="url(#prev-arrow)" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 50 65" className="pointer-preview-svg">
      <defs>
        <radialGradient id="prev-pin" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#8B2D20" />
        </radialGradient>
      </defs>
      <rect x="22" y="25" width="6" height="38" rx="1" fill="#777" />
      <circle cx="25" cy="15" r="14" fill="url(#prev-pin)" />
    </svg>
  ),
  crystal: (
    <svg viewBox="0 0 50 70" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F4FC" />
          <stop offset="50%" stopColor="#5BA8D8" />
          <stop offset="100%" stopColor="#2E7EB8" />
        </linearGradient>
      </defs>
      <polygon points="25,68 10,40 10,20 25,2 40,20 40,40" fill="url(#prev-crystal)" />
    </svg>
  ),
  neon: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg neon-glow">
      <polygon points="25,55 12,22 25,5 38,22" fill="#0A1A1A" stroke="#00FFFF" strokeWidth="3" />
      <circle cx="25" cy="8" r="3" fill="#00FFFF" />
    </svg>
  ),
  golden: (
    <svg viewBox="0 0 50 65" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <polygon points="25,63 8,35 14,30 10,22 25,2 40,22 36,30 42,35" fill="url(#prev-gold)" />
      <circle cx="25" cy="35" r="4" fill="#4444FF" />
    </svg>
  ),
  blade: (
    <svg viewBox="0 0 50 70" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-blade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
      </defs>
      <polygon points="25,2 18,35 22,35 22,42 28,42 28,35 32,35" fill="url(#prev-blade)" />
      <rect x="14" y="42" width="22" height="5" rx="1" fill="#8B7355" />
      <rect x="20" y="47" width="10" height="16" rx="2" fill="#5A3D28" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-gem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8D0F0" />
          <stop offset="50%" stopColor="#9B59B6" />
          <stop offset="100%" stopColor="#6C3483" />
        </linearGradient>
      </defs>
      <polygon points="25,58 15,45 10,45 10,38 15,32 35,32 40,38 40,45 35,45" fill="#C0C0C0" />
      <polygon points="25,5 38,15 38,28 25,38 12,28 12,15" fill="url(#prev-gem)" />
    </svg>
  ),
}

export default function PointerPicker() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { pointerId, setPointerId } = useWheelStore()
  
  const freePointers = pointers.filter(p => !p.premium)
  const premiumPointers = pointers.filter(p => p.premium)
  
  const handleSelect = (id: PointerId, isPremium: boolean) => {
    if (!isPremium) {
      setPointerId(id)
    }
    // Premium pointers are locked - would need payment integration
  }
  
  return (
    <div className="pointer-picker-box">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="pointer-picker-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="header-title">Pointer Style</span>
        <motion.span
          className="toggle-arrow"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pointer-sections"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Free Pointers */}
            <div className="pointer-section">
              <span className="section-label">Free</span>
              <div className="pointer-grid">
                {freePointers.map(pointer => (
                  <button
                    key={pointer.id}
                    className={`pointer-option ${pointerId === pointer.id ? 'active' : ''}`}
                    onClick={() => handleSelect(pointer.id, pointer.premium)}
                  >
                    <div className="pointer-preview">
                      {pointerPreviews[pointer.id]}
                    </div>
                    <span className="pointer-name">{pointer.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Premium Pointers */}
            <div className="pointer-section">
              <span className="section-label">
                Pro
                <svg className="pro-star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <div className="pointer-grid">
                {premiumPointers.map(pointer => (
                  <button
                    key={pointer.id}
                    className={`pointer-option premium ${pointerId === pointer.id ? 'active' : ''}`}
                    onClick={() => handleSelect(pointer.id, pointer.premium)}
                  >
                    <div className="pointer-preview">
                      {pointerPreviews[pointer.id]}
                    </div>
                    <span className="pointer-name">{pointer.name}</span>
                    <span className="lock-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}

