import React from 'react'
import { connect } from 'react-redux'
import expensesTotal from '../selectors/expensesTotal'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const formattedTotal = numeral(expensesTotal).format('$0,0.00')
    return (
        <div>
            {
                expenseCount === 0 ? <p>No expenses to view</p>
                    : <p>Viewing {expenseCount} {expenseWord} totalling {formattedTotal}</p>
            }
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