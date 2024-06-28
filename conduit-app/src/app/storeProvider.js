"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";

console.log(makeStore().getState(),'zzj');

export default function StoreProvider({children}){
    if(typeof window !== undefined){
        return <Provider store={makeStore()}>{children}</Provider>;
    }
}