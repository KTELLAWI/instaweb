import React,{useState,useEffect} from 'react';
import faker from 'faker';
function Suggestion() {
    const [suggestion , setSugesstion] = useState([])
    useEffect(() => {
        const suggestion = [...Array(5)].map ((_,i)=>(
            {
                ...faker.helpers.contextualCard(),
                id:i
            }
        ))
        setSugesstion(suggestion)
    }, [])
    
    return (
        <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5 '>
            <h3 className='text-sm font-bold  text-gray-500'>suggestion for you </h3>
            <button className='text-gray-500 font-semibold'>See All</button>
        </div>
        {
            suggestion.map((profile)=>(
                <div 
                key={profile.id}
                className='flex items-center justify-between mt-3'
                >
                <img src={profile.avatar} alt="" 
                className='w-10 h-10 border p-[2px] rounded-full '
                 />
                 <div className='flex-1 ml-4  '> 
                     <h2 className='font-semibold text-sm '>{profile.username}</h2>
                     <h3 className=' text-xs text-gray-400'>works at {profile.company.name}</h3>
                 </div>
                 <button className='text-blue-400 '> Follow</button>

                </div>


            ))}   
            
        </div>
    )
}

export default Suggestion
