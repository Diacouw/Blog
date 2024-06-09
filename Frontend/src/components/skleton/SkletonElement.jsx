import React from 'react'
import './Skleton.css'

export default function SkletonElement({type}) {

  const classes =`skleton ${type}`

  return (
    <div className={classes}>
      
    </div>
  )
}
