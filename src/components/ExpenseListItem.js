import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__subtitle">{moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount).format('$0,0.00')}</h3>
  </Link>
)

export default ExpenseListItem