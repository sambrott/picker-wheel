import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore, PointerId, ThemeId } from '../../stores/wheelStore'
import { ChevronDownIcon } from '../Icons/Icons'
import './PointerPicker.css'

interface PointerOption {
  id: PointerId
  name: string
  category: 'free' | 'theme' | 'creative'
}

// Map themes to their matching pointers
const themePointerMap: Record<ThemeId, PointerId> = {
  dark: 'dark',
  light: 'light',
  cyberpunk: 'cyberpunk',
  retro: 'retro',
  ocean: 'ocean',
  sunset: 'sunset',
  forest: 'forest',
}

const pointers: PointerOption[] = [
  // Free basic pointers
  { id: 'classic', name: 'Classic', category: 'free' },
  { id: 'triangle', name: 'Triangle', category: 'free' },
  { id: 'chevron', name: 'Chevron', category: 'free' },
  // Theme-matched pointers (Pro)
  { id: 'dark', name: 'Monochrome', category: 'theme' },
  { id: 'light', name: 'Light', category: 'theme' },
  { id: 'cyberpunk', name: 'Neon', category: 'theme' },
  { id: 'retro', name: 'Retro', category: 'theme' },
  { id: 'ocean', name: 'Ocean', category: 'theme' },
  { id: 'sunset', name: 'Sunset', category: 'theme' },
  { id: 'forest', name: 'Forest', category: 'theme' },
  // Creative/Fun pointers (Pro)
  { id: 'lizard', name: 'Lizard', category: 'creative' },
  { id: 'frog', name: 'Frog', category: 'creative' },
  { id: 'rocket', name: 'Rocket', category: 'creative' },
  { id: 'lightning', name: 'Lightning', category: 'creative' },
  { id: 'flame', name: 'Flame', category: 'creative' },
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
  triangle: (
    <svg viewBox="0 0 50 55" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-tri" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A5A5A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <polygon points="25,53 5,15 25,0 45,15" fill="url(#prev-tri)" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 50 50" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-chev" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8B84A" />
          <stop offset="100%" stopColor="#B8862A" />
        </linearGradient>
      </defs>
      <polygon points="25,48 5,30 15,30 15,10 25,0 35,10 35,30 45,30" fill="url(#prev-chev)" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <polygon points="25,58 8,22 25,2 42,22" fill="#1A1A1A" />
      <line x1="25" y1="8" x2="25" y2="45" stroke="#D4D0C8" strokeWidth="2" />
      <circle cx="25" cy="48" r="3" fill="#D4D0C8" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <polygon points="25,58 8,22 25,2 42,22" fill="#EAE6DE" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="25" cy="35" r="5" fill="#1A1A1A" />
    </svg>
  ),
  cyberpunk: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg neon-glow">
      <polygon points="25,55 12,22 25,5 38,22" fill="#0A0A0F" stroke="#00FFFF" strokeWidth="2" />
      <circle cx="25" cy="8" r="3" fill="#00FFFF" />
    </svg>
  ),
  retro: (
    <svg viewBox="0 0 50 65" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-retro" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5D547" />
          <stop offset="50%" stopColor="#E8922A" />
          <stop offset="100%" stopColor="#C44536" />
        </linearGradient>
      </defs>
      <path d="M25,63 Q5,45 10,25 Q15,5 25,0 Q35,5 40,25 Q45,45 25,63" fill="url(#prev-retro)" />
      <circle cx="25" cy="20" r="4" fill="#3D8F3D" />
    </svg>
  ),
  ocean: (
    <svg viewBox="0 0 50 65" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-ocean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
      <path d="M25,63 C10,53 5,38 10,23 C15,8 20,3 25,0 C30,3 35,8 40,23 C45,38 40,53 25,63" fill="url(#prev-ocean)" />
      <circle cx="25" cy="8" r="4" fill="#00D4AA" />
    </svg>
  ),
  sunset: (
    <svg viewBox="0 0 50 60" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD93D" />
          <stop offset="50%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#6B2D5B" />
        </linearGradient>
      </defs>
      <polygon points="25,58 8,22 25,2 42,22" fill="url(#prev-sunset)" />
    </svg>
  ),
  forest: (
    <svg viewBox="0 0 50 65" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-forest" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ACD32" />
          <stop offset="100%" stopColor="#2D4A2D" />
        </linearGradient>
      </defs>
      <path d="M25,63 Q8,48 8,28 Q8,8 25,0 Q42,8 42,28 Q42,48 25,63" fill="url(#prev-forest)" />
      <line x1="25" y1="5" x2="25" y2="50" stroke="#1A2F1A" strokeWidth="2" />
    </svg>
  ),
  lizard: (
    <svg viewBox="0 0 55 80" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-lizard" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2E8B57" />
          <stop offset="100%" stopColor="#228B22" />
        </linearGradient>
      </defs>
      <path d="M27,78 Q20,68 22,58 Q24,48 27,38 Q30,28 27,18 Q24,8 27,0" fill="none" stroke="url(#prev-lizard)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="27" cy="55" rx="10" ry="7" fill="#3CB371" />
      <circle cx="23" cy="66" r="2" fill="#FFD700" />
      <circle cx="31" cy="66" r="2" fill="#FFD700" />
    </svg>
  ),
  frog: (
    <svg viewBox="0 0 60 75" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-tongue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#DC143C" />
        </linearGradient>
      </defs>
      <path d="M30,0 Q28,15 30,30" fill="none" stroke="url(#prev-tongue)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="30" cy="55" rx="20" ry="16" fill="#32CD32" />
      <circle cx="18" cy="60" r="6" fill="#FFFACD" />
      <circle cx="42" cy="60" r="6" fill="#FFFACD" />
      <circle cx="18" cy="60" r="3" fill="#000" />
      <circle cx="42" cy="60" r="3" fill="#000" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 50 75" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-flame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      <path d="M25,73 Q18,65 22,55 Q25,58 28,55 Q32,65 25,73" fill="url(#prev-flame)" />
      <path d="M15,53 L15,23 Q15,5 25,0 Q35,5 35,23 L35,53 Z" fill="#E8E8E8" />
      <path d="M20,18 Q20,5 25,0 Q30,5 30,18 Z" fill="#CC0000" />
      <circle cx="25" cy="30" r="5" fill="#4169E1" />
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 50 70" className="pointer-preview-svg lightning-glow">
      <defs>
        <linearGradient id="prev-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFF00" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
      <polygon points="30,0 10,30 22,30 15,68 40,35 28,35" fill="url(#prev-light)" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 50 70" className="pointer-preview-svg">
      <defs>
        <linearGradient id="prev-flamegrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="50%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      <path d="M25,0 Q35,15 38,30 Q42,45 35,55 Q30,65 25,68 Q20,65 15,55 Q8,45 12,30 Q15,15 25,0" fill="url(#prev-flamegrad)" />
      <ellipse cx="25" cy="40" rx="5" ry="10" fill="#FFFFE0" opacity="0.8" />
    </svg>
  ),
}

export default function PointerPicker() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [autoSwitch, setAutoSwitch] = useState(true)
  const { pointerId, setPointerId, theme } = useWheelStore()
  
  // Auto-switch pointer when theme changes (if enabled)
  useEffect(() => {
    if (autoSwitch && themePointerMap[theme]) {
      setPointerId(themePointerMap[theme])
    }
  }, [theme, autoSwitch, setPointerId])
  
  const freePointers = pointers.filter(p => p.category === 'free')
  const themePointers = pointers.filter(p => p.category === 'theme')
  const creativePointers = pointers.filter(p => p.category === 'creative')
  
  const handleSelect = (id: PointerId) => {
    setPointerId(id)
    // Disable auto-switch when manually selecting
    setAutoSwitch(false)
  }
  
  const handleAutoSwitchToggle = () => {
    const newValue = !autoSwitch
    setAutoSwitch(newValue)
    if (newValue && themePointerMap[theme]) {
      setPointerId(themePointerMap[theme])
    }
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
            {/* Auto-switch toggle */}
            <label className="auto-switch-toggle">
              <input 
                type="checkbox" 
                checked={autoSwitch} 
                onChange={handleAutoSwitchToggle}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Match theme automatically</span>
            </label>
            
            {/* Free Pointers */}
            <div className="pointer-section">
              <span className="section-label">Free</span>
              <div className="pointer-grid">
                {freePointers.map(pointer => (
                  <button
                    key={pointer.id}
                    className={`pointer-option ${pointerId === pointer.id ? 'active' : ''}`}
                    onClick={() => handleSelect(pointer.id)}
                  >
                    <div className="pointer-preview">
                      {pointerPreviews[pointer.id]}
                    </div>
                    <span className="pointer-name">{pointer.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Theme-Matched Pointers */}
            <div className="pointer-section">
              <span className="section-label">
                Theme Matched
                <svg className="pro-star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <div className="pointer-grid">
                {themePointers.map(pointer => (
                  <button
                    key={pointer.id}
                    className={`pointer-option ${pointerId === pointer.id ? 'active' : ''} ${pointer.id === theme ? 'theme-match' : ''}`}
                    onClick={() => handleSelect(pointer.id)}
                  >
                    <div className="pointer-preview">
                      {pointerPreviews[pointer.id]}
                    </div>
                    <span className="pointer-name">{pointer.name}</span>
                    {pointer.id === theme && (
                      <span className="current-theme-badge">Current</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Creative/Fun Pointers */}
            <div className="pointer-section">
              <span className="section-label">
                Creative
                <svg className="pro-star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <div className="pointer-grid">
                {creativePointers.map(pointer => (
                  <button
                    key={pointer.id}
                    className={`pointer-option ${pointerId === pointer.id ? 'active' : ''}`}
                    onClick={() => handleSelect(pointer.id)}
                  >
                    <div className="pointer-preview">
                      {pointerPreviews[pointer.id]}
                    </div>
                    <span className="pointer-name">{pointer.name}</span>
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
