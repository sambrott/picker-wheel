import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheelStore, WheelEntry } from '../../stores/wheelStore'
import './InputList.css'

export default function InputList() {
  const { entries, removeEntry, updateEntry } = useWheelStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  
  const startEdit = (entry: WheelEntry) => {
    setEditingId(entry.id)
    setEditText(entry.text)
  }
  
  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateEntry(editingId, editText.trim())
    }
    setEditingId(null)
    setEditText('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      setEditingId(null)
      setEditText('')
    }
  }
  
  return (
    <div className="input-list">
      <AnimatePresence mode="popLayout">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            className={`input-list-item ${entry.hidden ? 'hidden-item' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: entry.hidden ? 0.5 : 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <span className="item-number">{index + 1}</span>
            
            {editingId === entry.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={handleKeyDown}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span 
                className="item-text"
                onDoubleClick={() => startEdit(entry)}
              >
                {entry.text}
                {entry.hidden && <span className="eliminated-badge">eliminated</span>}
              </span>
            )}
            
            <div className="item-actions">
              <button 
                onClick={() => startEdit(entry)}
                className="item-btn edit-btn"
                title="Edit"
              >
                ✏️
              </button>
              <button 
                onClick={() => removeEntry(entry.id)}
                className="item-btn delete-btn"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {entries.length === 0 && (
        <div className="empty-list">
          <p>No options yet!</p>
          <p className="empty-hint">Add some options above to get started.</p>
        </div>
      )}
    </div>
  )
}

