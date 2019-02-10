import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount).format('$0,0.00')}
      -
      {moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
    </p>
  </div>
)

export default ExpenseListItem