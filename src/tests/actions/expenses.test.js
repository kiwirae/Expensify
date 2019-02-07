import { addExpense, removeExpense, editExpense } from '../../actions/expenses'
import moment from 'moment'

test(
  'Should return an action object to add an expense.',
  () => {
    const expenseData = {
      description: 'Description test',
      note: 'Note test',
      amount: '500',
      createdAt: moment().valueOf()
    }

    const result = addExpense(expenseData)

    expect(result).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseData,
        id: expect.any(String)
      }
    })
  })

test(
  'Should return an add expense object with default values',
  () => {
    const result = addExpense()

    expect(result).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
        id: expect.any(String)
      }
    })
  })

test(
  'Should return an action object to remove expense.',
  () => {
    const result = removeExpense('123abc')
    expect(result).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
    })
  })

test(
  'Should return an action object to edit expense.',
  () => {
    const result = editExpense('123abc', {
      description: 'Description edit test',
      note: 'Note edit test',
      amount: '250 edit test'
    })
    expect(result).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: {
        description: 'Description edit test',
        note: 'Note edit test',
        amount: '250 edit test'
      }
    })
  })

