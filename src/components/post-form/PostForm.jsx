import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm ( { post } ) {
    //this control will be got <Editor> 's control prop 
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm( {
        defaultValues: {
            title: post?.tittle || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    } )

    const navigate = useNavigate()
    const userData = useSelector( state => state.auth.userData )
    console.log(userData);
    
    const submit = async ( data ) => {
        if ( post )
        { //if post is already available
            //by react hook form we can identfy uploaded imgs (array of image) by data.image  
            const file = data.image[ 0 ] ? await appwriteService.uploadFile( data.image[ 0 ] ) : null
            if ( file )
            {
                appwriteService.deleteFile( post.featuredimage ) //we call featuredImage in db
            }
            //now we need to update post
            const dbPost = await appwriteService.updatePost( post.$id, {
                ...data, //keep all data as it as
                featuredimage: file ? file.$id : undefined //we just need update files slug/id
            } )
            if ( dbPost )
            {
                navigate( `/post/${ dbPost.$id }` ) //link to post
            }
        }
        else
        { //if post is not available
            const file = data.image[ 0 ] ? await appwriteService.uploadFile( data.image[ 0 ] ) : alert( "image not uploaded" )
            if ( file )
            {
                const fileid = file.$id
                data.featuredimage = fileid
                const dbpost = await appwriteService.createPost( {
                    ...data,//spreaded data ,
                    userid: userData.$id
                } )
                if ( dbpost )
                {
                    navigate( `/post/${ dbpost.$id }` )
                }
            }
        }
    }
    // for transforming text 
    const slugTransform = useCallback( ( value ) => {
        if ( value && typeof ( value ) === 'string' )
        {
            return value.trim().toLowerCase().replace( /[^a-zA-Z\d]+/g, '-' ) //regular expre for converting a text into our desired format
        }
        return ""
    } )

    useEffect( () => {
        const sub = watch( ( value, { name } ) => {
            if ( name === 'title' )
            {
                setValue( 'slug', slugTransform( value.title, { shouldValidate: true } ) )
            }
        } )

        return () => {
            sub.unsubscribe() // for unnecessary re-render
        }
    }, [ watch, setValue, slugTransform ] )
    return (
        <form onSubmit={handleSubmit( submit )} className='w-full flex items-center flex-col gap-1 justify-center'>
            <div className='w-2/3'>
                <Input label="Title" placeholder='title' {...register( 'title', { required: true } )} />
                <Input label="Slug" placeholder='Slug' {...register( 'slug' )} onInput={( e ) => {
                    setValue( 'slug', slugTransform( e.currentTarget.value ) ), {
                        shouldValidate: true
                    }
                }} />
                {/* <RTE label="Content" name="content" control={control} defaultValue={getValues( 'content' )} /> */}
                <RTE  control={control} label="content" defaultValue={getValues('content')}/>
            </div>
            <div className='w-1/3'>
                <Input type='file' label="Featured Image" accept="image/png, image/jpg, image/jpeg, image/gif" {...register( 'image', { required: !post } )} /> 
                {/* //if post not avilable then it true */}
                {
                    post && (
                        <div>
                            <img src={appwriteService.getFilePreview( post.featuredimage )} alt={post.title} />
                        </div>
                    )
                }
            </div>
            <Button type='submit' children={post ? "Update" : "Submit"} bgColor={post ? "bg-green-600" : undefined} />
        </form>
    )
}

export default PostForm
