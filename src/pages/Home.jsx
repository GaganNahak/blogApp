import React ,{useState,useEffect}from 'react'
import appwriteServices from '../appwrite/config'
import { Postcard,Container } from '../components/index'
import { useSelector } from 'react-redux'
function Home() {
  const authStatus = useSelector((state) => state.auth.status)

    const [posts,setPosts]=useState([])

    useEffect(()=>{
 
        appwriteServices.getPosts().then((posts)=>{
           if(posts){
             setPosts(posts.documents)
           }
        })
    })
  if(posts.length>0 && authStatus===true){
    return(
        <div className='w-full'>
        <Container>
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
    posts.length=0
    return(
        <Container className={`w-full`}>
        <h1 className='h-20 w-full lg:text-7xl sm:text-5xl text-3xl text-red-500 bg-green-200 '>Login To See Post !!</h1>
     </Container>
    )
    
  }
}

export default Home
