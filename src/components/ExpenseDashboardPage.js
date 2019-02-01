import React from 'react'
import ConnectedExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'

export default () => (
  <div>
    <p>This is from my dashboard component</p>
    <ExpenseListFilters />
    <ConnectedExpenseList />
  </div>
)