import { FC } from "react";
import PostList from "./PostList";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Create, Edit, Post } from "pages";
import Category from "./Category";

const Home: FC = () => {
  return (
    <Main>
      <div className="main-content">
        <Routes>
          <Route element={<PostList />} path="/" />
          <Route element={<Post />} path="/post/:id" />
          <Route element={<Category />} path="/c/:category" />
        </Routes>
      </div>
      <div className="create-wrapper">
        <Create />
      </div>
      <div className="edit-wrapper">
        <Edit />
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

  .create-wrapper,
  .edit-wrapper {
    display: flex;
    justify-content: center;
  }
`;
