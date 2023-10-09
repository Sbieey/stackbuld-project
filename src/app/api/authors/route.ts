import { NextResponse } from "next/server";

import { db } from '@/app/firebaseConfig'

import { getDocs, collection } from "firebase/firestore";

const postCollectionRef = collection(db, 'authors')
 
 export async function GET() {
    try {
        const posts = await getDocs(postCollectionRef)
        const filterPosts = posts.docs.map((doc) => ({...doc.data(), id: doc.id}))
        // const post = posts.onSnapshot(doc => doc.data)
        return NextResponse.json(filterPosts, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'could not fetch author'}, {status: 500})
    }
 }