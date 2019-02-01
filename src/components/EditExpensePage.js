import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
  return (
    <div>
      This is from {props.match.params.id}
      <ExpenseForm
        expense={props.expense}
        onSubmit={(updates) => {
          console.log(updates)
          props.dispatch(editExpense(props.expense.id, updates))
          props.history.push('/')
        }}
      />
      <button onClick={() => {
        props.dispatch(removeExpense(props.expense.id))
        props.history.push('/')
      }}>Remove</button>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(({ id }) => id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage)