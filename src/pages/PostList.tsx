import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import Searchbar from "../components/Searchbar";
import Aside from "../components/AsideLeft";
import { postApi, setCreateModal } from "store/reducers/post";
import AsideRight from "../components/AsideRight";
import { useLocation, useSearchParams } from "react-router-dom";

const PostList: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const posts = useSelector((state: RootState) => state.post.list.data);
  const category = searchParams.get("category");
  const orderBy = searchParams.get("order-by");
  const categoryText = category?.split(',')

  useEffect(() => {
    dispatch(postApi.list.get({ category, order: orderBy }));
  }, [location.search, searchParams]);

  return (
    <Container>
      <Content>
        <div className="header">
          {
            category ? <div className="header-content green">
              <h1 className="title">{categoryText?.[0]}: {categoryText?.[1]}</h1>
              <p className="subtitle">
                See the problems and support people in this category
              </p>
            </div> : <div className="header-content">
              <h1 className="title">Welcome to Social Club</h1>
              <p className="subtitle">
                Give & receive support in more than 50 support groups. Use the
                search bar below to find a group or search the entire site.
              </p>
            </div>
          }
          <Searchbar />
        </div>
        <Main>
          <div className="content">
            <div className="left">
              <Aside />
            </div>
            <div className="center">
              <div className="center-header">
                {orderBy === "top" ? (
                  <h2>Top Topics</h2>
                ) : (
                  <h2>Latest Topics</h2>
                )}
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
    }

    .subtitle {
      font-size: 15px;
      font-family: var(--font-regular);
      color: var(--text-color);
    }
  }
  
  .header-content{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    padding: 20px;

    &.green{
      background: var(--element-color);

      .title, .subtitle{
        color: white;
      }
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
