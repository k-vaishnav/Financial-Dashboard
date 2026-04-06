const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatDisplayDate(value) {
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

export function getSummary(transactions) {
  let income = 0
  let expenses = 0

  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      income += transaction.amount
    } else {
      expenses += transaction.amount
    }
  }

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function getMonthlySnapshots(transactions) {
  const monthMap = new Map()
  const sortedTransactions = [...transactions].sort(
    (first, second) => new Date(first.date) - new Date(second.date),
  )

  for (const transaction of sortedTransactions) {
    const monthKey = transaction.date.slice(0, 7)

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, {
        monthKey,
        label: monthFormatter.format(new Date(`${monthKey}-01T00:00:00`)),
        income: 0,
        expenses: 0,
        balance: 0,
      })
    }

    const month = monthMap.get(monthKey)

    if (transaction.type === 'income') {
      month.income += transaction.amount
    } else {
      month.expenses += transaction.amount
    }
  }

  let runningBalance = 0
  const snapshots = []

  for (const month of monthMap.values()) {
    runningBalance += month.income - month.expenses
    snapshots.push({ ...month, balance: runningBalance })
  }

  return snapshots
}

export function getExpenseBreakdown(transactions) {
  const expenseMap = new Map()

  for (const transaction of transactions) {
    if (transaction.type !== 'expense') {
      continue
    }

    expenseMap.set(
      transaction.category,
      (expenseMap.get(transaction.category) ?? 0) + transaction.amount,
    )
  }

  let totalExpenses = 0

  for (const amount of expenseMap.values()) {
    totalExpenses += amount
  }

  const breakdown = []

  for (const [category, amount] of expenseMap.entries()) {
    breakdown.push({
      category,
      amount,
      share: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    })
  }

  return breakdown.sort((first, second) => second.amount - first.amount)
}

export function getInsights(monthlyData, expenseBreakdown) {
  const topCategory = expenseBreakdown[0]
  const latestMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]

  let monthlyComparison = 'Not enough monthly data yet.'

  if (latestMonth && previousMonth) {
    const difference = latestMonth.expenses - previousMonth.expenses
    const direction = difference >= 0 ? 'up' : 'down'
    monthlyComparison = `${latestMonth.label} expenses are ${formatCurrency(Math.abs(difference))} ${direction} from ${previousMonth.label}.`
  }

  const netPositiveMonths = monthlyData.filter((month) => month.income > month.expenses).length

  return {
    topCategory: topCategory
      ? `${topCategory.category} is the highest spending category at ${formatCurrency(topCategory.amount)}.`
      : 'No expense data available yet.',
    monthlyComparison,
    observation: latestMonth
      ? `${netPositiveMonths} of ${monthlyData.length} months stayed cash-flow positive.`
      : 'Add transactions to unlock insights.',
  }
}

export function getOverviewMetrics(transactions, summary, monthlyData, expenseBreakdown) {
  let largestExpense = 0

  for (const transaction of transactions) {
    if (transaction.type === 'expense' && transaction.amount > largestExpense) {
      largestExpense = transaction.amount
    }
  }

  const monthlyAverageSpend =
    monthlyData.length > 0 ? Math.round(summary.expenses / monthlyData.length) : 0
  const savingsRate =
    summary.income > 0 ? Math.round((summary.balance / summary.income) * 100) : 0
  const activeCategories = expenseBreakdown.length

  return {
    monthlyAverageSpend,
    savingsRate,
    activeCategories,
    largestExpense,
  }
}

export function getCategoryOptions(transactions) {
  const seenCategories = new Set()
  const categories = ['all']

  for (const transaction of transactions) {
    if (!seenCategories.has(transaction.category)) {
      seenCategories.add(transaction.category)
      categories.push(transaction.category)
    }
  }

  return categories
}

export function getFilteredTransactions(transactions, filters) {
  const filteredTransactions = []
  const query = filters.query.trim().toLowerCase()

  for (const transaction of transactions) {
    const matchesType = filters.type === 'all' || transaction.type === filters.type
    const matchesCategory =
      filters.category === 'all' || transaction.category === filters.category
    const matchesQuery =
      query === '' ||
      transaction.label.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query)

    if (matchesType && matchesCategory && matchesQuery) {
      filteredTransactions.push(transaction)
    }
  }

  return filteredTransactions.sort((first, second) => {
    if (filters.sortBy === 'date-asc') {
      return new Date(first.date) - new Date(second.date)
    }

    if (filters.sortBy === 'amount-desc') {
      return second.amount - first.amount
    }

    if (filters.sortBy === 'amount-asc') {
      return first.amount - second.amount
    }

    return new Date(second.date) - new Date(first.date)
  })
}
