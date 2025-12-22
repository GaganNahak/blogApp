import React ,{useState,useEffect}from 'react'
import {Container,PostForm} from '../components/index'
import appwriteServices from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'


function EditPost() {
    const [post,setPost]=useState([])
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(post){
            appwriteServices.getPost().then((post)=>{
                setPost(post)
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
  return post?
    <div>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>:null
  
}

export default EditPost
