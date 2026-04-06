import { useEffect, useState } from 'react'
import './App.css'
import './styles/shared.css'
import AdminPanel from './components/AdminPanel'
import HeroSection from './components/HeroSection'
import InsightsSection from './components/InsightsSection'
import Navbar from './components/Navbar'
import OverviewSection from './components/OverviewSection'
import SummarySection from './components/SummarySection'
import TransactionsSection from './components/TransactionsSection'
import {
  emptyFormState,
  initialTransactions,
  roleOptions,
  sortOptions,
  typeOptions,
} from './data/dashboardData'
import {
  getCategoryOptions,
  getExpenseBreakdown,
  getFilteredTransactions,
  getInsights,
  getMonthlySnapshots,
  getOverviewMetrics,
  getSummary,
} from './utils/dashboardUtils'

const STORAGE_KEYS = {
  transactions: 'financial-dashboard-transactions',
  role: 'financial-dashboard-role',
  theme: 'financial-dashboard-theme',
}

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEYS.transactions)
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions
  })
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.role) ?? 'Viewer'
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) === 'dark'
  })
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    query: '',
    sortBy: 'date-desc',
  })
  const [formState, setFormState] = useState(emptyFormState)

  const categories = getCategoryOptions(transactions)
  const summary = getSummary(transactions)
  const monthlySnapshots = getMonthlySnapshots(transactions)
  const expenseBreakdown = getExpenseBreakdown(transactions)
  const insights = getInsights(monthlySnapshots, expenseBreakdown)
  const overviewMetrics = getOverviewMetrics(
    transactions,
    summary,
    monthlySnapshots,
    expenseBreakdown,
  )
  const filteredTransactions = getFilteredTransactions(transactions, filters)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, selectedRole)
  }, [selectedRole])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  function handleRoleChange(event) {
    setSelectedRole(event.target.value)
  }

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  function resetForm() {
    setFormState(emptyFormState)
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    const normalizedTransaction = {
      id: formState.id ?? Date.now(),
      label: formState.label.trim(),
      date: formState.date,
      amount: Number(formState.amount),
      category: formState.category.trim(),
      type: formState.type,
    }

    if (
      normalizedTransaction.label === '' ||
      normalizedTransaction.date === '' ||
      Number.isNaN(normalizedTransaction.amount) ||
      normalizedTransaction.amount <= 0 ||
      normalizedTransaction.category === ''
    ) {
      return
    }

    setTransactions((current) => {
      if (formState.id) {
        return current.map((transaction) =>
          transaction.id === formState.id ? normalizedTransaction : transaction,
        )
      }

      return [normalizedTransaction, ...current]
    })

    resetForm()
  }

  function handleEdit(transaction) {
    setFormState({
      id: transaction.id,
      label: transaction.label,
      date: transaction.date,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
    })
  }

  function handleThemeToggle() {
    setIsDarkMode((current) => !current)
  }

  function handleExportJson() {
    const content = JSON.stringify(transactions, null, 2)
    downloadFile(content, 'transactions.json', 'application/json')
  }

  function handleExportCsv() {
    const rows = ['date,label,amount,category,type']

    for (const transaction of transactions) {
      rows.push(
        [
          transaction.date,
          escapeCsvValue(transaction.label),
          transaction.amount,
          escapeCsvValue(transaction.category),
          transaction.type,
        ].join(','),
      )
    }

    downloadFile(rows.join('\n'), 'transactions.csv', 'text/csv;charset=utf-8;')
  }

  return (
    <div className="app-shell">
      <div className="dashboard-backdrop" />

      <main className="dashboard">
        <Navbar
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          onExportJson={handleExportJson}
          onExportCsv={handleExportCsv}
        />

        <HeroSection
          selectedRole={selectedRole}
          roleOptions={roleOptions}
          onRoleChange={handleRoleChange}
        />

        <SummarySection summary={summary} />

        <section className="top-tools-grid" id="actions">
          <AdminPanel
            selectedRole={selectedRole}
            formState={formState}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
            onReset={resetForm}
          />
          <InsightsSection insights={insights} />
        </section>

        <OverviewSection
          summary={summary}
          monthlySnapshots={monthlySnapshots}
          expenseBreakdown={expenseBreakdown}
          overviewMetrics={overviewMetrics}
        />

        <section className="content-grid content-grid-single" id="transactions">
          <TransactionsSection
            filters={filters}
            categories={categories}
            typeOptions={typeOptions}
            sortOptions={sortOptions}
            transactions={filteredTransactions}
            selectedRole={selectedRole}
            onFilterChange={handleFilterChange}
            onEdit={handleEdit}
          />
        </section>
      </main>
    </div>
  )
}

function escapeCsvValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`
}

function downloadFile(content, fileName, type) {
  const file = new Blob([content], { type })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  link.click()

  URL.revokeObjectURL(url)
}

export default App
