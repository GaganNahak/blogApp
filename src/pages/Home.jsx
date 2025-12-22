import React ,{useState,useEffect}from 'react'
import appwriteServices from '../appwrite/config'
import { Postcard,Container } from '../components/index'

function Home() {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        appwriteServices.getPost().then((posts)=>{
           if(posts){
             setPosts(posts.documents)
           }
        })
    })
  if(posts.length>0){
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
  }else{
    <Container>
        <div>Login To See Post</div>
     </Container>
  }
}

export default Home
