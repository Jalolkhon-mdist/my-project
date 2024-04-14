import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import PostList from "./PostList";
import styled from "styled-components";
import Aside from "../components/Aside";
import { Route, Routes } from "react-router-dom";
import { Post } from "pages";
import Navbar from "../components/Navbar";
import { postApi } from "store/reducers/post";

const Home: FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    dispatch(postApi.list.get());
  }, []);

  return (
    <Main>
      <Navbar />
      <div className="main">
        <div className="sidebar">
          <Aside />
        </div>
        <div className="main-content">
          <Routes>
            <Route element={<PostList />} path="/" />
            <Route element={<Post />} path="/post/:id" />
          </Routes>
        </div>
      </div>
    </Main>
  );
};

export default Home;

const Main = styled.main`
  padding-top: var(--navbar-height);

  .main {
    display: flex;
    column-gap: 20px;
    position: relative;
    height: 100%;

    .sidebar {
      min-width: 272px;
      height: calc(100vh - var(--navbar-height));
      position: sticky;
      top: var(--navbar-height);
    }

    .main-content {
      max-width: 1000px;
      width: 100%;
      margin: 0 auto;
    }
  }
`;
