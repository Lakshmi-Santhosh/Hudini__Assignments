import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token =
  typeof window !== undefined ? localStorage.getItem('token') : null;
 
export const getArticlesandTagList = createAsyncThunk(
  'articles/fetchData',
  async (offset = 0) => {
    const articles_url = `https://api.realworld.io/api/articles?offset=${offset}&limit=10`;
 
    const tags_url = 'https://api.realworld.io/api/tags';
    
 
    const data = token
      ? await Promise.all([
          fetch(articles_url, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => response.json()),
          fetch(tags_url).then((response) => response.json()),
        ])
      : await Promise.all([
          fetch(articles_url, { headers: {} }).then((response) =>
            response.json()
          ),
          fetch(tags_url).then((response) => response.json()),
        ]);
 
   
    return {
      articles: data[0].articles,
      tags: data[1].tags,
      articlesCount: data[0].articlesCount,
    };
  }

);

export const getArticlesByTag = createAsyncThunk(
  "articles/fetchByTag",
  async (tag) => {
    const response = await fetch(
      `https://api.realworld.io/api/articles?tag=${tag}`
    );
    return response.json();
  }
);

const initialState = {
  articles: [],
  tags: [],
  status: "loading",
  paginationCount: 0,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArticlesandTagList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.tags = action.payload.tags;
        state.paginationCount = action.payload.articlesCount;
      })
      .addCase(getArticlesByTag.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.paginationCount = action.payload.articlesCount;
      })
      .addMatcher(
        (action) =>
          [getArticlesandTagList.pending, getArticlesByTag.pending].includes(
            action.type
          ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          [getArticlesandTagList.rejected, getArticlesByTag.rejected].includes(
            action.type
          ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default articlesSlice.reducer;
