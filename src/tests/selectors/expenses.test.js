import selectExpenses from '../../selectors/expenses'
import moment from 'moment'
import expenses from '../fixtures/expenses'

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: 0,
        endDate: 0
    }
    const result = selectExpenses(expenses, filters)

    expect(result).toEqual([expenses[2], expenses[1], expenses[0]])
})

test('Should sort by Amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: 0,
        endDate: 0
    }
    const result = selectExpenses(expenses, filters)

    expect(result).toEqual([expenses[2], expenses[1], expenses[0]])
})

test('Should filter by text', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: 0,
        endDate: 0
    }
    const result = selectExpenses(expenses, filters)

    expect(result).toEqual([expenses[2], expenses[0]])
})

test('Should filter by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment([2019, 1, 1]),
        endDate: moment([2019, 1, 28])
    }
    const result = selectExpenses(expenses, filters)

    expect(result).toEqual([expenses[2], expenses[1]])
})