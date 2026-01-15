import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-dot red"></span>
          <span className="logo-dot orange"></span>
          <span className="logo-text">Wheel Spin</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">File</a>
          <a href="#" className="nav-link">Share</a>
          <a href="#" className="nav-link">Tools</a>
          <button className="menu-btn" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}
