'use client'

import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({children}:{children:React.ReactNode}){
    const {loading,user}=useAuth()
    const router=useRouter();
useEffect(()=>{
    if(!loading&&!user){
router.push('/login')

    }
},[loading,user])
if(loading){
    return<h2>loading...</h2>
}
if(!user){
    return null
}
return <>{children}</>
}