import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import PostList from "./PostList";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Post } from "pages";
import { postApi } from "store/reducers/post";

const Home: FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    dispatch(postApi.list.get());
  }, []);

  return (
    <Main>
      <div className="main-content">
        <Routes>
          <Route element={<PostList />} path="/" />
          <Route element={<Post />} path="/post/:id" />
        </Routes>
      </div>
    </Main>
  );
};

export default Home;

const Main = styled.main`
  padding-top: var(--navbar-height);

  .main-content {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }
`;
