import React ,{useId} from 'react'

function Select({
    label,
    options,
    className="",
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id}>{label}</label>}
      <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 
                duration-200 border border-gray-200 w-full ${className}`}>
                  {
                    options?.map((option)=>(   // if direct pass map on optoins if there is no value in options thene app will crash so here we put condition
                      <option key={ option} value={option}>
                        {option}
                      </option>
                    ))
                  }
      </select>
    </div>
  )
}

export default React.forwardRef( Select ) //another way of forwardRef another avialable in Input.jsx
