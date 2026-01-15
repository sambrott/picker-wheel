import './AdPlaceholder.css'

interface AdPlaceholderProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'skyscraper'
  position?: 'header' | 'sidebar' | 'footer'
}

const adSizes = {
  banner: { width: 728, height: 90, label: 'Banner (728×90)' },
  rectangle: { width: 300, height: 250, label: 'Rectangle (300×250)' },
  leaderboard: { width: 728, height: 90, label: 'Leaderboard (728×90)' },
  skyscraper: { width: 160, height: 600, label: 'Skyscraper (160×600)' }
}

export default function AdPlaceholder({ size, position = 'sidebar' }: AdPlaceholderProps) {
  const { width, height, label } = adSizes[size]
  
  return (
    <div 
      className={`ad-placeholder ad-${size} ad-${position}`}
      style={{ 
        maxWidth: width,
        minHeight: height,
        aspectRatio: `${width} / ${height}` 
      }}
      data-ad-slot={`${position}-${size}`}
    >
      <div className="ad-content">
        <span className="ad-label">Ad Space</span>
        <span className="ad-size">{label}</span>
      </div>
    </div>
  )
}
