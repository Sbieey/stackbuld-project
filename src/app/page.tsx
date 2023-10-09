import { db } from '../../firebaseConfig'
import { getDocs, collection } from "firebase/firestore";
import SearchInput from './components/SearchInput';
// import { useState } from 'react';

const postCollectionRef = collection(db, 'posts')


 export async function getPosts(){
  const response = await getDocs(postCollectionRef)
    const filterPosts = response.docs.map((doc) => ({...doc.data(), id: doc.id}))

    return filterPosts
}

// function useState(initValue:any){
//   let _val = initValue
//   const state = ()=>_val
//   const setState = (newVal:any) => {
//     _val = newVal
//   }

//   return [state, setState]
// }

export default async function Home() {

const posts = await getPosts()


// console.log(posts)

  return (
    <div> 
    <SearchInput  />
    </div>
   
  )
}