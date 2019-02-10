import expensesTotal from '../../selectors/expensesTotal'
import expenses from '../fixtures/expenses'

test('Should return 0 if the array is empty.', () => {
    const result = expensesTotal()
    expect(result).toBe(0)
})

test('Should return amount of a single item in an array.', () => {
    const result = expensesTotal([expenses[0]])
    expect(result).toBe(expenses[0].amount)
})

test('Should return total amount of an array.', () => {
    const result = expensesTotal(expenses)
    expect(result).toBe(5.1)
})