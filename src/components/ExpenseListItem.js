import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'


const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>{amount.toFixed(2)}-{moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>   
  </div>
)

export default ExpenseListItem