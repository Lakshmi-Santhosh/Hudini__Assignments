"use client"

import React from "react";
import Link from "next/link";
import  ProductApps from "./productApps";
import { ProductProvider } from "./productContext";


export default function Page(){
  return (
    <ProductProvider>
      <div>
        <ProductApps/>
      </div>
    </ProductProvider>
  );
}
