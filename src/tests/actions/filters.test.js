import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters'
import moment from 'moment'

test('Should return an action object to set text filter default value.', () => {
  const result = setTextFilter()

  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})

test('Should return an action object to set text filter.', () => {
  const result = setTextFilter('foo')

  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'foo'
  })
})

test('Should return an action object to sort by date.', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
})

test('Should return an action object to sort by amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
})

test('Should return an action object to set start date filter', () => {
  const result = setStartDate(moment().startOf('month').valueOf())

  expect(result).toEqual({
    type: 'SET_START_DATE',
    startDate: moment().startOf('month').valueOf()
  })
})

test('Should return an action object to set end date filter', () => {
  const result = setEndDate(moment().endOf('month').valueOf())

  expect(result).toEqual({
    type: 'SET_END_DATE',
    endDate: moment().endOf('month').valueOf()
  })
})