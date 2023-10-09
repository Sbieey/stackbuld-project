'use client'
import {FC} from 'react';

import {SubmitHandler, useForm } from 'react-hook-form';
import { FormInputPost } from '../types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../../firebaseConfig'
import Link from 'next/link';

interface FormPostProps{
   submit: SubmitHandler<FormInputPost>
   isEditing: boolean;
   initialValue?: FormInputPost;
   isLoadingSubmit: boolean
}

interface Author{
  id: string,
  name: string
}

const FormPost: FC<FormPostProps> = ({  submit, isEditing, initialValue, isLoadingSubmit}) => {
  const {register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  const {data: dataAuthors, isLoading: isLoadingPosts} = useQuery<Author[]>({
    queryKey: ['author'],
    queryFn: async () => {
      const response = await axios.get('/api/authors/')
      return response.data
    }
  })
  console.log(dataAuthors)

  // const submit = (data:any) => console.log(data)
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
      <input {...register("title", {required: true})} type="text" placeholder="Title..." className="input input-bordered w-full max-w-lg" />
      <textarea {...register("content" , {required: true})} className="textarea textarea-bordered w-full max-w-lg" placeholder="Content.."></textarea>
      
      {isLoadingPosts ? 'Loading...' 
      :(
      <select
      {...register('author', {required: true})}
      className='select select-bordered w-full max-w-lg'
      defaultValue={''}
      >
        <option disabled value={''}>
          Select users
        </option>
        {dataAuthors?.map(item => (
          <option key={item.id} value={item.name}>{item.name}</option>
        ))}
      </select>)}

      {/* <input {...register("author", {required: true})} type="text" placeholder="Author name" className="input input-bordered w-full max-w-lg" /> */}
      <button type='submit' className='btn btn-primary w-full max-w-lg'>
        {isLoadingSubmit && <span className='loading loading-spinner'></span>}
        {}
        {isEditing ? ( isLoadingSubmit ? 'Updating post...': 'Update'): ( isLoadingSubmit ? 'Creating post....': 'Create post')}
        </button>
    </form>
  )
}

export default FormPost