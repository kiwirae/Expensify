import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper

beforeEach(() => {
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            filters={filters}
        />
    )
})

test('Should render ExpenseListFilters component.', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters component with data.', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('Should handle setTextFilter.', () => {
    const value = 'foo'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should handle sortByDate.', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('Should handle sortByAmount.', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes.', () => {
    const startDate = moment([2019, 0, 2])
    const endDate = moment([2019, 0, 7])
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('Should handle date focus change.', () => {
    const calendarFocused = 'startDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})