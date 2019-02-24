import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let startAddExpense, history, wrapper

beforeEach(() => {
    startAddExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />)
})

test('Should render expense form correctly.', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should handle on submit.', () => {
    const expense = {
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    }
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddExpense).toHaveBeenLastCalledWith(expense)
})