'use client'
import { useState,useEffect } from "react";
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { set } from "mongoose";

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts,setPosts]=useState([]);
    const router = useRouter();
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
    };
    
    useEffect(() => {
     if(session?.user.id) fetchPosts();
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
        name="My"
        desc="Welcome to your profile page. Here you can view your posts and edit your profile."    
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile