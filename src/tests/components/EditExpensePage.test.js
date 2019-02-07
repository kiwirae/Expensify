import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
            expense={expenses[0]}
        />
    )
})

test('Should render Edit expense page.', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')({ note: 'New edit' })
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, { note: 'New edit' })
})

test('Should handle removeExpense', () => {
    wrapper.find('button').simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id)
})