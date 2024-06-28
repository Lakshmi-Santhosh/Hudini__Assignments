"use client";

import React from "react";
import Nav from "@/components/Nav";
import Banner from "@/components/Banner";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
<>
<link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"></link>
<link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet"></link>
</>

export default function Page() {
  return (
    <>
      <Nav/>
      <Banner />
      <Feed />
      <Footer />
    </>
  );
}
