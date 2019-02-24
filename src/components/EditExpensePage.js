import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (updates) => {
    this.props.editExpense(this.props.expense.id, updates)
    this.props.history.push('/')
  }
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id)
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        This is from {this.props.expense.id}
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(({ id }) => id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)