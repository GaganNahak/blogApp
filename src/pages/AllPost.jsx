import React ,{useState,useEffect}from 'react'
import appwriteServices from '../appwrite/config'
import { Postcard,Container } from '../components/index'

function AllPost() {
    const [posts,setPost]=useState([])
    useEffect(()=>{   appwriteServices.getPosts().then((post)=>{
        if (post){
            setPost(post.documents)
        }
})},[])
  
console.log(posts)
  return (
    <div className='w-full py-8 '>
      <Container>
        <div className='flex flex-wrap flex-col items-center justify-center'>
            {
              
              
                posts.map((post)=>(
                    <div key={post.$id} className=' w-full m-2'>
                        {/* <Postcard featuredimage={post.featuredimage}/>                   */}
                         <Postcard {...post} />
                     </div>
                ))
            }
        </div>
      </Container>
    </div>
  )
}

export default AllPost
