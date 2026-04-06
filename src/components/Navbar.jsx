import './Navbar.css'

function Navbar({ isDarkMode, onThemeToggle, onExportJson, onExportCsv }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">F</div>
        <div>
          <p className="navbar-label">Finance Console</p>
          <strong>Dashboard workspace</strong>
        </div>
      </div>

      <nav className="navbar-links" aria-label="Dashboard sections">
        <a href="#overview">Overview</a>
        <a href="#actions">Actions</a>
        <a href="#transactions">Transactions</a>
      </nav>

      <div className="navbar-actions">
        <button type="button" className="ghost-button" onClick={onExportJson}>
          Export JSON
        </button>
        <button type="button" className="ghost-button" onClick={onExportCsv}>
          Export CSV
        </button>
        <button type="button" className="theme-toggle" onClick={onThemeToggle}>
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
