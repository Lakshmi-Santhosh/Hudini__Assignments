import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesandTagList, getArticlesByTag } from "@/app/features/articles/articlesSlice";
import Link from "next/link";
import Spinner from "../Spinner";


export default function Feed() {
  const dispatch = useDispatch();

  const [selectedTag, setSelectedTag] = useState(null);

  const articlesStore = useSelector((state) => state.articles.articles);
  const articlesStatus = useSelector((state) => state.articles.status);
  const tags = useSelector((state) => state.articles.tags);
  const paginationCount = useSelector((state) => state.articles.paginationCount);

  useEffect(() => {
    dispatch(getArticlesandTagList());
  }, [dispatch]);

  function getDate(dateString) {
    let dateFormat = new Date(dateString);
    return dateFormat.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getPages(count) {
    const pageInfo = [];
    let item = 1;
    for (let i = 0; i <= count; i += 10) {
      pageInfo.push({ offset: i, item: item });
      item++;
    }
    return pageInfo;
  }

  function handleTagClick(tag) {
    setSelectedTag(tag);
    dispatch(getArticlesByTag(tag));
  }

  function handleGlobalFeedClick() {
    setSelectedTag(null);
    dispatch(getArticlesandTagList());
  }

  return (
    <div className="section">
      <div className="col">
        <div className="feed">
          <div className="col1">
            <a className="globaltext" onClick={handleGlobalFeedClick} href="#">
              Global Feed
            </a>
            {selectedTag && <span className="tagname">#{selectedTag}</span>}
            {articlesStatus === "loading" ? (
              <p className="spinner"><Spinner /></p>
            ) : (
              <ul className="list">
                {articlesStore.map((article, id) => (
                  <li className="listfeed" key={id}>
                    <div className="feeddetails">
                      <div className="feedmain">
                        <img className="feedimg" src={article.author.image} alt="Author" />
                        <div className="feedinfo">
                          <Link href={`/profile/${article.author.username}`} className="feedusername">
                            {article.author.username}
                          </Link>
                          <span className="feedcreatedat">{getDate(article.createdAt)}</span>
                        </div>
                        <div className="feedbtns">
                          <button className="btn">
                            <span className="hearticon">&#10084;</span> {article.favoritesCount}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Link href={`/article/${article.slug}`}>
                      <p className="articletitle">{article.title}</p>
                      <p className="articledescription">{article.description}</p>
                    </Link>
                    <ul className="taglist">
                      {article.tagList.map((tag, tagIndex) => (
                        <li key={tagIndex}>
                          <button className="btn1" onClick={() => handleTagClick(tag)}>
                            {tag}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
            <div className="pagination">
              {getPages(paginationCount).map(({ offset, item }) => (
                <button className="pagebtn"
                  key={item}
                  onClick={() => dispatch(getArticlesandTagList(offset))}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col2">
        <div className="sidebar">
          <p>Popular Tags</p>
          {articlesStatus === "loading" ? (
            <p className="spinner"><Spinner /></p>
          ) : (
            <ul className="tags">
              {[...new Set(tags)].map((tag, tagIndex) => (
                <li key={tagIndex}>
                  <a href="#" onClick={() => handleTagClick(tag)} className="btn2">
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
