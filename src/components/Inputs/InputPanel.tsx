import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore } from '../../stores/wheelStore'
import { ChevronDownIcon } from '../Icons/Icons'
import InputList from './InputList'
import './InputPanel.css'

export default function InputPanel() {
  const [newEntry, setNewEntry] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addEntry, entries, clearEntries, resetHidden, spinMode } = useWheelStore()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.trim()) {
      addEntry(newEntry.trim())
      setNewEntry('')
      inputRef.current?.focus()
    }
  }
  
  const hiddenCount = entries.filter(e => e.hidden).length
  const visibleCount = entries.filter(e => !e.hidden).length
  
  return (
    <div className="input-panel">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="input-panel-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="header-title">
          Inputs
          <span className="item-count-badge">{visibleCount} items</span>
        </span>
        <motion.span
          className="toggle-arrow"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>
      
      <form onSubmit={handleSubmit} className="add-entry-form">
        <input
          ref={inputRef}
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Add an option..."
          className="entry-input"
        />
      </form>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="input-list-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <InputList />
            
            {spinMode === 'elimination' && hiddenCount > 0 && (
              <div className="hidden-notice">
                <span>{hiddenCount} option{hiddenCount > 1 ? 's' : ''} eliminated</span>
                <button onClick={resetHidden} className="btn-link">
                  Reset
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="input-panel-actions">
        {entries.length > 0 && (
          <button onClick={clearEntries} className="btn btn-secondary btn-danger">
            Clear All
          </button>
        )}
      </div>
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}
