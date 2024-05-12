import { FC } from "react";
import PostList from "./PostList";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { CommentedPosts, LikedPosts, Post } from "pages";
import Category from "./Category";

const Home: FC = () => {
  return (
    <Main>
      <div className="main-content">
        <Routes>
          <Route element={<PostList />} path="/" />
          <Route element={<Post />} path="/post/:id" />
          <Route element={<Category />} path="/c/:category" />
          <Route element={<LikedPosts />} path="/likedposts" />
          <Route element={<CommentedPosts />} path="/commentedposts" />
        </Routes>
      </div>
    </Main>
  );
};

export default Home;

const Main = styled.main`
  /* padding-top: var(--navbar-height); */

  .main-content {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }
`;
