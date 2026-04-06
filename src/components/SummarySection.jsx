import { formatCurrency } from '../utils/dashboardUtils'
import './SummarySection.css'

function SummaryCard({ label, value, description }) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{formatCurrency(value)}</strong>
      <small>{description}</small>
    </article>
  )
}

function SummarySection({ summary }) {
  return (
    <section className="summary-grid" aria-label="Financial summary">
      <SummaryCard
        label="Total Balance"
        value={summary.balance}
        description="Current net position across all recorded activity"
      />
      <SummaryCard
        label="Total Income"
        value={summary.income}
        description="All incoming transactions included in the dashboard"
      />
      <SummaryCard
        label="Total Expenses"
        value={summary.expenses}
        description="All outgoing spend captured in current records"
      />
    </section>
  )
}

export default SummarySection
