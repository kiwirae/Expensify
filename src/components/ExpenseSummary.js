import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import expensesTotal from '../selectors/expensesTotal'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedTotal = numeral(expensesTotal).format('$0,0.00')
  return (
    <div className="page-header">
      <div className="content-container">
        {
          expenseCount === 0 ? (
            <h1 className="page-header__title">No expenses to view</h1>
          ) : (
              <h1 className="page-header__title">
                Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedTotal}</span>
              </h1>
            )
        }
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpenseSummary)