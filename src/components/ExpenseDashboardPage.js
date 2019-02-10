import React from 'react'
import ConnectedExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseSummary from './ExpenseSummary'

export default () => (
  <div>
    <p>This is from my dashboard component</p>
    <ExpenseSummary />
    <ExpenseListFilters />
    <ConnectedExpenseList />
  </div>
)