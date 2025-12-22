//

// here we bulit a common button and can import anywhere 
import React from 'react'

function Button(
   { children="",
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white', //by these values we can style this button according to differnre imported place 
    className='',
    ...props} //there may be more property can be inserted, so here we spreaded the props and if we want to insertany property it can done ex : padding ='py-3'
) {
  return (
   <button children={children} className={`px-4 py-2  rounded-lg ${bgColor} ${textColor} ${className}` } {...props}>{children}</button>
  )
}

export default Button
