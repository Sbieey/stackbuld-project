import Link from 'next/link'
import React, { FC } from 'react'

interface PostCardProps{
  post:{
    id: string,
    title: string,
    content: string,
    author: string
    createdAt?: any
  }
}

const Postcard:FC<PostCardProps> = ({ post}) => {
  const {id, title, content, author, createdAt } = post
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
  <div className="card-body">
    <span className='badge badge-secondary'>{createdAt ? createdAt: 'Date'}</span>
    <h2 className="card-title capitalize">{title.slice(0, 20)}..</h2>
    <p>{content.slice(0, 30)}..</p>
    <div className="card-actions justify-end">
      by: <span className="badge badge-primary">{author}</span>
      <Link href={`/blog/${id}`} className="hover:underline">Read more...</Link>
    </div>
  </div>
</div>
  )
}

export default Postcard