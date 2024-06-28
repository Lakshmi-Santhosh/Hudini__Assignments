"use client"

import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/dist/server/api-utils";
import {useEffect} from "react";
import useAuth from "@/app/utils/session";


export default function withAuth(Component){
    return function withAuth(props){
        const isAuthenticated = useAuth();
        useEffect(()=>{
            if (isAuthenticated){
                redirect("/");
            }
        },[isAuthenticated]);
        
        
        return <Component{...props}/>
    };
}