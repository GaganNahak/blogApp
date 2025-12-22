import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function Postcard({$id,title,featuredimage}) {
  
  return (
    <Link to={`post/${$id}`} className='m-5'>
        <div className='w-full flex items-center flex-col justify-center  bg-gray-100 rounded-xl p-4 '>
            <div className='w-full flex items-center justify-center mb-4 h-50 rounded-2xl  overflow-hidden object-contain'>
             { 
            //  console.log(featuredimage)
           

             }
              
                <img  height={200}  width={200} src={appwriteService.getFilePreview(featuredimage)} alt="" className='rounded-xl ' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>

  )
}

export default Postcard
