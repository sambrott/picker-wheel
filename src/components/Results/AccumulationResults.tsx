import { useState } from 'react'
import { useWheelStore } from '../../stores/wheelStore'
import { ChevronDownIcon, CloseIcon } from '../Icons/Icons'
import './AccumulationResults.css'

// Convert number to written word (supports 0-100)
function numberToWord(num: number): string {
  const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  
  if (num < 20) return ones[num]
  if (num < 100) {
    const ten = Math.floor(num / 10)
    const one = num % 10
    return one === 0 ? tens[ten] : `${tens[ten]}-${ones[one].toLowerCase()}`
  }
  if (num === 100) return 'One Hundred'
  return num.toString() // Fallback for numbers > 100
}

// Check if a string is a pure number
function isNumericString(str: string): boolean {
  return /^\d+$/.test(str.trim())
}

// Format entry text - convert numbers to words
function formatEntryText(text: string): string {
  const trimmed = text.trim()
  if (isNumericString(trimmed)) {
    const num = parseInt(trimmed, 10)
    if (num >= 0 && num <= 100) {
      return numberToWord(num)
    }
  }
  return text
}

export default function AccumulationResults() {
  const { entries, spinMode, resetHidden } = useWheelStore()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Only show in accumulation mode
  if (spinMode !== 'accumulation') return null
  
  // Get entries with their counts (for non-fullscreen view)
  const entriesWithCounts = entries.filter(e => (e.count || 0) > 0)
  const totalSpins = entries.reduce((sum, e) => sum + (e.count || 0), 0)
  
  // Find highest and lowest counts
  const allCounts = entries.map(e => e.count || 0)
  const maxCount = allCounts.length > 0 ? Math.max(...allCounts) : 0
  const minCount = allCounts.length > 0 ? Math.min(...allCounts) : 0
  
  // Get item class based on count
  const getItemClass = (count: number) => {
    if (totalSpins === 0) return ''
    if (count === maxCount && maxCount > 0) return 'highest'
    if (count === minCount) return 'lowest'
    return ''
  }
  
  // For non-fullscreen, also show losers (0 count entries)
  const losers = entries.filter(e => (e.count || 0) === 0)
  
  if (isFullscreen) {
    return (
      <div className="accumulation-fullscreen-overlay">
        <div className="accumulation-fullscreen-content">
          <div className="accumulation-fullscreen-header">
            <h2>Results</h2>
            <button className="accumulation-close-fullscreen" onClick={() => setIsFullscreen(false)}>
              <CloseIcon />
            </button>
          </div>
          
          {totalSpins === 0 ? (
            <div className="accumulation-empty-fullscreen">
              No results yet
            </div>
          ) : (
            <div className="accumulation-grid-fullscreen">
              {entries.map((entry) => (
                <div key={entry.id} className={`accumulation-item-fullscreen ${getItemClass(entry.count || 0)}`}>
                  <span className="item-name-fullscreen">{formatEntryText(entry.text)}</span>
                  <span className="item-count-fullscreen">{entry.count || 0}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="accumulation-footer-fullscreen">
            <span>Total Spins: {totalSpins}</span>
            <button className="accumulation-clear-fullscreen" onClick={resetHidden}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="accumulation-results-box">
      <span className="corner-dot top-left"></span>
      <span className="corner-dot top-right"></span>
      
      <button 
        className="accumulation-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="accumulation-title">Results</span>
        <ChevronDownIcon className={`expand-arrow ${isExpanded ? 'expanded' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="accumulation-content">
          {totalSpins === 0 ? (
            <div className="accumulation-empty">
              No results yet
            </div>
          ) : (
            <>
              <div className="accumulation-grid">
                {entriesWithCounts.map((entry) => (
                  <div key={entry.id} className={`accumulation-item ${getItemClass(entry.count || 0)}`}>
                    <span className="item-name">{formatEntryText(entry.text)}</span>
                    <span className="item-count">{entry.count}</span>
                  </div>
                ))}
              </div>
              
              {losers.length > 0 && (
                <div className="accumulation-losers">
                  <span className="losers-label">Not picked:</span>
                  <div className="losers-list">
                    {losers.map((entry) => (
                      <span key={entry.id} className="loser-item">{formatEntryText(entry.text)}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="accumulation-footer">
            <span className="accumulation-total">Total Spins: {totalSpins}</span>
            <div className="accumulation-actions">
              {totalSpins > 0 && (
                <>
                  <button className="accumulation-fullscreen-btn" onClick={() => setIsFullscreen(true)}>
                    Fullscreen
                  </button>
                  <button className="accumulation-clear" onClick={resetHidden}>
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <span className="corner-dot bottom-left"></span>
      <span className="corner-dot bottom-right"></span>
    </div>
  )
}
