import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
     
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect( () => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                // console.log(slug);
                
              console.log(appwriteService.getFilePreview(post.featuredimage));
                if (post) {
                  setPost(post);
                  
                }
                
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 ">
            <Container className="bg-cyan-950 rounded-3xl p-2">
              
                      {isAuthor && (
                        <div className=" ">
                            <Link to={`/edit-post/post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
              
                <div className="w-full flex justify-center mb-4 relative border rounded-xl mt-3 p-2">
                 
                    <img
                   height={300}
                   width={300}
                         src={appwriteService.getFilePreview(post.featuredimage)}
                        
                        alt={post.title}
                        className="rounded-xl"
                        loading="lazy"
                    />

                  
                </div>
                
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                </div>
                <div className="browser-css text-white">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}