import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon,HeartIconFilled ,HeartIcon, PaperAirplaneIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import React,{useState,useEffect} from 'react'

import {db} from '../firebase'
import Moment from 'react-moment';
import { data } from 'autoprefixer';



function Post({id,username,img,userImg, caption,}) {
    const [comment,setComment ] = useState('');
    const [comments,setComments]=useState([]);
    const {data:session ,status} =useSession();
    const [likes,setLikes]=useState([]);
    const [hasLikes,setHasLikes]=useState();


  useEffect(() => 
      setHasLikes(
          likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      
      ),
   [likes])

useEffect(()=>{
    onSnapshot(collection(db,'posts',id,'likes'),orderBy('timestamp','desc'), snapshot=>{
setLikes(snapshot.docs)
    })
},[db,id])

   const  sendComment = async (e)=>{
        e.preventDefault()
        
    
   const commentToSend = comment;
     setComment('');

    console.log("comment is", commentToSend)


    await addDoc(collection(db,"posts",id,"comments"),{
        comment:commentToSend,
        username:session.user.username,
        userImage:session.user.image,
        timestamp:serverTimestamp(),

    })
    
  
    
}

const likePost = async()=>{

    if (hasLikes){
        await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))

    }
    else{
        await setDoc(doc(db,'posts',id,'likes',session.user.uid),{
            username:session.user.username,
    }
    

    )
}
}


 useEffect(()=>{
   onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),snapshot => 
   setComments(snapshot.docs))

 },[db,id])
   console.log('comments,',likes)
 console.log("isetlikes",hasLikes)


    return (
        <div className='bg-white my-7  border rounded-sm'>
                <div className='flex items-center p-5 '>
                <img
                className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
                 src={userImg} alt="" />
                 <p className='flex-1 font-bold'>{username}</p>
                 <DotsHorizontalIcon className='h-5'/>

                 </div>
                 <img src={img}
                 className='object-cover w-full '
                  alt="" />
                 {session && (
                    <div className='flex justify-between px-4 pt-4 '>
                  <div className='flex space-x-4 '>
                     
                     {hasLikes ? (<HeartIcon
                      onClick={likePost}
                      className='btn text-red-500'/> ): ( <HeartIcon 
                      onClick={likePost}
                      className='btn'/>)}
                      
                      <ChatIcon className='btn'/>
                      <PaperAirplaneIcon className='btn'/>
                  </div>
                  <BookmarkIcon className='btn'/>
                  </div>
                 )}
                  
                  <p className='p-5 truncate '> 
                  {likes.length>0 && (
                      <p className='font-bold mb-1 '>{likes.length} likes</p>
                  )}
                   <span className='font-bold mr-1'>{username}</span>{caption}
                  </p>

                  {comments.length> 0 && (
                      <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thun'>
                          {comments.map(comment =>(

                        <div className='flex items-center space-x-2 mb-3'
                              key={comment.id}
                              
                              >
                              <img className='h-7 rounded-full' src={comment?.data().userImage} alt="" />
                               <p className='tect-sm flex-1 '><span className='font-bold'>{comment?.data().usename}</span>{comment?.data().comment }</p>


                               <Moment fromNow
                               className='pr-5 text-xs'>
                               {comment?.data().timestamp?.toDate()}
                               </Moment>
                               
                        </div>
                            
                          )
                          )
                          }
                            </div>

                  )}
                 {
                     session && (
                        <form className='flex items-center p-4' action="">
                      <EmojiHappyIcon className='h-7'/>
                      <input className='border-none flex-1  focus:ring-0 outline-none'  
                      placeholder='comment '
                      value ={comment}
                      onChange={(e)=> setComment(e.target.value)}
                      type="text" />
                      <button
                      type="submit"
                      onClick={sendComment}
                    
                     
                      
                     disabled={!comment} 

                      className='font-semibold text-blue-500'>post</button>
                  </form>
          
                     ) 
                 }
        </div>
    )
}

export default Post
