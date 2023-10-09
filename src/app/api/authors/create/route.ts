import { NextResponse } from "next/server";

import {db} from '@/app/firebaseConfig'

import { collection, addDoc} from "firebase/firestore";
const createColection = collection(db, 'authors')
 
 export async function POST(req: Request) {
    try {
        const body = await req.json()
        const post = await addDoc(createColection, {
            name: body.name 
        })

        return NextResponse.json(post, {status: 200})
    } catch (error) {
          return NextResponse.json({message: 'could not create post'}, {status: 500})
    }
}