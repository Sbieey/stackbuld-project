'use client'

import React, {FC, useState}from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import { SearchInput } from '../types'
import { useQuery } from '@tanstack/react-query'
import useDebounce  from '../hooks/useDebounce'
import { getPosts } from '../page'
import Postcard from './PostCard'
import { useParams } from 'next/navigation'
import { sliceStartAtom, sliceEndAtom, currentPageAtom } from '../../app/store/atom'
import { useAtom } from 'jotai'

const SearchInput =  () => {

  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom)
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

 // the number that is added to the states specifies how many posts are displayed per page
  const handleNextPage = () => {
    setCurrentSliceStart(currentSliceStart + 4)
    setCurrentSliceEnd(currentSliceEnd + 4)
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
      setCurrentSliceStart(currentSliceStart - 4)
      setCurrentSliceEnd(currentSliceEnd - 4)
      setCurrentPage(currentPage - 1)
  }

    const [search, setSearch] = useState('')

    // const []


    const debouncedSearchTerm = useDebounce(search, 200)  
    let {data:searchPost, isLoading:isloadingSearch, error} = useQuery({
        queryKey: ['search', debouncedSearchTerm], 
        
        queryFn: async () => {
          const posts:any = await getPosts()
            if(debouncedSearchTerm){
                searchPost = await posts.filter((post:any) => {
                if(debouncedSearchTerm != ''){
                  return String(post.title).toLowerCase().includes(debouncedSearchTerm)
                }
              })
              console.log(searchPost)
            }

            // return posts
            return debouncedSearchTerm ? searchPost : posts


        }
        
    })
    // console.log(post)
  return (
    // <div><div className="flex-none">
    <>

    <div className="form-control">
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="input input-bordered w-full md:w-auto" />
    </div>
    <br />
    <div className="join grid grid-cols-3">
    {currentSliceEnd >= 6 ? <button onClick={handlePrevPage} className="join-item btn btn-outline">Previous Page</button> : <button className="join-item btn btn-outline">Thats the end</button>}
    <span className='join-item btn btn-outline'>{currentPage}</span>
    {currentSliceEnd < String(searchPost).length && <button onClick={handleNextPage} className="join-item btn btn-outline">Next Page</button>}
      
    </div>
  
    <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
    {isloadingSearch && <span className='text-center loading loading-spinner'>Loading</span>}
      {isloadingSearch ? 'Loading...' : (
        searchPost.slice(currentSliceStart, currentSliceEnd)?.map((post:any) => (
        //@ts-ignore
        <Postcard key={post.id} post={post} />
      ))
      )}
      
      </main>
    
    </>
    
  )
}

export default SearchInput