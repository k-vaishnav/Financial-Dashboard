import './AdminPanel.css'

function TransactionForm({ formState, onFormChange, onFormSubmit, onReset }) {
  return (
    <form className="transaction-form" onSubmit={onFormSubmit}>
      <label>
        <span>Transaction name</span>
        <input
          name="label"
          type="text"
          placeholder="Add a clear label"
          value={formState.label}
          onChange={onFormChange}
        />
      </label>

      <div className="form-split">
        <label>
          <span>Date</span>
          <input name="date" type="date" value={formState.date} onChange={onFormChange} />
        </label>

        <label>
          <span>Amount</span>
          <input
            name="amount"
            type="number"
            min="1"
            step="1"
            placeholder="0"
            value={formState.amount}
            onChange={onFormChange}
          />
        </label>
      </div>

      <div className="form-split">
        <label>
          <span>Category</span>
          <input
            name="category"
            type="text"
            placeholder="Housing, Food, Salary"
            value={formState.category}
            onChange={onFormChange}
          />
        </label>

        <label>
          <span>Type</span>
          <select name="type" value={formState.type} onChange={onFormChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {formState.id ? 'Save changes' : 'Add transaction'}
        </button>
        {formState.id ? (
          <button type="button" className="ghost-button" onClick={onReset}>
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  )
}

function AdminPanel({ selectedRole, formState, onFormChange, onFormSubmit, onReset }) {
  return (
    <article className="panel admin-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Quick Actions</p>
          <h2>{selectedRole === 'Admin' ? 'Add or edit a transaction' : 'Transaction actions'}</h2>
        </div>
      </div>

      {selectedRole === 'Admin' ? (
        <TransactionForm
          formState={formState}
          onFormChange={onFormChange}
          onFormSubmit={onFormSubmit}
          onReset={onReset}
        />
      ) : (
        <div className="empty-state admin-empty-state">
          Switch to <strong>Admin</strong> to add or edit transactions. Viewer mode stays
          read-only for demo purposes.
        </div>
      )}
    </article>
  )
}

export default AdminPanel
