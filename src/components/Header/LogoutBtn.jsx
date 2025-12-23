import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
 import { useNavigate } from 'react-router-dom'


function LogoutBtn() {
  const navigate=useNavigate()
   const dispatch=useDispatch()
   const logoutHandler=()=>{
    authServices.logout().then(()=>{
      dispatch(logout())
      navigate('/')

    })
   }
  return (
   <button className='inline-block px-6 py-2 duration-200 hover:bg-red-200 bg-red-500 rounded-full hover:cursor-pointer' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn