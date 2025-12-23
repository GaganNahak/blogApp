import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'


function sideBar() {
    const authStatus = useSelector((state) => state.auth.status)
  const userData=useSelector((state)=>state.auth.userData)
     const navigate = useNavigate()
     const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      inpage:false
    }, 
    //  {
    //   name: 'Home',
    //   slug: "/home",
    //   active: true,
    //   inpage:false
    // },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      inpage:false
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
       inpage:false
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
       inpage:false
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
       inpage:false
  },
  ]
  return (
    <div className='w-40 h-20 flex flex-col items-center justify-center  relative top-1 z-3'>

        <ul className='w-40 h-20 flex flex-col items-center justify-center'>
            {

        navItems.map((item)=>
            item.active?(
                <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}
                         className={`inline-bock px-6 py-2 duration-200 text-cyan-400 font-bold hover:bg-cyan-700 hover:text-slate-100 hover:cursor-pointer rounded-full  ${item.inpage?"bg-green-300":null}`}
                        >{item.name}</button>
                </li>
            ):null
        )

     }
        </ul>
     
    </div>
  )
}

export default sideBar
