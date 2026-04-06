import './InsightsSection.css'

function InsightCard({ label, value }) {
  return (
    <div className="insight-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function InsightsSection({ insights }) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Insights Section</p>
          <h2>Financial observations</h2>
        </div>
      </div>

      <div className="insight-list">
        <InsightCard label="Highest spending category" value={insights.topCategory} />
        <InsightCard label="Monthly comparison" value={insights.monthlyComparison} />
        <InsightCard label="Useful observation" value={insights.observation} />
      </div>
    </article>
  )
}

export default InsightsSection
