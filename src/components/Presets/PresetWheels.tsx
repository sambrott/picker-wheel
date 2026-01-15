import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore } from '../../stores/wheelStore'
import { ChevronDownIcon } from '../Icons/Icons'
import './PresetWheels.css'

interface Preset {
  id: string
  name: string
  entries: string[]
  customizable?: {
    type: 'range'
    min: number
    max: number
    defaultMin: number
    defaultMax: number
  }
}

const presets: Preset[] = [
  {
    id: 'yes-no',
    name: 'Yes / No',
    entries: ['Yes', 'No']
  },
  {
    id: 'yes-no-maybe',
    name: 'Yes / No / Maybe',
    entries: ['Yes', 'No', 'Maybe']
  },
  {
    id: 'numbers-1-10',
    name: 'Numbers 1-10',
    entries: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  },
  {
    id: 'numbers-custom',
    name: 'Custom Numbers',
    entries: [],
    customizable: {
      type: 'range',
      min: 1,
      max: 100,
      defaultMin: 1,
      defaultMax: 10
    }
  },
  {
    id: 'letters',
    name: 'Letters A-Z',
    entries: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  },
  {
    id: 'days',
    name: 'Days of Week',
    entries: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'colors',
    name: 'Colors',
    entries: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink']
  },
  {
    id: 'directions',
    name: 'Directions',
    entries: ['North', 'South', 'East', 'West']
  }
]

export default function PresetWheels() {
  const [isOpen, setIsOpen] = useState(false)
  const [customRange, setCustomRange] = useState({ min: 1, max: 10 })
  const [showCustomCreate, setShowCustomCreate] = useState(false)
  const [customWheelName, setCustomWheelName] = useState('')
  const [customWheelEntries, setCustomWheelEntries] = useState('')
  const { clearEntries, addEntry } = useWheelStore()
  
  const loadPreset = (preset: Preset) => {
    clearEntries()
    
    let entriesToAdd = preset.entries
    
    if (preset.customizable?.type === 'range') {
      entriesToAdd = []
      for (let i = customRange.min; i <= customRange.max; i++) {
        entriesToAdd.push(String(i))
      }
    }
    
    entriesToAdd.forEach((entry) => {
      addEntry(entry)
    })
  }
  
  const createCustomWheel = () => {
    if (!customWheelEntries.trim()) return
    
    clearEntries()
    const entries = customWheelEntries.split('\n').filter(line => line.trim())
    entries.forEach((entry) => {
      addEntry(entry.trim())
    })
    
    // Reset form
    setCustomWheelName('')
    setCustomWheelEntries('')
    setShowCustomCreate(false)
  }
  
  return (
    <div className="preset-wheels">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="presets-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="presets-title">
          Switch Wheels
        </span>
        <motion.span
          className="toggle-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="presets-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Create Custom Wheel Section */}
            <div className="custom-wheel-section">
              <button 
                className="create-custom-btn"
                onClick={() => setShowCustomCreate(!showCustomCreate)}
              >
                <span>+ Create Custom Wheel</span>
                <motion.span
                  animate={{ rotate: showCustomCreate ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {showCustomCreate && (
                  <motion.div
                    className="custom-create-form"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      value={customWheelName}
                      onChange={(e) => setCustomWheelName(e.target.value)}
                      placeholder="Wheel name (optional)"
                      className="custom-wheel-input"
                    />
                    <textarea
                      value={customWheelEntries}
                      onChange={(e) => setCustomWheelEntries(e.target.value)}
                      placeholder="Enter options (one per line)..."
                      className="custom-wheel-textarea"
                      rows={4}
                    />
                    <button 
                      className="btn btn-primary create-btn"
                      onClick={createCustomWheel}
                      disabled={!customWheelEntries.trim()}
                    >
                      Create Wheel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="presets-divider">
              <span>or choose a preset</span>
            </div>
            
            <div className="presets-grid">
              {presets.map((preset) => (
                <div key={preset.id} className="preset-item-wrapper">
                  {preset.customizable ? (
                    <div className="preset-custom">
                      <button
                        className="preset-btn"
                        onClick={() => loadPreset(preset)}
                      >
                        <span className="preset-name">{preset.name}</span>
                      </button>
                      <div className="custom-range-inputs">
                        <input
                          type="number"
                          value={customRange.min}
                          onChange={(e) => setCustomRange(prev => ({ 
                            ...prev, 
                            min: Math.max(1, parseInt(e.target.value) || 1)
                          }))}
                          min={preset.customizable.min}
                          max={customRange.max - 1}
                          className="range-input"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          value={customRange.max}
                          onChange={(e) => setCustomRange(prev => ({ 
                            ...prev, 
                            max: Math.min(preset.customizable!.max, parseInt(e.target.value) || 10)
                          }))}
                          min={customRange.min + 1}
                          max={preset.customizable.max}
                          className="range-input"
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      className="preset-btn"
                      onClick={() => loadPreset(preset)}
                    >
                      <span className="preset-name">{preset.name}</span>
                      <span className="preset-count">{preset.entries.length} items</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}
