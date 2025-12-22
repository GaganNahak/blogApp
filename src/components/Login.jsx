import React ,{useState} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import {login as authLogin, login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authServices from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
function Login() {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {register,handleSubmit}=useForm()
  const [error,setError]=useState("")
const login1=async(data)=>{
  console.log(data);
  
  setError("")
  try {
    const session=await authServices.login(data)
    if(session){
      console.log(session);
      
      const userData=await authServices.getCurrentUser()
      // console.log(userData);
      
      if(userData) 
      {
        dispatch(login(userData))
        
      }
        navigate("/")
    }
  } catch (error) {
    setError(error.message)
  }
}

  return (
    <div id='div-form' className='h-100 w-80 items-center  shadow-[0px_0px_10px_rgb(252,250,250)]' >
      <div>
        
      </div>
      <div className='w-full'>
        <Logo/>
      </div>
      
      {error?<p>{error}</p>:null}
      <div className='text-white text-3xl m-2 mb-3 underline'>
        <span>Login</span>
      </div>
      <form onSubmit={handleSubmit(login1)} className=''>
        <Input  label="Email" type="email" required {...register("email")} />
        <Input  label="Password" type="password" required {...register("password")} />
        <Button type='submit' children="Login" className='w-full hover:cursor-pointer hover:bg-blue-400'/>
      </form>
      <div className='w-full m-5  -translate-x-6'>
          <Link to={"/signup"} ><span className='text-white underline'>Don't have account?</span></Link>
      </div>
    </div>
  )
}

export default Login
