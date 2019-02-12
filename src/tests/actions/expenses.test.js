import configureMockStore from 'redux-mock-store'
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database.ref('expenses').set(expensesData).then(() => done())
})

test('Should return an action object to add an expense.', () => {
  const result = addExpense(expenses[0])

  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  })
})

test('Should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Keyboard',
    amount: 9,
    note: 'New keyboard',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: actions[0].expense.id,
        ...expenseData
      }
    })
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: actions[0].expense.id,
        ...expenseData
      }
    })
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('Should return an action object to remove expense.', () => {
  const result = removeExpense('123abc')
  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('Should return an action object to edit expense.', () => {
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

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('Should fetch the data from firebase.', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})

test('Should remove expense from store and firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startRemoveExpense('3')).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '3'
    })
    return database.ref('expenses/3').once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done()
  })
})