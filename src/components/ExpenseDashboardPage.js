import React from 'react'
import ConnectedExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseSummary from './ExpenseSummary'

export default () => (
  <div>
    <ExpenseSummary />
    <ExpenseListFilters />
    <ConnectedExpenseList />
  </div>
)