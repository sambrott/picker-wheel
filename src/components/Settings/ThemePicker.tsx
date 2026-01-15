import { useState } from 'react'
import { useWheelStore, ThemeId } from '../../stores/wheelStore'
import { ChevronDownIcon, StarIcon } from '../Icons/Icons'
import './ThemePicker.css'

interface ThemeOption {
  id: ThemeId
  name: string
  colors: {
    bg: string
    surface: string
    accent: string
  }
}

const freeThemes: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Dark',
    colors: { bg: '#000000', surface: '#1A1A1A', accent: '#FFFFFF' }
  },
  {
    id: 'light',
    name: 'Light',
    colors: { bg: '#FFFFFF', surface: '#F5F5F5', accent: '#000000' }
  }
]

const proThemes: ThemeOption[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: { bg: '#0a0a0f', surface: '#12121a', accent: '#00ffff' }
  },
  {
    id: 'retro',
    name: 'Retro 70s',
    colors: { bg: '#E8922A', surface: '#3D8F3D', accent: '#F5D547' }
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    colors: { bg: '#0A1628', surface: '#1A3A5C', accent: '#00D4AA' }
  },
  {
    id: 'sunset',
    name: 'Sunset Blaze',
    colors: { bg: '#1A0A1F', surface: '#3D1A47', accent: '#FFB347' }
  },
  {
    id: 'forest',
    name: 'Forest Moss',
    colors: { bg: '#1A2F1A', surface: '#2D4A2D', accent: '#C4A35A' }
  }
]

export default function ThemePicker() {
  const { theme, setTheme } = useWheelStore()
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleClick = (t: ThemeOption) => {
    setTheme(t.id)
  }
  
  return (
    <div className="theme-picker-box">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="theme-picker-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Theme</span>
        <ChevronDownIcon className={`expand-arrow ${isExpanded ? 'expanded' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="theme-sections">
          {/* Free Section */}
          <div className="theme-section">
            <div className="section-label">Free</div>
            <div className="theme-swatches">
              {freeThemes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
                  onClick={() => handleClick(t)}
                  title={t.name}
                  aria-label={`Select ${t.name} theme`}
                >
                  <span 
                    className="swatch-bg" 
                    style={{ background: t.colors.bg }}
                  />
                  <span 
                    className="swatch-surface" 
                    style={{ background: t.colors.surface }}
                  />
                  <span 
                    className="swatch-accent" 
                    style={{ background: t.colors.accent }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Pro Section */}
          <div className="theme-section">
            <div className="section-label">Pro <StarIcon className="pro-star" /></div>
            <div className="theme-swatches">
              {proThemes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
                  onClick={() => handleClick(t)}
                  title={t.name}
                  aria-label={`Select ${t.name} theme`}
                >
                  <span 
                    className="swatch-bg" 
                    style={{ background: t.colors.bg }}
                  />
                  <span 
                    className="swatch-surface" 
                    style={{ background: t.colors.surface }}
                  />
                  <span 
                    className="swatch-accent" 
                    style={{ background: t.colors.accent }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}
