import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'


export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }
  onTextChange = (event) => {
    this.props.setTextFilter(event.target.value)
  }
  onSortChange = (event) => {
    if (event.target.value === 'date') {
      this.props.sortByDate()
    } else if (event.target.value === 'amount') {
      this.props.sortByAmount()
    }
  }
  render() {
    return (
      <div>
        <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
        <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
          <option value='date'>Sort by Date</option>
          <option value='amount'>Sort by Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.props.filters.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ filters }) => ({
  filters
})

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)