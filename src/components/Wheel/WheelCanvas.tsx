import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useWheelStore } from '../../stores/wheelStore'
import { useSound } from '../../hooks/useSound'
import SpinButton from './SpinButton'
import WheelPointer from './WheelPointer'
import './WheelCanvas.css'

interface WheelCanvasProps {
  onSpinComplete: () => void
}

// Get computed CSS variable value
function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// Get wheel segment colors from CSS variables (always colorful)
function getThemeWheelColors(count: number): string[] {
  const colors: string[] = []
  for (let i = 0; i < count; i++) {
    const varName = `--wheel-color-${(i % 8) + 1}`
    const color = getCSSVar(varName) || '#888888'
    colors.push(color)
  }
  return colors
}

export default function WheelCanvas({ onSpinComplete }: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [idleRotation, setIdleRotation] = useState(0)
  const [pointerTick, setPointerTick] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)
  const lastSegmentRef = useRef<number>(-1)
  const rotationValue = useMotionValue(0)
  const { playTick, playWin } = useSound()
  const { 
    entries, 
    isSpinning, 
    setIsSpinning, 
    setWinner,
    setWinnerColor,
    spinDuration,
    handleSpinResult,
    isFullscreen,
    toggleFullscreen,
    theme
  } = useWheelStore()
  
  const visibleEntries = entries.filter(e => !e.hidden)
  
  // Display size changes based on fullscreen - use fixed sizes
  const displaySize = isFullscreen ? 500 : 340
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 3) : 2
  const canvasSize = displaySize * dpr
  
  // Wait for font to load
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true)
    })
  }, [])
  
  // Always spin slowly when not actively spinning (continuous idle)
  useEffect(() => {
    if (isSpinning) return
    
    const idleInterval = setInterval(() => {
      setIdleRotation(prev => prev + 0.15) // Very slow continuous rotation
    }, 16) // ~60fps for smooth animation
    
    return () => clearInterval(idleInterval)
  }, [isSpinning])
  
  // Draw the wheel with high resolution
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !fontLoaded) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set up high-DPI canvas with correct size
    canvas.width = canvasSize
    canvas.height = canvasSize
    canvas.style.width = `${displaySize}px`
    canvas.style.height = `${displaySize}px`
    
    // Scale context for high-DPI
    ctx.scale(dpr, dpr)
    
    const centerX = displaySize / 2
    const centerY = displaySize / 2
    const radius = Math.min(centerX, centerY)
    
    // Get theme colors
    const surfaceColor = getCSSVar('--color-surface') || '#2D2D2D'
    const accentColor = getCSSVar('--color-accent') || '#FFFFFF'
    const textColor = getCSSVar('--color-text-dark') || '#1A1A1A'
    
    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    // Clear canvas
    ctx.clearRect(0, 0, displaySize, displaySize)
    
    if (visibleEntries.length === 0) {
      // Draw empty wheel
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = surfaceColor
      ctx.fill()
      
      // Draw empty state text
      ctx.fillStyle = accentColor
      const fontSize = isFullscreen ? 24 : 18
      ctx.font = `700 ${fontSize}px "Funnel Display", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Add options!', centerX, centerY)
      return
    }
    
    const segmentAngle = (Math.PI * 2) / visibleEntries.length
    const colors = getThemeWheelColors(visibleEntries.length)
    
    // Draw segments
    visibleEntries.forEach((_entry, index) => {
      // Start at top (-90 degrees / -PI/2) and go clockwise
      const startAngle = index * segmentAngle - Math.PI / 2
      const endAngle = startAngle + segmentAngle
      
      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      
      ctx.fillStyle = colors[index]
      ctx.fill()
      
      // Draw segment border (thin line between segments)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()
    })
    
    // Scale peg size based on wheel size
    const pegRadius = isFullscreen ? 8 : 6
    const pegOffset = isFullscreen ? 16 : 12
    
    // Draw pegs on top of all segments
    visibleEntries.forEach((_entry, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2
      const pegAngle = startAngle
      const pegX = centerX + Math.cos(pegAngle) * (radius - pegOffset)
      const pegY = centerY + Math.sin(pegAngle) * (radius - pegOffset)
      
      // Peg shadow
      ctx.beginPath()
      ctx.arc(pegX + 1, pegY + 1, pegRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fill()
      
      // Peg body
      ctx.beginPath()
      ctx.arc(pegX, pegY, pegRadius, 0, Math.PI * 2)
      ctx.fillStyle = accentColor
      ctx.fill()
      
      // Peg highlight
      ctx.beginPath()
      ctx.arc(pegX - 1.5, pegY - 1.5, pegRadius / 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.fill()
    })
    
    // Scale text size based on wheel size
    const fontSize = isFullscreen ? 18 : 14
    const textOffset = isFullscreen ? 38 : 28
    const maxTextWidth = radius - (isFullscreen ? 75 : 55)
    
    // Draw text on segments
    visibleEntries.forEach((entry, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2
      
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + segmentAngle / 2)
      
      // Text styling with shadow for better readability
      ctx.fillStyle = textColor
      ctx.font = `700 ${fontSize}px "Funnel Display", sans-serif`
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      
      // Add subtle text shadow
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
      ctx.shadowBlur = 2
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      // Truncate text if too long
      let text = entry.text
      while (ctx.measureText(text).width > maxTextWidth && text.length > 3) {
        text = text.slice(0, -4) + '...'
      }
      
      ctx.fillText(text, radius - textOffset, 0)
      ctx.restore()
    })
    
    // Draw center circle
    const centerRadius = isFullscreen ? 12 : 8
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
    ctx.fillStyle = surfaceColor
    ctx.fill()
    
  }, [visibleEntries, theme, canvasSize, displaySize, dpr, isFullscreen, fontLoaded])
  
  // Track rotation changes to detect peg crossings and play tick sound
  useEffect(() => {
    if (visibleEntries.length === 0) return
    
    const segmentAngle = 360 / visibleEntries.length
    
    const unsubscribe = rotationValue.on('change', (latest) => {
      const normalizedRotation = ((latest % 360) + 360) % 360
      const currentSegment = Math.floor(normalizedRotation / segmentAngle)
      
      if (lastSegmentRef.current !== -1 && currentSegment !== lastSegmentRef.current) {
        setPointerTick(true)
        playTick() // Play tick sound when crossing a peg
        setTimeout(() => setPointerTick(false), 80)
      }
      lastSegmentRef.current = currentSegment
    })
    
    return () => unsubscribe()
  }, [rotationValue, visibleEntries.length, playTick])
  
  const spin = useCallback(() => {
    if (isSpinning || visibleEntries.length === 0) return
    
    setIsSpinning(true)
    setWinner(null)
    setWinnerColor(null)
    lastSegmentRef.current = -1
    
    // Pick random winner
    const winnerIndex = Math.floor(Math.random() * visibleEntries.length)
    const spinWinner = visibleEntries[winnerIndex]
    
    // Get the winner's color
    const winnerColorValue = getThemeWheelColors(visibleEntries.length)[winnerIndex]
    
    const segmentAngle = 360 / visibleEntries.length
    
    // Where the winning segment's center is (in degrees from top, clockwise)
    const winnerCenterAngle = winnerIndex * segmentAngle + segmentAngle / 2
    
    // We need to rotate the wheel so this angle ends up at the top (under pointer)
    const targetAngle = 360 - winnerCenterAngle
    
    // Add extra spins for drama (5-8 full rotations)
    const extraSpins = 5 + Math.floor(Math.random() * 3)
    
    // Start from current position
    const startRotation = idleRotation % 360
    
    // Final rotation = start + extra full spins + the angle needed to land on winner
    const finalRotation = idleRotation + (extraSpins * 360) + ((targetAngle - startRotation + 360) % 360)
    
    // Animate the motion value for peg detection
    rotationValue.set(idleRotation)
    animate(rotationValue, finalRotation, {
      duration: spinDuration,
      ease: [0.15, 0.85, 0.25, 1]
    })
    
    setRotation(finalRotation)
    
    // Set winner after spin completes
    setTimeout(() => {
      setIsSpinning(false)
      setWinner(spinWinner)
      setWinnerColor(winnerColorValue)
      handleSpinResult(spinWinner)
      setIdleRotation(finalRotation)
      playWin() // Play celebration sound
      onSpinComplete()
    }, spinDuration * 1000)
    
  }, [isSpinning, visibleEntries, idleRotation, spinDuration, setIsSpinning, setWinner, setWinnerColor, handleSpinResult, onSpinComplete, rotationValue, playWin])
  
  // Use idle rotation when not spinning, otherwise use spin rotation
  const currentRotation = isSpinning ? rotation : idleRotation
  
  return (
    <div className={`wheel-outer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="wheel-container">
        <WheelPointer 
          isTicking={pointerTick}
        />
        <motion.div 
          className="wheel-wrapper"
          animate={{ rotate: currentRotation }}
          transition={isSpinning ? { 
            duration: spinDuration,
            ease: [0.15, 0.85, 0.25, 1]
          } : {
            duration: 0,
            ease: 'linear'
          }}
        >
          <canvas 
            ref={canvasRef}
            className="wheel-canvas"
          />
        </motion.div>
        <SpinButton onClick={spin} disabled={isSpinning || visibleEntries.length === 0} />
      </div>
      <button 
        className="fullscreen-toggle"
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
    </div>
  )
}
