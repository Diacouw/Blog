import React from 'react'
import SkletonElement from './SkletonElement'
import Shimmer from './Shimmer'

export default function SkletonPost() {
  return (
    <div className='skleton-wrapper'>
        <div className="skleton-post">
            <SkletonElement type='img'/>
            <SkletonElement type='title'/>
            <SkletonElement type='button'/>
        </div>
        <Shimmer/>
    </div>
  )
}
