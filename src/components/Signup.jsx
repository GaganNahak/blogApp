
import React ,{useState} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authServices from '../appwrite/auth'
import {useForm} from 'react-hook-form'



function Signup() {
    const navigate=useNavigate()
      const dispatch=useDispatch()
      const {register,handleSubmit}=useForm()
      const [error,setError]=useState("")

const create=async(data)=>{
        setError("")
        try {
            const session=  await authServices.createAccount(data)
            if(session){
              // const userData= await authServices.login(data)
              if(data) dispatch(authLogin(data))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
      

}
  return (
    <div id='div-form' className='h-100 w-80 items-center shadow-[0px_0px_10px_rgb(22,20,25)]' >
      <div className='w-full'>
        <Logo/>
      </div>
      <div className='text-white text-3xl m-2 mb-3 underline'>
        <span>Signup</span>
      </div>
      
      {error&& <p>
        {error}
        </p>}
      <form onSubmit={handleSubmit(create)} className=''>
        <Input  label="Email" type="email" required {...register("email")} />
        <Input  label="Password" type="password" required {...register("password")} />
        <Button type='submit' children="Submit" className='w-full bg-green-500 hover:cursor-pointer hover:bg-green-300 hover:text-slate-400'/>
      </form>
      <div className='w-full m-5  -translate-x-6'>
          <Link to={"/login"} ><span className='text-white underline'>Already have account?</span></Link>
      </div>
    </div>
  )
}

export default Signup
