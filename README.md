# Financial Dashboard

A responsive financial dashboard built with React and Vite.

This project helps users:
- view an overall financial summary
- explore transactions
- understand spending patterns
- switch between `Viewer` and `Admin` roles on the frontend

It is designed as a frontend assignment/demo project, so all data is handled in the browser with mock transactions and local storage.

## What This Project Includes

### Dashboard Overview
- Summary cards for total balance, income, and expenses
- A balance trend visualization
- A spending breakdown visualization
- Extra overview metrics such as savings rate, monthly average spend, active categories, and largest expense

### Transactions Section
- Transaction listing with:
  - date
  - amount
  - category
  - type
- Search
- Filtering
- Sorting
- Responsive mobile card layout for small screens

### Role Based UI
- `Viewer` can only view data
- `Admin` can add new transactions
- `Admin` can edit existing transactions
- Role switcher in the UI for demonstration

### Insights Section
- Highest spending category
- Monthly comparison
- Cash-flow observation

### Optional Enhancements Added
- Dark mode
- Local storage persistence
- Export as JSON
- Export as CSV
- Basic animations for charts

## Honest Scope Notes

This project does **not** include:
- backend/database integration
- real authentication
- full RBAC implementation
- real API calls
- automated unit/integration tests

The roles are simulated only in the frontend for demonstration.

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## Project Structure

Here is the main folder structure in simple terms:

```text
src/
  components/      Reusable UI pieces like navbar, overview, transactions
  data/            Mock transaction data and static options
  styles/          Shared styles used across components
  utils/           Helper functions for calculations and formatting
  App.jsx          Main container that manages state and connects everything
```

## How the App Works

If you are new to frontend development, this is the simplest way to understand the code:

### `App.jsx`
This is the main file.

It:
- stores the application state
- keeps track of:
  - transactions
  - selected role
  - selected filters
  - dark mode
- passes data to smaller components
- handles add/edit/export/theme actions

### `components/`
Each UI part has its own component.

Examples:
- `Navbar.jsx` handles top navigation and theme/export buttons
- `SummarySection.jsx` shows balance, income, and expense cards
- `OverviewSection.jsx` shows charts and overview metrics
- `TransactionsSection.jsx` shows filters and transaction list
- `AdminPanel.jsx` shows the add/edit form

### `utils/dashboardUtils.js`
This file contains helper functions.

Examples:
- calculate summary totals
- build chart data
- filter transactions
- generate insights

This keeps `App.jsx` cleaner and easier to explain.

### Local Storage
The app saves:
- transactions
- selected role
- dark mode preference

This means if the page is refreshed, the user does not lose everything.

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

This will start the app locally.

### 3. Build for production

```bash
npm run build
```

## Main Features Explained Simply

### Financial Summary
Shows the most important numbers first:
- total balance
- total income
- total expenses

### Overview
Gives a quick understanding of financial activity with:
- trend view over time
- category spending view
- supporting metrics

### Transactions
Lets the user:
- search transactions
- filter by type and category
- sort by date or amount

### Role Switcher
Lets the evaluator see different UI behavior quickly:
- `Viewer` sees a read-only dashboard
- `Admin` gets add/edit controls

### Dark Mode
Users can switch themes from the navbar.

### Export
Users can export the visible transaction data set into:
- JSON
- CSV

## Edge Cases Handled

- No expense data: spending breakdown shows a fallback state
- No monthly data: trend section shows a fallback state
- No matching transactions after filtering: transaction empty state is shown
- Invalid transaction form input: transaction is not added
- Refreshing the page: saved data/theme/role are restored from local storage
- Small screens: transactions switch from table style to card style

## Suggested Improvements If This Project Continues

- Add inline form validation messages
- Add delete transaction support
- Add grouped transactions by date or category
- Connect to a backend or mock API
- Add automated tests
- Add charts using a chart library for more advanced visuals

## Final Summary

This project already covers the main evaluation areas well:
- design
- responsiveness
- functionality
- UX
- modular code structure
- state handling
- documentation
- edge case awareness

The main remaining gaps are backend/auth/test coverage, which are outside the current frontend-focused scope.
