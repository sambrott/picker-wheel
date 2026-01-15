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
      
      <div className="content-wrapper">
        {/* Left Ad Column */}
        <aside className="ad-column ad-left">
          <AdPlaceholder size="rectangle" position="sidebar" />
        </aside>
        
        {/* Main Content */}
        <main className="main-content">
          <div className="wheel-section">
            <WheelCanvas onSpinComplete={handleSpinComplete} />
          </div>
          <aside className="input-section">
            <InputPanel />
            <PresetWheels />
            <ThemePicker />
            <AccumulationResults />
          </aside>
        </main>
        
        {/* Right Ad Column */}
        <aside className="ad-column ad-right">
          <AdPlaceholder size="rectangle" position="sidebar" />
        </aside>
      </div>
      
      {/* Ad Row Between Content and Settings */}
      <div className="ad-row ad-middle">
        <AdPlaceholder size="leaderboard" position="footer" />
      </div>
      
      {/* Tool Settings - Separate Section */}
      <div className="settings-wrapper">
        <ToolSettings />
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
