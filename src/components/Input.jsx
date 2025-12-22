import React,{useId} from 'react'


// it is the syntax of forwardref (A parent component can acces Input.jsx's element by forwaref)
const Input=React.forwardRef(function Input({ label,type='text',className='',...props},ref){    
    const id=useId()
    return (// && = if lable exist then label element will created
        <div className='w-full flex p-1  bg-white mb-2  rounded-lg'> 
         <input type={type} className={`peer  px-3 py-2 rounded-lg bg-white text-white outline-none valid:bg-slate-500 focus:bg-slate-500
                duration-200  w-full ${className}`} ref={ref} {...props} id={id}/>
            {label && <label htmlFor={id} className=' hover:cursor-text peer-focus:text-black p-1 rounded-lg h-auto absolute text-slate-400 w=[20px] transform translate-x-5  translate-y-2 translate-all duration-200 peer-focus:scale-80  peer-valid:scale-70 peer-focus:-translate-y-3 bg-white peer-valid:-translate-y-3'>    
                {label}
                </label>}  
                  
        </div>
    )
})

export default Input
