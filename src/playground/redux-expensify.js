import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'
import moment from 'moment'

// ADD_EXPENSE

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    createdAt: moment().unix(),
    description,
    note,
    amount
  }
})

// REMOVE_EXPENSE

const removeExpense = (id = '') => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_DATE

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

// Get Visible Expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    const startDateMatch = expense.createdAt >= startDate
    const endDateMatch = expense.createdAt <= endDate
    return textMatch && startDateMatch && endDateMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? -1 : a.amount < b.amount ? 1 : 0
    }
  })
}

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment([2019, 0, 25]).unix(),
  endDate: moment([2019, 0, 27]).unix()
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET__DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET__DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const itemOne = store.dispatch(addExpense({
  description: 'Item 1',
  note: 'Item I bought today',
  amount: 4
}))

const itemTwo = store.dispatch(addExpense({
  description: 'Item 2',
  note: 'Item I bought yesterday',
  amount: 2
}))


console.log(itemOne)

store.dispatch(editExpense(itemTwo.expense.id, { description: 'Updated expense description' }))
// store.dispatch(setTextFilter('updated'))

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

const yesterday = moment([2019, 0, 25]).unix()
const now = moment().unix()
console.log(yesterday)
console.log(now)

const customDate1 = moment([2019, 0, 1])
console.log(customDate1)

const customDate2 = moment('12-25-2018')
console.log(customDate2)