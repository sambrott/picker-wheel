import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SpinMode = 'normal' | 'elimination' | 'accumulation'
export type ThemeId = 'dark' | 'light' | 'cyberpunk' | 'retro' | 'ocean' | 'sunset' | 'forest'
export type PointerId = 
  // Free basic
  | 'classic' | 'triangle' | 'chevron'
  // Theme-matched (Pro)
  | 'dark' | 'light' | 'cyberpunk' | 'retro' | 'ocean' | 'sunset' | 'forest'
  // Creative/Fun (Pro)
  | 'lizard' | 'frog' | 'rocket' | 'lightning' | 'flame'

export interface WheelEntry {
  id: string
  text: string
  hidden?: boolean
  count?: number
}

interface WheelState {
  // Entries
  entries: WheelEntry[]
  addEntry: (text: string) => void
  removeEntry: (id: string) => void
  updateEntry: (id: string, text: string) => void
  clearEntries: () => void
  resetHidden: () => void
  
  // Spin state
  isSpinning: boolean
  setIsSpinning: (spinning: boolean) => void
  winner: WheelEntry | null
  setWinner: (entry: WheelEntry | null) => void
  winnerColor: string | null
  setWinnerColor: (color: string | null) => void
  
  // Spin mode
  spinMode: SpinMode
  setSpinMode: (mode: SpinMode) => void
  
  // Theme
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  
  // Pointer style
  pointerId: PointerId
  setPointerId: (id: PointerId) => void
  
  // Settings
  spinDuration: number
  setSpinDuration: (duration: number) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  confettiEnabled: boolean
  setConfettiEnabled: (enabled: boolean) => void
  
  // Fullscreen
  isFullscreen: boolean
  toggleFullscreen: () => void
  
  // History
  history: WheelEntry[]
  addToHistory: (entry: WheelEntry) => void
  clearHistory: () => void
  
  // Handle spin result based on mode
  handleSpinResult: (entry: WheelEntry) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

const defaultEntries: WheelEntry[] = [
  { id: generateId(), text: 'Pizza' },
  { id: generateId(), text: 'Tacos' },
  { id: generateId(), text: 'Sushi' },
  { id: generateId(), text: 'Burger' },
  { id: generateId(), text: 'Pasta' },
  { id: generateId(), text: 'Salad' },
]

export const useWheelStore = create<WheelState>()(
  persist(
    (set, get) => ({
      // Entries
      entries: defaultEntries,
      addEntry: (text) => set((state) => ({
        entries: [...state.entries, { id: generateId(), text, count: 0 }]
      })),
      removeEntry: (id) => set((state) => ({
        entries: state.entries.filter((e) => e.id !== id)
      })),
      updateEntry: (id, text) => set((state) => ({
        entries: state.entries.map((e) => e.id === id ? { ...e, text } : e)
      })),
      clearEntries: () => set({ entries: [] }),
      resetHidden: () => set((state) => ({
        entries: state.entries.map((e) => ({ ...e, hidden: false, count: 0 }))
      })),
      
      // Spin state
      isSpinning: false,
      setIsSpinning: (spinning) => set({ isSpinning: spinning }),
      winner: null,
      setWinner: (entry) => set({ winner: entry }),
      winnerColor: null,
      setWinnerColor: (color) => set({ winnerColor: color }),
      
      // Spin mode
      spinMode: 'normal',
      setSpinMode: (mode) => set({ spinMode: mode }),
      
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // Pointer style
      pointerId: 'classic',
      setPointerId: (id) => set({ pointerId: id }),
      
      // Settings
      spinDuration: 5,
      setSpinDuration: (duration) => set({ spinDuration: duration }),
      soundEnabled: true,
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      confettiEnabled: true,
      setConfettiEnabled: (enabled) => set({ confettiEnabled: enabled }),
      
      // Fullscreen
      isFullscreen: false,
      toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
      
      // History
      history: [],
      addToHistory: (entry) => set((state) => ({
        history: [entry, ...state.history].slice(0, 20)
      })),
      clearHistory: () => set({ history: [] }),
      
      // Handle spin result based on mode
      handleSpinResult: (entry) => {
        const { spinMode, addToHistory } = get()
        addToHistory(entry)
        
        if (spinMode === 'elimination') {
          set((state) => ({
            entries: state.entries.map((e) => 
              e.id === entry.id ? { ...e, hidden: true } : e
            )
          }))
        } else if (spinMode === 'accumulation') {
          set((state) => ({
            entries: state.entries.map((e) => 
              e.id === entry.id ? { ...e, count: (e.count || 0) + 1 } : e
            )
          }))
        }
      }
    }),
    {
      name: 'picker-wheel-storage',
      partialize: (state) => ({
        entries: state.entries,
        spinMode: state.spinMode,
        spinDuration: state.spinDuration,
        soundEnabled: state.soundEnabled,
        confettiEnabled: state.confettiEnabled,
        history: state.history,
        theme: state.theme,
        pointerId: state.pointerId,
      })
    }
  )
)
