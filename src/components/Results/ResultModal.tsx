import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { WheelEntry, useWheelStore } from '../../stores/wheelStore'
import { CelebrationIcon } from '../Icons/Icons'
import './ResultModal.css'

interface ResultModalProps {
  winner: WheelEntry
  onClose: () => void
}

export default function ResultModal({ winner, onClose }: ResultModalProps) {
  const { confettiEnabled, winnerColor } = useWheelStore()
  
  useEffect(() => {
    if (confettiEnabled) {
      // Fire confetti
      const duration = 2000
      const end = Date.now() + duration
      
      const colors = ['#FF6B35', '#4ECDC4', '#FFE66D', '#E63946']
      
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        })
        
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      
      frame()
    }
  }, [confettiEnabled])
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <CelebrationIcon className="winner-icon" />
            <h2>Winner!</h2>
          </div>
          
          <div 
            className="winner-display"
            style={{ backgroundColor: winnerColor || undefined }}
          >
            <motion.span
              className="winner-text"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
            >
              {winner.text}
            </motion.span>
          </div>
          
          <div className="modal-actions">
            <button onClick={onClose} className="btn btn-primary">
              Spin Again
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

