import { formatCurrency, formatDisplayDate } from '../utils/dashboardUtils'
import './TransactionsSection.css'

function FiltersBar({
  filters,
  categories,
  typeOptions,
  sortOptions,
  onFilterChange,
}) {
  return (
    <div className="filter-bar">
      <label>
        <span>Search</span>
        <input
          name="query"
          type="search"
          placeholder="Search by transaction or category"
          value={filters.query}
          onChange={onFilterChange}
        />
      </label>

      <label>
        <span>Type</span>
        <select name="type" value={filters.type} onChange={onFilterChange}>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type === 'all' ? 'All types' : type}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Category</span>
        <select name="category" value={filters.category} onChange={onFilterChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All categories' : category}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sort</span>
        <select name="sortBy" value={filters.sortBy} onChange={onFilterChange}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

function TransactionRow({ transaction, selectedRole, onEdit }) {
  const amountClass = transaction.type === 'income' ? 'amount-positive' : 'amount-negative'
  const amountPrefix = transaction.type === 'income' ? '+' : '-'

  return (
    <div className="transaction-row">
      <div className="transaction-field transaction-date">
        <span className="transaction-label">Date</span>
        <span>{formatDisplayDate(transaction.date)}</span>
      </div>

      <div className="transaction-field transaction-main">
        <span className="transaction-label">Transaction</span>
        <strong>{transaction.label}</strong>
        <span className="transaction-subline">{transaction.category}</span>
      </div>

      <div className="transaction-field">
        <span className="transaction-label">Type</span>
        <span className={`type-pill ${transaction.type}`}>{transaction.type}</span>
      </div>

      <div className="transaction-field transaction-amount-block">
        <span className="transaction-label">Amount</span>
        <span className={amountClass}>
          {amountPrefix}
          {formatCurrency(transaction.amount)}
        </span>
      </div>

      <div className="transaction-field transaction-action">
        <span className="transaction-label">Action</span>
        {selectedRole === 'Admin' ? (
          <button type="button" className="ghost-button" onClick={() => onEdit(transaction)}>
            Edit
          </button>
        ) : (
          <span className="muted-copy">View only</span>
        )}
      </div>
    </div>
  )
}

function TransactionsSection({
  filters,
  categories,
  typeOptions,
  sortOptions,
  transactions,
  selectedRole,
  onFilterChange,
  onEdit,
}) {
  return (
    <article className="panel panel-large">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Transactions Section</p>
          <h2>Explore financial activity</h2>
        </div>
      </div>

      <FiltersBar
        filters={filters}
        categories={categories}
        typeOptions={typeOptions}
        sortOptions={sortOptions}
        onFilterChange={onFilterChange}
      />

      <div className="transaction-table">
        <div className="transaction-head">
          <span>Date</span>
          <span>Transaction</span>
          <span>Category</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Action</span>
        </div>

        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              selectedRole={selectedRole}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="empty-state">No transactions match the selected filters right now.</div>
        )}
      </div>
    </article>
  )
}

export default TransactionsSection
