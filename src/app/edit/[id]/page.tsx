"use client"

import FormPost from "@/app/components/FormPost"
import { FormInputPost } from "@/app/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SubmitHandler } from "react-hook-form"
import {FC} from "react"
import axios from "axios"
import BackButton from "@/app/components/BackButton"
import { useRouter } from "next/navigation"


interface EditPostPageProps{
  params: {
    id: string
  }
}

 const EditPostPage:FC<EditPostPageProps>= ({params}) => {

  const router = useRouter()

  const {id} = params;
  const {data: dataPost, isLoading: isLoadingPost} = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`)
      return response.data.post
    }
  })

  const {mutate: editPost, isLoading: isLoadingSubmit} = useMutation({
    mutationFn: (newPost:FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, newPost)
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    }
  })
  console.log(dataPost);

    const handleCreatePost:SubmitHandler<FormInputPost> = (data) =>{
        editPost(data)
    }

    if(isLoadingPost){
      return(
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )
    }
    
      return (
        <div>
          <BackButton />
            <h1 className='text-2xl my-4 font-bold text-center'>Edit Post</h1>  
            <FormPost isLoadingSubmit={isLoadingSubmit} submit={handleCreatePost} initialValue={dataPost} isEditing={true}/> 
        </div>
      )
}

export default EditPostPage