import React from 'react'
import { useSession, signIn, signOut ,getProviders} from "next-auth/react"
import Header from '../../components/Header';

function signin({providers}) {
    return (
        <>
        <Header/>
        <div className='flex flex-col  items-center justify-center min-h-screen py-2 mt-56 px-14  text-center'>
        <img src="https://links.papareact.com/jjm" className='w-80 ' alt="" />
        <p ></p>
        {Object.values(providers).map((provider) => (
        <div
        className='mt-40'
         key={provider.name}>
          <button
          className='p-3 bg-blue-400 rounded-lg text-white'
           onClick={() => signIn(provider.id,{callbackUrl:"/"})
           }>
            Sign in with {provider.name}
          </button>
        </div>
      ))}

        </div>
      
    </>
    )
}

export async function getServerSideProps(context){
    const providers  = await getProviders();
    return {
        props:{
            providers
        }
    }
}

export default signin
