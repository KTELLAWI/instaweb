import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import React,{useEffect} from 'react'

export default function Home() {

  const {data:session ,status} = useSession();
  const router = useRouter();
useEffect(() => {
  if (!session){
    router.push('/auth/signin')
  }
  else {
    router.push('/')

  }
  

  
   
  }, [])

  if(session ){
    return(
      <div className=' '>
      <Head>
        <title>SocialMedia App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Feed/>

      <Modal/>
      
      
    </div>

    )
  }
 else {

 }
  return (
    <div className=' '>
      <Head>
        <title>SocialMedia App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
       </div>
  )
}
