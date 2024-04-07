import React, { useEffect, useState } from 'react'
import service from '../appwrite/backendConfig'
import {Container, PostCard} from "../components/index"


function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts([])
        .then((posts)=>{
    
            if(posts){
                setPosts(posts.documents)
            }
        })

    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap bg-white'>
                {posts.map((post)=>(
                    <div 
                    key={post.$id}
                    className='p-2 w-1/4 h-64'
                    >
                        <div className="h-64 w-full">
                            <PostCard {...post}/>
                        </div>

                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost