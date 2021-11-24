import React,{useEffect,useState} from 'react';
import faker from 'faker';
import Story from './Story';
import { signIn, signOut, useSession } from 'next-auth/react'

function Stories() {
    const {data:session ,status} = useSession();
    const [sugestions ,setSugestions ]= useState([]);
    useEffect(() => {
        const sugestions  = [...Array(20)].map((_,i)=>(
            {
                ...faker.helpers.contextualCard(),
                id:i,
            }
        ))
        console.log(sugestions);
        setSugestions(sugestions);

       
    }, [])
    return (
        <div className='flex space-x-2  p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin'>
            {session &&(
                <Story  img={session.user.image} username={session.user.username} />
            )}
            
            {sugestions.map(profile=>(
                
              <Story key = {profile.id} img={profile.avatar} username={profile.username} />  
            ))}
        </div>
    )
}

export default Stories
