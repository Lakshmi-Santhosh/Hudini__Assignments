"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Nav from "@/components/Nav";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";

export default function ProfileClick({ params }) {
  const [profile, setProfile] = useState();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const profileResponse = await fetch(
        `https://api.realworld.io/api/profiles/${params.username}`
      );
      const profileData = await profileResponse.json();
      setProfile(profileData.profile);

      const articlesResponse = await fetch(
        "https://api.realworld.io/api/articles?offset=0&limit=251"
      );
      const articles_json = await articlesResponse.json();
      const articlesData = articles_json.articles;
      const filteredArticles = articlesData.filter(
        (article) => article.author.username === profileData.profile.username
      );
      setArticles(filteredArticles);

      setLoading(false);
    }
    fetchData();
  }, []);
  function getDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (loading) {
    return <p className="spinner"><Spinner/></p>;
  }

  return (
    <>
<Nav/>
      <div className="bannerProfile">
        <div className="profileContent">
          <img className="profile-image" src={profile.image} alt="" />
          <h1 className="profile-username">{profile.username}</h1>
        </div>
      </div>
      
      <div className="allProfile">
        <div className="profilecontent">
      <a className="mytext" href="#">
             My Articles
            </a>
        <div className="feed">
          {articles.map((article) => (
            <ul>
              <li className="articless">
                <div className="listfeed">
                  <div className="feeddetails">
                    <div className="feedmain">
                    <Link href={`/Profile/${article.author.username}`}className="linkDecoation">
                    <img  className="feedimg" src={article.author.image} />
                    </Link>
                      <div className="feedinfo">
                        <Link className="feedusername" href={`/Profile/${article.author.username}`} >
                          {article.author.username}
                        </Link>
                      
                      

                      <label className="feedcreatedat">
                        {getDate(article.createdAt)}
                      </label>
                      </div>
                    </div>
                  
                  <div className="like">
                    <button className="btn">
                    <span className="hearticon">&#10084;</span>  {article.favoritesCount}
                    </button>
                  </div>
                  
                </div>
                </div>
                <Link
                  href={`/article/${article.slug}`}
                  className="linkDecoration"
                >
                  <h1 className="articletitle">{article.title}</h1>
                </Link>
                <Link
                  href={`/article/${article.slug}`}
                  className="linkDecoration"
                >
                  <p className="articledescription">{article.description}</p>
                </Link>
                <div className="footTag">
                  <div className="tags-div">
                    <Link
                      href={`/article/${article.slug}`}
                      className="tag-in-article"
                    >
                      <span className="readmore">Read more...</span>
                    </Link>
                  </div>
                  <div className="taglist">
                    {article.tagList.map((item) => (
                      <button 
                        href={`/article/${article.slug}`}
                        className="btn1"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
