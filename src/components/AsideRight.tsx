import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import styled from "styled-components";
import UserImage from "./UserImage";

const AsideRight: FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const metadata = useSelector((state: RootState) => state.user.metadata);

  if (user?.id) {
    return (
      <Container>
        <Content className="box-style">
          <div className="user">
            <div className="user-img">
              <UserImage src={metadata?.img} alt={metadata?.name} />
            </div>
            <div className="user-name">{metadata?.name}</div>
          </div>

          <div className="user-info">
            <div className="info">
              <b>{metadata?.liked?.[0]?.count}</b>
              <span className="material-symbols-outlined filled like icon">
                favorite
              </span>
              <p>&nbsp;given</p>
            </div>
            <div className="info">
              <b>{metadata?.posts?.[0]?.count}</b>
              <p>&nbsp;posts</p>
            </div>
            <div className="info">
              <b>{metadata?.comments?.[0]?.count}</b>
              <p>&nbsp;comments</p>
            </div>
          </div>

          <div className="btn-group">
            <Link to={`/profile/${user?.id}`} className="custom-btn-gray">
              <span className="material-symbols-outlined filled like icon">
                person
              </span>
            </Link>
            <Link to={"/likedposts"} className="custom-btn-gray">
              <span className="material-symbols-outlined filled like icon">
                favorite
              </span>
            </Link>
            <Link to={"/commentedposts"} className="custom-btn-gray">
              <span className="material-symbols-outlined filled like icon">
                groups
              </span>
            </Link>
          </div>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Content className="box-style">
          <h2 className="title">Welcome</h2>
          <p className="text">
            Tired of scrolling through the same posts? When you create an
            account you’ll always come back to where you left off. With an
            account you can also be notified of new replies, save bookmarks, and
            use likes to thank others. We can all work together to make this
            community great.
          </p>
          <Link to={`login?type=sign-up`} className="custom-btn">
            Sign Up
          </Link>
        </Content>
      </Container>
    );
  }
};

export default AsideRight;

const Container = styled.div``;

const Content = styled.div`
  .user {
    display: flex;
    align-items: center;
    column-gap: 10px;

    .user-img {
      height: 50px;
      min-width: 50px;
      border: 1px solid var(--border-color);
      background: var(--content-background);
      border-radius: 50%;
      overflow: hidden;

      .alt {
        font-size: 24px;
      }
    }

    .user-name{
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .user-info {
    display: flex;
    column-gap: 8px;
    margin-top: 20px;

    .info {
      display: flex;
      align-items: center;
      column-gap: 1px;
      font-size: 15px;
      color: var(--text-color);

      b {
        color: var(--title-color);
      }

      .icon {
        font-size: 18px;
        line-height: 0;

        &.like {
          color: var(--red-color);
        }
      }
    }
  }

  .btn-group {
    display: flex;
    column-gap: 7px;
    margin-top: 20px;

    .custom-btn-gray {
      border-radius: 50%;
    }
  }
`;
