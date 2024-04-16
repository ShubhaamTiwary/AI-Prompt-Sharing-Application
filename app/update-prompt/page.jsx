'use client'
import { useEffect, useState } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const searchParams=useSearchParams();
  const propmptId=searchParams.get('id');

  const [submitting, setSubmitting] = useState(false)
  const [post,setPost]  = useState({
    prompt: '',
    tag:'',
  })
  useEffect(() => {
    const getPromptDetails = async () => {
    console.log(propmptId);
      const response = await fetch(`/api/prompt/${propmptId}`);
      const data = await response.json();
      setPost(data);
    };
    if(propmptId) getPromptDetails();
  }, [propmptId]);
  const updatePrompt= async(e)=>{
    e.preventDefault()
    setSubmitting(true)

    if(!propmptId) return alert('Prompt ID is required')
    try{
      const res = await fetch(`/api/prompt/${propmptId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if(res.ok) {
        router.push("/");
      }  
    }catch(e){
      throw Error(e.message)
    }
    finally{
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt