'use client'

import React from 'react'
import {SubmitHandler, useForm } from 'react-hook-form';
import BackButton from '../components/BackButton';
import { AuthorInput } from '../types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormAuthor from '../components/FormAuthor';

export const CreateAuthor = () => {
    const router = useRouter()

    const handleCreate = (data:any) =>{
        createAuthor(data)
    }

      const {mutate: createAuthor, isLoading: isLoadingSubmit} = useMutation({
        mutationFn: (newPost:AuthorInput) => {
          return axios.post('api/authors/create', newPost)
        },
        onError: (error) => {
          console.error(error)
        },
        onSuccess: () => {
          router.push('/')
          router.refresh()
        }
      })
  return (
    <div>
        <h1 className='text-2xl my-4 font-bold text-center'>Add new Author</h1>
        <BackButton />
        <FormAuthor isLoadingSubmit={isLoadingSubmit} submit={handleCreate} />
    </div>
  )
}

export default CreateAuthor