'use client'

import Link from "next/link"
import { Pencil, Trash} from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FC } from "react"
import { useRouter } from "next/navigation"

interface ButtonActionProps{
  id: string
}
const ButtonAction:FC<ButtonActionProps> = ({id}) => {

  const router = useRouter()

  const {mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`)
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
        <Link className="btn mr-2" href={`/edit/${id}`}> 
            <Pencil />Edit
        </Link>
        <button onClick={() => deletePost()} className="btn btn-error">
          {isLoading && <span className="loading loading-spinner"></span>}
          {isLoading ? 'Loading...' : (
            <>
              <Trash />
              Delete
            </>
            
          )}
           
           </button>
    </div>
  )
}

export default ButtonAction