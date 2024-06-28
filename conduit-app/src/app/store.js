import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./features/articles/articlesSlice";
// import tagsSlice from "./features/tags/tagsSlice";
// import blogsSlice from "./features/blogs/blogsSlice";

console.log(articlesSlice, "arrar");

export const makeStore = () => {
  return configureStore({
    reducer: {
      articles: articlesSlice,

      // blogs: blogsSlice,
    },
  });
};
