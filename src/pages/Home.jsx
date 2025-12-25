import React ,{useState,useEffect}from 'react'
import appwriteServices from '../appwrite/config'
import { Postcard,Container } from '../components/index'
import { useSelector } from 'react-redux'
function Home() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  // console.log(userData);
  
    const [name,setName]=useState("")
    const [posts,setPosts]=useState([])
useEffect(()=>{
  if(userData){
    setName(userData.name)
  }

},[userData])
// console.log(userData);
  
    useEffect(()=>{
 
        appwriteServices.getPosts().then((posts)=>{
           if(posts){
             setPosts(posts.documents)
           }
        })
    },[])
  if(posts.length>0 && authStatus===true){
    return(
        <div className='w-full'>
        <Container>
           <h1 className='h-20 w-full lg:text-7xl sm:text-5xl text-3xl text-green-600 bg-green-200 '>Welcome {name}!!</h1>
            {
                posts.map((post)=>(
                    <div key={post.$id}>
                        {/* <Postcard post={post}/> */}
                        <Postcard {...post}/>
                    </div>
                ))
            }
        </Container>
     </div>
    )
     
  }else{
    posts.length=0;
if(authStatus){
  return(
    <Container className={`w-full`}>
      {/* userData?.name --> in first rendre name is undefined so we use this */}
       <h1 className='h-20 w-full lg:text-7xl sm:text-5xl text-3xl text-blue-600 bg-green-200 '>Sorry {userData?.name}!!</h1>
        <h1 className='h-20 w-full lg:text-7xl sm:text-5xl text-3xl text-red-500 bg-green-200 '>No Posts Available !!</h1>
     </Container>
  )
}
else{
  return(
    <Container className={`w-full`}>
        <h1 className='h-20 w-full lg:text-7xl sm:text-5xl text-3xl text-red-500 bg-green-200 '>Login To See Post !!</h1>
     </Container>
  )
}

  
    
  }
}

export default Home
