"use client"
import React, { useState } from "react";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/components/Footer";
import Link from "next/link";
 
export default function AddArticle() {
  const createArticleApi = "https://api.realworld.io/api/articles";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token, "token");
    try {
      const articleDetails = { title, description, body, tags };
      const articleData = await axios.post(
        "https://api.realworld.io/api/articles",
        { article: { ...articleDetails } },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      
      setTitle("");
      setDescription("");
      setBody("");
      setTags("");
          router.replace("/");
    } catch (error) {
      setError(error, "Failed to add article details");
    }
  };
 
  return (
    <>
      <Nav />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            className="username"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="What's this article about"
            className="email"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />

          <textarea
            name="body"
            placeholder="Write your article (in markdown)"
            className="password newsection"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            required
          ></textarea>

          <input
            type="text"
            name="tagList"
            placeholder="Enter tags (comma separated)"
            className="password"
            value={tags}
            onChange={(e)=>setTags(e.target.value)}
          />

          <button  type="submit" className="signbtn1">
            Publish Article
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}
