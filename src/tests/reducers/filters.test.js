import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('Should setup default values.', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should filter by text.', () => {
    const text = 'foo'
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action)

    expect(state.text).toBe('foo')
})

test('Should sort by date.', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }

    const action = {
        type: 'SORT_BY_DATE'
    }

    const state = filtersReducer(currentState, action)

    expect(state.sortBy).toBe('date')
})

test('Should sort by amount.', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })

    expect(state.sortBy).toBe('amount')
})

test('Should setup start date filter.', () => {
    const startDate = moment([2019, 0, 2])

    const action = {
        type: 'SET_START_DATE',
        startDate
    }
    const state = filtersReducer(undefined, action)

    expect(state.startDate).toEqual(startDate)
})

test('Should setup end date filter.', () => {
    const endDate = moment([2019, 0, 7])

    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filtersReducer(undefined, action)

    expect(state.endDate).toEqual(moment(endDate))
})