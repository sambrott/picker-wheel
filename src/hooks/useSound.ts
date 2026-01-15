import { useCallback, useRef, useEffect } from 'react'
import { useWheelStore } from '../stores/wheelStore'

// Audio context singleton
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioContext
}

export function useSound() {
  const { soundEnabled } = useWheelStore()
  const lastTickTime = useRef<number>(0)
  
  // Resume audio context on user interaction (required by browsers)
  useEffect(() => {
    const resumeAudio = () => {
      const ctx = getAudioContext()
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
    }
    
    document.addEventListener('click', resumeAudio, { once: true })
    document.addEventListener('touchstart', resumeAudio, { once: true })
    
    return () => {
      document.removeEventListener('click', resumeAudio)
      document.removeEventListener('touchstart', resumeAudio)
    }
  }, [])
  
  // Play a tick/click sound when hitting a peg
  const playTick = useCallback(() => {
    if (!soundEnabled) return
    
    // Throttle ticks to prevent audio overload
    const now = Date.now()
    if (now - lastTickTime.current < 30) return
    lastTickTime.current = now
    
    try {
      const ctx = getAudioContext()
      if (ctx.state === 'suspended') return
      
      const currentTime = ctx.currentTime
      
      // Create a short, sharp click sound
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      // Use a higher frequency for a "click" sound
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(800, currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, currentTime + 0.03)
      
      // Quick attack and decay for a sharp click
      gainNode.gain.setValueAtTime(0, currentTime)
      gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.005)
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.05)
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.start(currentTime)
      oscillator.stop(currentTime + 0.05)
    } catch (e) {
      // Silently fail if audio isn't available
    }
  }, [soundEnabled])
  
  // Play a celebration sound when winner is picked
  const playWin = useCallback(() => {
    if (!soundEnabled) return
    
    try {
      const ctx = getAudioContext()
      if (ctx.state === 'suspended') return
      
      const currentTime = ctx.currentTime
      
      // Play a triumphant ascending arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      
      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        const startTime = currentTime + index * 0.1
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(freq, startTime)
        
        // Each note fades in and out
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + 0.3)
      })
      
      // Add a final chord
      const chordTime = currentTime + 0.4
      const chordNotes = [523.25, 659.25, 783.99] // C major chord
      
      chordNotes.forEach((freq) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.type = 'triangle'
        oscillator.frequency.setValueAtTime(freq, chordTime)
        
        gainNode.gain.setValueAtTime(0, chordTime)
        gainNode.gain.linearRampToValueAtTime(0.15, chordTime + 0.05)
        gainNode.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.8)
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.start(chordTime)
        oscillator.stop(chordTime + 0.8)
      })
    } catch (e) {
      // Silently fail if audio isn't available
    }
  }, [soundEnabled])
  
  return { playTick, playWin }
}
