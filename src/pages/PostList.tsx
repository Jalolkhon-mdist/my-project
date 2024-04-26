import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import Searchbar from "../components/Searchbar";
import Aside from "../components/AsideLeft";
import { postApi, setCreateModal } from "store/reducers/post";
import useSearchParams from "../hooks/useSearchParams";
import AsideRight from "../components/AsideRight";
import { useLocation } from "react-router-dom";

const PostList: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const location = useLocation();
  const searchParams = useSearchParams();
  const posts = useSelector((state: RootState) => state.post.list.data);
  const category = searchParams.get("category");

  useEffect(() => {
    dispatch(postApi.list.get({ category }));
  }, [location.search]);

  return (
    <Container>
      <Content>
        <div className="header">
          <h1 className="title">Welcome to Social Club</h1>
          <p className="subtitle">
            Give & receive support in more than 50 support groups. Use the
            search bar below to find a group or search the entire site.
          </p>
          <Searchbar />
        </div>
        <Main>
          <div className="content">
            <div className="left">
              <Aside />
            </div>
            <div className="center">
              <div className="center-header">
                <h2>Latest Topics</h2>
                <button
                  className="custom-btn"
                  onClick={() => {
                    dispatch(setCreateModal({ open: true }));
                  }}
                >
                  New Post
                </button>
              </div>
              <ul className="post-list">
                {posts?.map((elem, key) => {
                  return (
                    <li key={key} className="post">
                      <PostCard elem={elem} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="right">
              <AsideRight />
            </div>
          </div>
        </Main>
        <div className="page-info"></div>
      </Content>
    </Container>
  );
};

export default PostList;

const Container = styled.div``;

const Content = styled.div`
  .header {
    padding-top: 50px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 35px;
      font-family: var(--font-bold);
      color: var(--title-color);
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 15px;
      font-family: var(--font-regular);
      color: var(--text-color);
      margin-bottom: 20px;
    }
  }
`;

const Main = styled.div`
  .content {
    position: relative;
    display: grid;
    grid-template-columns: 300px auto 300px;
    align-items: flex-start;
    column-gap: 30px;

    h2 {
      font-size: 22px;
      font-family: var(--font-bold);
      color: var(--title-color);
    }

    .left {
      position: sticky;
      top: 0;
    }

    .center {
      width: 100%;

      .center-header {
        display: flex;
        justify-content: space-between;
      }
    }

    .right {
      position: sticky;
      top: 0;

      .title {
        margin-bottom: 10px;
      }
      .text {
        margin-bottom: 20px;
      }
    }
  }
`;
