import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import authServices from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import Loading from './components/Loading'
import RTE from './components/RTE'

function App() {
const [loading,setLoading]=useState(true)
const dispatch=useDispatch()

useEffect(()=>{
  authServices.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    
    }
    else{
      dispatch(logout())
    }
  }).finally(()=>setLoading(false))
},[])


  if(loading){
    return(
      <div className=' flex justify-center items-center h-screen w-screen bg-blue-300'>
        <h1>Loading</h1>
        <Loading/>
      </div>
    )
  }else{
    return(
      <div className=' flex flex-wrap content-between bg-cyan-700 min-w-screen min-h-screen [&::-webkit-scrollbar]:w-0'>
        <div className='w-full block'>
          <Header/>
          <main>
          <Outlet/>
          </main>
          <Footer/>
          {/* <RTE name={`bhala`}/> */}
        </div>
      </div>
    )
  }
}

export default App
