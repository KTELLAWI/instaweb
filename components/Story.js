import React from 'react'

function Story({username,img}) {
    return (
        <div >
        <img className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-125 transition ease-out duration-200'
         src={img} alt="" />
        <p className='text-xs w-14 truncate text-center '>{username}</p>

            
        </div>
    )
}   

export default Story
