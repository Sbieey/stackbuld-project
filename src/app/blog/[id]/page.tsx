import BackButton from "@/app/components/BackButton"
import ButtonAction from "@/app/components/ButtonAction"
import { FC } from "react"
import { db } from '../../firebaseConfig'
import { getFirestore } from 'firebase/firestore';
import { getDocs, collection, doc, getDoc } from "firebase/firestore";

interface BlogDetailPageProps{
  params:{
    id: string
  }
}

const postCollectionRef = collection(db, 'posts')


async function getPost(id: string){
  const docToget = doc(db, "posts", id)
  const response = await getDoc(docToget)
  // const response = await getDoc(postCollectionRef)
    // const filterPosts = response.docs.map((doc) => ({...doc.data(), id: doc.id}))

    return response.data()
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({params}) => {

  const post  = await getPost(params.id)
  // const filterPost = post.filter((item) => {
  //   return item.id == params.id
  // })

  // console.log(post)
  
  return (
    <div>
        <BackButton />
        <div className="mb-8">
            <h2 className="text-2xl font-bold my-4 capitalize">{post?.title}</h2>
            <ButtonAction id={params.id}/>
        </div>
        <span className="badge badge-secondary">{post?.createdAt ?  post?.createdAt : 'Date'}</span><br />
        <p>{post?.content}</p><br/ >
        <span className="badge badge-primary">{post?.author}</span>
    </div>
  )
}

export default BlogDetailPage