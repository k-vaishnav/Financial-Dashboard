import { formatCurrency } from '../utils/dashboardUtils'
import './OverviewSection.css'

function OverviewSpotlight({ summary, overviewMetrics }) {
  return (
    <div className="overview-spotlight">
      <div className="overview-intro">
        <div>
          <p className="eyebrow">Dashboard Overview</p>
          <h2>Financial pulse at a glance</h2>
          <p className="overview-copy">
            Keep track of balance momentum, monthly spending pace, and the categories
            shaping your current financial picture.
          </p>
        </div>

        <div className="overview-callout">
          <span>Current balance</span>
          <strong>{formatCurrency(summary.balance)}</strong>
          <small>Available after total income and expenses</small>
        </div>
      </div>

      <div className="overview-stat-grid">
        <article className="overview-stat-card accent-teal">
          <span>Net savings rate</span>
          <strong>{overviewMetrics.savingsRate}%</strong>
          <small>{formatCurrency(summary.balance)} retained from total income</small>
        </article>
        <article className="overview-stat-card accent-amber">
          <span>Average monthly spend</span>
          <strong>{formatCurrency(overviewMetrics.monthlyAverageSpend)}</strong>
          <small>Average outgoing amount across recorded months</small>
        </article>
        <article className="overview-stat-card accent-sky">
          <span>Active spending categories</span>
          <strong>{overviewMetrics.activeCategories}</strong>
          <small>Expense groups currently contributing to spend</small>
        </article>
        <article className="overview-stat-card accent-coral">
          <span>Largest expense</span>
          <strong>{formatCurrency(overviewMetrics.largestExpense)}</strong>
          <small>Highest single outgoing transaction in the dataset</small>
        </article>
      </div>
    </div>
  )
}

function BalanceTrend({ monthlySnapshots }) {
  const highestBalance = Math.max(...monthlySnapshots.map((month) => month.balance), 1)
  const latestBalance = monthlySnapshots[monthlySnapshots.length - 1]?.balance ?? 0

  return (
    <article className="panel panel-large">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Dashboard Overview</p>
          <h2>Balance trend</h2>
        </div>
        <strong>{formatCurrency(latestBalance)}</strong>
      </div>

      {monthlySnapshots.length > 0 ? (
        <div className="trend-chart" aria-label="Balance trend chart">
          {monthlySnapshots.map((month, index) => (
            <div className="trend-column" key={month.monthKey}>
              <div
                className="trend-bar"
                style={{
                  height: `${(month.balance / highestBalance) * 100}%`,
                  animationDelay: `${index * 140}ms`,
                }}
                title={`${month.label}: ${formatCurrency(month.balance)}`}
              />
              <span>{month.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">No trend data available yet.</div>
      )}
    </article>
  )
}

function SpendingBreakdown({ expenseBreakdown }) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Categorical View</p>
          <h2>Spending breakdown</h2>
        </div>
      </div>

      {expenseBreakdown.length > 0 ? (
        <div className="breakdown-list">
          {expenseBreakdown.map((item) => (
            <div className="breakdown-row" key={item.category}>
              <div className="breakdown-copy">
                <strong>{item.category}</strong>
                <span>{formatCurrency(item.amount)}</span>
              </div>
              <div className="breakdown-track">
                <div className="breakdown-fill" style={{ width: `${item.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">No expense categories to visualize yet.</div>
      )}
    </article>
  )
}

function OverviewSection({ summary, monthlySnapshots, expenseBreakdown, overviewMetrics }) {
  return (
    <section className="overview-section" id="overview">
      <OverviewSpotlight summary={summary} overviewMetrics={overviewMetrics} />

      <div className="overview-grid">
        <BalanceTrend monthlySnapshots={monthlySnapshots} />
        <SpendingBreakdown expenseBreakdown={expenseBreakdown} />
      </div>
    </section>
  )
}

export default OverviewSection
