import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import styled from "styled-components";
import utils from "utils";

const PostList: FC = () => {
  const posts = useSelector((state: RootState) => state.post.data);

  return (
    <Container>
      <Content>
        <ul className="post-list">
          {Object.entries(posts)?.map(([key, elem]) => {
            const reaction = elem?.reaction?.[0]?.type;
            console.log(elem);

            return (
              <li key={key} className="post">
                <Link to={`/post/${elem.id}`}>
                  <div className="post-container">
                    <div className="user">
                      <div className="user-left">
                        <div className="user-img">
                          {elem.user.img ? (
                            <img src={elem.user.img ?? " "} alt="" />
                          ) : (
                            elem.user.name[0]
                          )}
                        </div>
                      </div>
                      <div className="user-right">
                        <div className="user-name">{elem.user.name}</div>
                        <span className="divider">•</span>
                        <div className="user-post-created-at">
                          {utils.timeAgo(elem.created_at)}
                        </div>
                      </div>
                    </div>
                    <h3 className="title">{elem.title}</h3>
                    <div className="post-content">{elem.content}</div>
                    <div className="post-details">
                      <div className="group">
                        <button className="group-btn">
                          <span
                            className={`material-symbols-outlined icon ${
                              reaction === "like" && "filled"
                            }`}
                          >
                            thumb_up
                          </span>
                        </button>
                        <p>{utils.likes.count(elem?.likes?.[0]?.count)}</p>
                        <button className="group-btn">
                          <span
                            className={`material-symbols-outlined icon ${
                              reaction === "dislike" && "filled"
                            }`}
                          >
                            thumb_down
                          </span>
                        </button>
                      </div>
                      <button>
                        <span className="material-symbols-outlined icon">
                          comment
                        </span>
                        <p>{elem?.likes?.[0]?.count}</p>
                      </button>
                      <button>
                        <span className="material-symbols-outlined icon">
                          ios_share
                        </span>
                        <p>Share</p>
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="page-info"></div>
      </Content>
    </Container>
  );
};

export default PostList;

const Container = styled.div``;

const Content = styled.div`
  .post-list {
    width: 100%;
    border-top: 0.5px solid var(--border-color-dark);
    margin-top: 50px;

    .post {
      width: 100%;
      border-bottom: 0.5px solid var(--border-color-dark);
      padding: 5px 0;

      .post-container {
        padding: 5px 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 15px;

        &:hover {
          background-color: var(--content-background-hover);
        }

        .user {
          display: flex;
          align-items: center;
          column-gap: 10px;
          margin-bottom: 10px;

          .user-left {
            .user-img {
              height: 25px;
              aspect-ratio: 1/1;
              background-color: var(--element-background-hover);
              border-radius: 50%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: var(--font-regular);
              font-size: 16px;
              color: var(--text-color);
              text-transform: uppercase;

              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
            }
          }

          .user-right {
            display: flex;
            column-gap: 5px;
            align-items: center;

            .user-name {
              font-family: var(--font-regular);
              font-size: 13px;
              color: var(--text-color);
              opacity: 0.9;
            }

            .divider {
              color: var(--text-color);
            }

            .user-post-created-at {
              font-family: var(--font-light);
              font-size: 12px;
              color: var(--text-color);
              opacity: 0.7;
            }
          }
        }

        .title {
          margin-bottom: 10px;
          color: var(--title-color);
          font-weight: normal;
          font-family: var(--font-medium);
          font-size: 20px;
        }

        .post-content {
          width: 100%;
          overflow: hidden;
          margin-bottom: 10px;
          font-size: 15px;
          color: var(--text-color);

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .post-details {
          margin-top: 10px;
          display: flex;
          column-gap: 10px;

          .group {
            display: flex;
            align-items: center;
            background: var(--element-background);
            border-radius: 50px;

            p {
              padding: 0 5px;
              font-size: 13px;
              font-family: var(--font-medium);
              color: var(--title-color);
            }

            .group-btn {
              padding: 6px;
              cursor: pointer;
              border: none;
            }
          }

          button {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            background-color: var(--element-background);
            border-radius: 50px;
            cursor: pointer;
            color: var(--title-color);

            .icon {
              font-size: 22px;
            }

            &:hover {
              background: var(--element-background-hover);
            }

            p {
              padding: 0 5px;
              font-size: 13px;
              font-family: var(--font-medium);
              color: var(--title-color);
            }
          }
        }
      }
    }
  }
`;
