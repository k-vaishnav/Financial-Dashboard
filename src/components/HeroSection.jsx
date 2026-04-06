import './HeroSection.css'

function HeroSection({ selectedRole, roleOptions, onRoleChange }) {
  return (
    <section className="hero-card">
      <div className="hero-content">
        <div className="hero-topline">
          <p className="eyebrow">Financial dashboard</p>
          <span className="hero-badge">Live overview</span>
        </div>

        <h1>See the story behind every dollar.</h1>
        <p className="hero-copy">
          Review balances, transactions, and spending patterns through a clean, modern
          workspace built to stay readable on every screen.
        </p>

        <div className="hero-highlights">
          <div className="hero-pill">
            <strong>Balance pulse</strong>
            <span>Track inflow, outflow, and net movement at a glance</span>
          </div>
          <div className="hero-pill">
            <strong>Spending lens</strong>
            <span>Spot category shifts and monthly trends faster</span>
          </div>
        </div>
      </div>

      <div className="hero-actions">
        <label className="role-switcher">
          <span>Active role</span>
          <select value={selectedRole} onChange={onRoleChange}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <div className="role-note">
          {selectedRole === 'Admin'
            ? 'Admin mode enables transaction create and edit actions.'
            : 'Viewer mode keeps the dashboard read-only.'}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
