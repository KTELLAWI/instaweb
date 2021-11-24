import '../styles/global.css'
import{SessionProvider} from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import React,{useEffect} from 'react'


function MyApp({ Component, pageProps:{session,...pageProps} }) {

  
  return ( 

    <SessionProvider session ={session}>
    <RecoilRoot>
   <Component {...pageProps} />
   </RecoilRoot>
  </SessionProvider>
  )
  
}

export default MyApp
