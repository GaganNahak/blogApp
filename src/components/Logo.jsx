import React from 'react'

function Logo({className}) {
  return (
    <div className={`text-white underline ${className}`}>
      <i><b>BlogApp</b></i>
    </div>
  )
}

export default Logo
