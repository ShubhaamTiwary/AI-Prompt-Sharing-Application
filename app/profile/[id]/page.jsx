'use client'
import { useState,useEffect } from "react";
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { set } from "mongoose";

const OthersProfile = ({params}) => {
    const { data: session } = useSession();
    const Id=params.id;
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [posts,setPosts]=useState([]);
    const router = useRouter();
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${Id}/posts`);
        const data = await response.json();
        setPosts(data);
    };
    
    useEffect(() => {
     if(Id) fetchPosts();
    }, []);
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    };
  
    const handleDelete = async (post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
          
          // client side changes 
          const filteredPosts = posts.filter((item) => item._id !== post._id);
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };
  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s profile page. Here you can see all the posts from ${userName}.` }
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default OthersProfile