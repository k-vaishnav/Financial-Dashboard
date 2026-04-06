export const initialTransactions = [
  { id: 1, date: '2026-01-05', label: 'Salary Deposit', amount: 5200, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-01-09', label: 'Apartment Rent', amount: 1450, category: 'Housing', type: 'expense' },
  { id: 3, date: '2026-01-12', label: 'Groceries', amount: 182, category: 'Food', type: 'expense' },
  { id: 4, date: '2026-01-16', label: 'Freelance Project', amount: 900, category: 'Freelance', type: 'income' },
  { id: 5, date: '2026-01-18', label: 'Electric Bill', amount: 110, category: 'Utilities', type: 'expense' },
  { id: 6, date: '2026-02-02', label: 'Salary Deposit', amount: 5200, category: 'Salary', type: 'income' },
  { id: 7, date: '2026-02-05', label: 'Coffee and Snacks', amount: 34, category: 'Food', type: 'expense' },
  { id: 8, date: '2026-02-11', label: 'New Laptop Fund', amount: 420, category: 'Savings', type: 'expense' },
  { id: 9, date: '2026-02-14', label: 'Dining Out', amount: 76, category: 'Food', type: 'expense' },
  { id: 10, date: '2026-02-21', label: 'Mobile Plan', amount: 48, category: 'Utilities', type: 'expense' },
  { id: 11, date: '2026-03-01', label: 'Salary Deposit', amount: 5200, category: 'Salary', type: 'income' },
  { id: 12, date: '2026-03-03', label: 'Gym Membership', amount: 62, category: 'Health', type: 'expense' },
  { id: 13, date: '2026-03-08', label: 'Weekend Trip', amount: 360, category: 'Travel', type: 'expense' },
  { id: 14, date: '2026-03-13', label: 'Stock Dividend', amount: 140, category: 'Investments', type: 'income' },
  { id: 15, date: '2026-03-20', label: 'Internet Bill', amount: 58, category: 'Utilities', type: 'expense' },
  { id: 16, date: '2026-03-27', label: 'Groceries', amount: 214, category: 'Food', type: 'expense' },
]

export const roleOptions = ['Viewer', 'Admin']
export const typeOptions = ['all', 'income', 'expense']
export const sortOptions = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Amount high to low' },
  { value: 'amount-asc', label: 'Amount low to high' },
]

export const emptyFormState = {
  id: null,
  label: '',
  date: '',
  amount: '',
  category: '',
  type: 'expense',
}
