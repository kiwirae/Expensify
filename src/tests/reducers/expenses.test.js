import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('Should test default state.', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })

    expect(state).toEqual([])
})

test('Should add an expense object in array.', () => {
    const expense = {
        id: '4',
        description: 'Pineapple',
        note: '',
        amount: 2.75,
        createdAt: moment([2019, 1, 2])
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)

    expect(state).toEqual([...expenses, expense])
})

test('Should not remove an expense if no id match', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)

    expect(state).toEqual(expenses) 
})

test('Should remove an expense.', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should edit and expense.', () => {
    const updates = {
        note: 'test edit case'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates
    }
    const state = expensesReducer(expenses, action)

    expect(state[0].note).toBe(updates.note)
})

test('Should not edit an expense when no id found', () => {
    const updates = {
        note: 'test edit case'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    }
    const state = expensesReducer(expenses, action)

    expect(state).toEqual(expenses) 
})