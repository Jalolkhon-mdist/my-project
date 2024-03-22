import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import utils from "utils";

const PostList: FC = () => {
  const posts = useSelector((state: RootState) => state.post.list);
  console.log(posts);

  return (
    <Container>
      <Content>
        <ul>
          {posts?.map((elem: any, index: number) => {
            return (
              <li key={index}>
                <div className="post-container">
                  <div className="user"></div>
                  <h3 className="title">{elem.title}</h3>
                  <div className="post-content">{elem.content}</div>
                  <div className="post-details">
                    <div className="group">
                      <button className="group-btn">
                        <span className="material-symbols-rounded">
                          thumb_up
                        </span>
                      </button>
                      <p>{utils.likes.count(elem?.likes?.[0]?.count)}</p>
                      <button className="group-btn">
                        <span className="material-symbols-rounded">
                          thumb_down
                        </span>
                      </button>
                    </div>
                    <button>
                      <span className="material-symbols-rounded">comment</span>
                      <p>{elem.comments}</p>
                    </button>
                    <button>
                      <span className="material-symbols-rounded">
                        ios_share
                      </span>
                      <p>Share</p>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Content>
    </Container>
  );
};

export default PostList;

const Container = styled.div``;

const Content = styled.div`
  ul {
    width: 100%;

    li {
      .post-container {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: 0.5px solid $border-color;

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
            background: rgb(236, 236, 236);
            border-radius: 50px;

            p {
              padding: 0 5px;
            }

            .group-btn {
              padding: 6px;
              cursor: pointer;
              background: transparent;
              border: none;

              &:hover {
                background: rgb(218, 218, 218);
              }
            }
          }

          button {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            background: rgb(236, 236, 236);
            border-radius: 50px;
            border: 0.5px solid $border-color;
            cursor: pointer;

            &:hover {
              background: rgb(218, 218, 218);
            }

            span {
              font-size: 22px;
            }

            p {
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
`;
