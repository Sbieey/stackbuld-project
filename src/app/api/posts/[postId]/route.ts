import firebase from "firebase/compat/app";
import { NextResponse } from "next/server";

import {app, db} from '../../../../../firebaseConfig'
// import {collection, query, orderBy, onSnapshot} from "firebase/firestore"

import { doc,deleteDoc, setDoc, getDoc} from "firebase/firestore";


 interface contextProps{
    params: {
        postId: string
    }
 }

 export async function DELETE(req: Request, context: contextProps) {
    try {
        const {params} = context

        const deletePost = doc(db, 'posts', params.postId)
        await deleteDoc(deletePost)
        // const filterPosts = post.docs.map((doc) => ({...doc.data(), id: doc.id}))
        // const post = posts.onSnapshot(doc => doc.data)
        return new Response(null, {status: 204})
    } catch (error) {
          return NextResponse.json({message: 'could not delete post'}, {status: 500})
    }
}

export async function PATCH(req: Request, context: contextProps) {
    try {
        const {params} = context

        const body = await  req.json();

        const postToEdit = doc(db, 'posts', params.postId)
        const data = {
            title: body.title,
            content: body.content,
            author: body.author

        }
         await setDoc(postToEdit, data)
        // const filterPosts = post.docs.map((doc) => ({...doc.data(), id: doc.id}))
        // const post = posts.onSnapshot(doc => doc.data)
        return NextResponse.json({message: 'update success'},{status: 200})
    } catch (error) {
          return NextResponse.json({message: 'could not update post'}, {status: 500})
    }
}

export async function GET(req: Request, context: contextProps){
    try {
        const {params} = context
        const docToget = doc(db, "posts", params.postId)
        const response = await getDoc(docToget)

        const post = response.data()


        return NextResponse.json({post}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'could not update post'}, {status: 500})
    }
   
    // const response = await getDoc(postCollectionRef)
      // const filterPosts = response.docs.map((doc) => ({...doc.data(), id: doc.id}))

  }
  