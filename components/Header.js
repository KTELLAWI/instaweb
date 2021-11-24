import React from 'react'
import Image from 'next/image'
import { HeartIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserIcon} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';
import { modalState } from '../atoms/modelAtom';
import { useRecoilState } from 'recoil'

export default function Header() {
    const {data:session ,status} = useSession();
    const [open,setOpen]= useRecoilState(modalState);
    const router = useRouter()
    console.log(session)

    return (
<div className=' sticky top-0 shadow-lg border-b bg-white z-50 w-full max-w-full   '>
    <div className='flex items-center justify-between bg-white mx-5 max-w-6xl md:mx-auto'>
        
               <div
               onClick={()=>router.push ('/')}
                className='relative hidden cursor-pointer lg:inline-grid h-20 w-20 '>
                    <Image

                        src="https://links.papareact.com/ocw"
                        layout="fill"
                        objectFit='contain'
                    />

                </div>
                <div className='relative h-10 w-10  cursor-pointer lg:hidden flex-shrink-0 ' > 
                    <Image
                        src="https://links.papareact.com/jjm"
                        layout="fill"
                        objectFit='contain'
                    />

                </div>
            
        

        {/**middle */}
        
       <div className='max-w-xs '>
            <div  className='mt-1 relative p-3 rounded-md   '> 
               <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
               <SearchIcon className="h-5 w-5 text-gray-500 "/>

               </div>
               
                <input className='bg-gray-200 block w-full pl-10 focus:ring-block focus:border-block rounded-md ' type="text" placeholder="search"  />
        

             </div>

        </div>
       



        <div className='flex items-center justify-end space-x-4'>
                <HomeIcon 
                onClick={()=>router.push ('/')}
                className= 'h-10 w-10 cursor-pointer' />
                <MenuIcon className= 'h-10 w-10 md:hidden cursor-pointer '/>
                {session ? (
                    <>
                    <div className=' relative navBtn'>
                    <PaperAirplaneIcon className='  navBtn rotate-45 '/>
                    <div className='absolute -top-2 -right-1 text-xs  w-5  h-5 bg-red-500 rounded-md flex  items-center  justify-center   animate-pulse text-white' >
                        3
                    </div>
                </div>  
                
                <PlusCircleIcon
                onClick={()=>setOpen(true)}
                 className='navBtn'/>
                <UserIcon className='navBtn' />
                <HeartIcon className='navBtn' />
                <img 
                onClick={signOut}
                src={session?.user?.image} alt=""
                className='rounded-lg  cursor-pointer  h-10 ' />
                </>
                ):

                ( <button onClick={signIn}> SignIn</button>)
                
               
                 }

               
        </div>

        
    </div>  
        
</div>

        
    )
}

