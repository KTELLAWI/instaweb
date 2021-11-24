import { collection, onSnapshot, query,orderBy } from '@firebase/firestore';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';
import Post from './post'


function Posts() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
       const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot=>{
            setPosts(snapshot.docs)
        })
        return ()=>{
            unsubscribe()
        }

    }, [db])
    const dummypost =[
        {
            id:123, 
            username:"KTELLAWI",
            img:"https://links.papareact.com/jjm",
            userImg:"https://links.papareact.com/ocw",
            caption:"new post",

        },
        {
            id:123,
            username:"KTELLAWI",
            img:"https://links.papareact.com/jjm",
            userImg:"https://links.papareact.com/ocw",
            caption:"new popst",

        },
        {
            id:123,
            username:"KTELLAWI",
            img:"https://links.papareact.com/jjm",
            userImg:"https://links.papareact.com/ocw",
            caption:"new post",

        },
    
    ]
    console.log(posts)
    return (
        <div>
        {posts.map((po)=>(
            <Post
            key={po.id}
            id={po.id}
            username ={po.data().username}
            img={po.data().image}
            userImg={po.data().profileImg}
            caption={po.data().caption}

            />
        ))}
            
        </div>
    )
}

export default Posts
