import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

function MiniProfile() {
    const {data:session ,status} = useSession();
    return (
        <div className='flex  items-center justify-between mt-14 ml-10 '>
           <img  className ='rounded-full border p-[2px] w-16 h-16 '
           src={session.user.image} alt="" /> 
        

        <div className='flex-1 '>
            <h2 className='font-bold'>{session.user.username}</h2>
            <h3 className='text-sm  text-gray-400'>welcome to instagram</h3>
        </div>
        <button
        onClick={signOut}
         className='text-sm text-blue-400 font-semibold'>SignOut</button>
        </div>
    )
}

export default MiniProfile
