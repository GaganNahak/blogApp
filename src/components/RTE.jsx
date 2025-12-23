import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
 export default function RTE({name,control,label,defaultValue=""}) {
  return (
    <div className='w-full'>
     {
      label&& <label className='inline-block mb-1 pl-1'>{label}</label>
     }
{//The <Controller/> acts as a bridge to integrate these third-party (Editor) components seamlessly into React Hook Form's validation and state management system. 
     }
     <Controller 
     name={name || 'content'}
     control={control}
     render={({field:{onChange}})=>{

      return(
<Editor
      apiKey='dfdb9rf3wpe9hre1jokd3h1bprkgnojuywv1bijxtbonz6p1'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            width:300,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
      )

      
     }
    }
     />
    </div>
  )
}


