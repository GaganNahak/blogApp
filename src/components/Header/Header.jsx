 import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData=useSelector((state)=>state.auth.userData)
  const navigate = useNavigate()
console.log(authStatus);
// console.log(userData);


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
// const clicked=(item,page)=>{
//   navigate(item)
 

// }
  return (
    <header className='py-2 sticky top-0 z-5 w-full bg-cyan-700 shadow-2xl'>
      <Container>
        <nav className='flex'>
          <div className='mr-2 absolute'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto bg-amber-100 rounded-full pt-1 pb-1 pl-2.5 pr-2.5 px-1'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                // onClick={()=>clicked(item.slug,item.inpage)}
                className={`inline-bock px-6 py-2 duration-200 text-cyan-400 font-bold hover:bg-cyan-700 hover:text-slate-100 hover:cursor-pointer rounded-full  ${item.inpage?"bg-green-300":null}`}
               
                >{item.name}</button>
              </li>
            ) : null
            )}


            {authStatus && 
              <li>
                <LogoutBtn />
              </li>
              
                
                
              
              
          }
          </ul>
        </nav>
        </Container>
    </header>
  )
  
}

export default Header


