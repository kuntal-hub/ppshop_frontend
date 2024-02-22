import React from 'react'
import "../cssFiles/utils.css";

export default function MainContainer({children}) {
  return (
    <div className='mainContainer'>
        {children}
    </div>
  )
}
