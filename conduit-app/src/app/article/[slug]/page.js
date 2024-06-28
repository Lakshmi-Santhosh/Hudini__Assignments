"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";

export default function Blog({ params }) {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const blogs_url = `https://api.realworld.io/api/articles/${params.slug}`;
  const fetchBlogs = async () => {
    const response = await fetch(blogs_url);
    const jsonResponse = await response.json();
    const blogArray = jsonResponse.article;
    setBlog(blogArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  function getDate(dateString) {
    let dateFormat = new Date(dateString);
    return dateFormat.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    
    <>
      <Nav className="blogspinner"/>
      {loading ? (
       
  <p className="spinner"><Spinner /></p>
) : (
    
  <div className="blogs">
    <div className="blogmain">
        <div className="blogcontainer">
            <h1 >{blog.title}</h1>
            <div className="feeddetails">
                 <img  className="feedimg" src={blog.author.image} />
            <div className="feedinfo">   
                    <p className="feedusername">{blog.author.username}</p>
                    <span className="feedcreatedat">{getDate(blog.createdAt)}</span>
            </div>  
            </div>  
            <div className="blogbtns">
                <button className="blogfollow">Follow Maksim Esteban</button>
                <button className="favoritebtn">
                    Favorite Post({blog.favoritesCount})
                </button>
            </div>
    </div>
    </div>


    <div className="blogssub">
        <div className="blogcontainer1">
            <div className="rowcontent">
            <p className="blogbody">{blog.body}</p>
            </div>
        </div>  
            <ul className=" blogtaglist">
                      {blog.tagList.map((tag, tagIndex) => (
                        <li  key={tagIndex}>
                          <button className="btn1">{tag}</button>
                        </li>
                ))}
         </ul> 
    </div>
           
    </div>
    
)}
<Footer/>
    </>
  );
}
