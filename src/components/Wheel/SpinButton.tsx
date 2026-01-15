import './SpinButton.css'

interface SpinButtonProps {
  onClick: () => void
  disabled: boolean
}

export default function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <button
      className={`spin-button ${disabled ? 'spinning' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? '🎲' : 'Spin'}
    </button>
  )
}
