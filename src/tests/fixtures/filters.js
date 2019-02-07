import moment from 'moment'

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(2019, 0, 1),
    endDate: moment([2019, 1, 1])
}

export { filters, altFilters }