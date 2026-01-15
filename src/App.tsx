import { useState, useEffect } from 'react'
import WheelCanvas from './components/Wheel/WheelCanvas'
import InputPanel from './components/Inputs/InputPanel'
import ToolSettings from './components/Settings/ToolSettings'
import PresetWheels from './components/Presets/PresetWheels'
import ThemePicker from './components/Settings/ThemePicker'
import AccumulationResults from './components/Results/AccumulationResults'
import ResultModal from './components/Results/ResultModal'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import AdPlaceholder from './components/Layout/AdPlaceholder'
import { useWheelStore } from './stores/wheelStore'

function App() {
  const [showResult, setShowResult] = useState(false)
  const { winner, isFullscreen, theme } = useWheelStore()

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleSpinComplete = () => {
    setShowResult(true)
  }

  if (isFullscreen) {
    return (
      <div className="app">
        <Header />
        <main className="main-content fullscreen-active">
          <div className="wheel-section">
            <WheelCanvas onSpinComplete={handleSpinComplete} />
          </div>
        </main>
        {showResult && winner && (
          <ResultModal 
            winner={winner} 
            onClose={() => setShowResult(false)} 
          />
        )}
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      
      {/* Top Ad Banner */}
      <div className="ad-row ad-top">
        <AdPlaceholder size="leaderboard" position="header" />
      </div>
      
      <div className="two-column-layout">
        {/* Left Column - Fixed Wheel */}
        <div className="left-column">
          <div className="wheel-sticky">
            <WheelCanvas onSpinComplete={handleSpinComplete} />
            {/* Ad below wheel */}
            <div className="wheel-ad">
              <AdPlaceholder size="rectangle" position="sidebar" />
            </div>
          </div>
        </div>
        
        {/* Right Column - Scrollable Content */}
        <div className="right-column">
          <div className="panels-container">
            <InputPanel />
            <PresetWheels />
            <ThemePicker />
            <ToolSettings />
            <AccumulationResults />
            
            {/* Ad within content */}
            <div className="content-ad">
              <AdPlaceholder size="rectangle" position="content" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {showResult && winner && (
        <ResultModal 
          winner={winner} 
          onClose={() => setShowResult(false)} 
        />
      )}
    </div>
  )
}

export default App
