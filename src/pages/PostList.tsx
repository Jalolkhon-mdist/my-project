import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import Searchbar from "../components/Searchbar";
import Aside from "../components/Aside";
import { Link } from "react-router-dom";

const PostList: FC = () => {
  const posts = useSelector((state: RootState) => state.post.list.data);

  return (
    <Container>
      <Content>
        <div className="header">
          <h1 className="title">Welcome to CommunityClub.com™</h1>
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
              <h2>Latest Topics</h2>
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
            <div className="right box-style">
              <h2 className="title">Welcome</h2>
              <p className="text">
                Tired of scrolling through the same posts? When you create an
                account you’ll always come back to where you left off. With an
                account you can also be notified of new replies, save bookmarks,
                and use likes to thank others. We can all work together to make
                this community great.
              </p>
              <Link to={`login?type=sign-up`} className="custom-btn">
                Sign Up
              </Link>
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
