import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";

import {app, db} from '../../../firebaseConfig'
// import {collection, query, orderBy, onSnapshot} from "firebase/firestore"

import { getDocs, collection, addDoc} from "firebase/firestore";

export const database = getFirestore(app);

const createColection = collection(db, 'posts')
 
 export async function POST(req: Request) {
    try {
        const body = await req.json()
        const post = await addDoc(createColection, {
            title: body.title,
            content: body.content,
            author: body.author,
            createdAt: new Date().toDateString()
        })
        // const filterPosts = post.docs.map((doc) => ({...doc.data(), id: doc.id}))
        // const post = posts.onSnapshot(doc => doc.data)
        return NextResponse.json(post, {status: 200})
    } catch (error) {
          return NextResponse.json({message: 'could not create post'}, {status: 500})
    }
}