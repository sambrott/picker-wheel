import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore, SpinMode } from '../../stores/wheelStore'
import { ChevronDownIcon } from '../Icons/Icons'
import './ToolSettings.css'

export default function ToolSettings() {
  const [isOpen, setIsOpen] = useState(true)
  const {
    spinMode,
    setSpinMode,
    spinDuration,
    setSpinDuration,
    soundEnabled,
    setSoundEnabled,
    confettiEnabled,
    setConfettiEnabled,
    history,
    clearHistory
  } = useWheelStore()
  
  const spinModes: { value: SpinMode; label: string; description: string }[] = [
    { value: 'normal', label: 'Normal', description: 'Result stays, can be picked again' },
    { value: 'elimination', label: 'Elimination', description: 'Hide picked items until reset' },
    { value: 'accumulation', label: 'Accumulation', description: 'Track scores/counts per item' }
  ]
  
  return (
    <div className="tool-settings">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="settings-title">
          Tool Settings
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
            className="settings-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Spin Mode */}
            <div className="setting-group">
              <label className="setting-label">Spin Mode</label>
              <div className="spin-modes">
                {spinModes.map((mode) => (
                  <button
                    key={mode.value}
                    className={`mode-btn ${spinMode === mode.value ? 'active' : ''}`}
                    onClick={() => setSpinMode(mode.value)}
                    title={mode.description}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              <p className="setting-hint">
                {spinModes.find(m => m.value === spinMode)?.description}
              </p>
            </div>
            
            {/* Spin Duration */}
            <div className="setting-group">
              <label className="setting-label">
                Spin Duration: {spinDuration}s
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={spinDuration}
                onChange={(e) => setSpinDuration(parseFloat(e.target.value))}
                className="duration-slider"
              />
              <div className="slider-labels">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
            
            {/* Sound & Confetti */}
            <div className="setting-group toggles">
              <label className="toggle-setting">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span>Sound Effects</span>
              </label>
              
              <label className="toggle-setting">
                <input
                  type="checkbox"
                  checked={confettiEnabled}
                  onChange={(e) => setConfettiEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span>Confetti</span>
              </label>
            </div>
            
            {/* History */}
            {history.length > 0 && (
              <div className="setting-group">
                <div className="history-header">
                  <label className="setting-label">Recent Results</label>
                  <button onClick={clearHistory} className="btn-link">
                    Clear
                  </button>
                </div>
                <div className="history-list">
                  {history.slice(0, 5).map((entry, index) => (
                    <span key={`${entry.id}-${index}`} className="history-item">
                      {entry.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}
