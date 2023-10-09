'use client'
import {FC} from 'react';

import {SubmitHandler, useForm } from 'react-hook-form';
import { AuthorInput } from '../types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebaseConfig'
import Link from 'next/link';

interface FormAuthorProps{
   submit: SubmitHandler<AuthorInput>
   isLoadingSubmit: boolean
}

interface Author{
  id: string,
  name: string
}

const FormAuthor:FC<FormAuthorProps> = ({submit, isLoadingSubmit}) => {
    const {register, handleSubmit } = useForm<AuthorInput>()
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
      <input {...register("name", {required: true})} type="text" placeholder="Author Name..." className="input input-bordered w-full max-w-lg" />
      <button type='submit' className='btn btn-primary w-full max-w-lg'>
        {isLoadingSubmit && <span className='loading loading-spinner'></span>}
        {}
        {( isLoadingSubmit ? 'Creating Author....': 'Create Author')}
        </button>
    </form>
  )
}

export default FormAuthor