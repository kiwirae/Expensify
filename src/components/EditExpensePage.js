import React from 'react'

export default (props) => {
  console.log(props)
  return (
    <div>
      This is from {props.match.params.id}
    </div>
  )
}