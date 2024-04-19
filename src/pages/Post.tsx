import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import utils from "utils";
import CommentEditor from "../components/CommentEditor";
import Comment from "../components/Comment";
import { postApi } from "store/reducers/post";
import parse from "html-react-parser";
import { setCommentEditor } from "store/reducers/commenteditor";
import UserImage from "../components/UserImage";

const Post: FC = () => {
  const params = useParams();
  const id = params?.id;
  if (!id) return;

  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    dispatch(postApi.get(id));
  }, []);

  const post = useSelector((state: RootState) => state.post.element.data[id]);
  const comments = useSelector(
    (state: RootState) => state.post.comments.data[id]
  );
  const commentsCount = useSelector(
    (state: RootState) => state.post.comments.count[id]
  );
  // const user = useSelector((state: RootState) => state.user.data);

  if (post) {
    const reaction = post?.reaction?.[0]?.type;

    return (
      <Container>
        <Content>
          <div className="post-container">
            <div className="user-img">
              <UserImage src={post?.user?.img} alt={post?.user?.name} />
            </div>
            <div className="post-main box-style">
              <div className="user">
                <div className="user-name">{post.user.name}</div>
                <span className="divider">•</span>
                <div className="user-post-created-at">
                  {utils.timeAgo(post.created_at)}
                </div>
              </div>
              <h3 className="title">{post.title}</h3>
              <div className="post-content">{parse(post.content)}</div>
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
                  <p>{utils.count(post?.likes?.[0]?.count)}</p>
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
                  <p>{post?.comments?.[0]?.count}</p>
                </button>
                <button>
                  <span className="material-symbols-outlined icon">
                    ios_share
                  </span>
                  <p>Share</p>
                </button>
              </div>
            </div>
          </div>
          <Comments>
            <Comments>
              <div className="title">
                <h2>Comments </h2>
                <i>{commentsCount}</i>
              </div>
              <CommentEditor />
              {/*  */}
              <ul>
                {comments?.length > 0 ? (
                  comments.map((item: any) => (
                    <li key={item.id}>
                      <Comment element={item} id={id} />
                    </li>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </ul>
              {/*  */}
            </Comments>
          </Comments>
        </Content>
        <Options>
          <button
            className="icon-btn"
            onClick={() => {
              dispatch(setCommentEditor({ element: null, open: true }));
            }}
          >
            <span className="material-symbols-outlined">reply</span>
          </button>
        </Options>
        <CommentEditor />
      </Container>
    );
  }
};

export default Post;

const Container = styled.div`
  padding: 0 15px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  column-gap: 10px;
  position: relative;
`;

const Content = styled.div`
  padding-top: 30px;
  width: 100%;

  .post-container {
    display: flex;
    column-gap: 15px;
    width: 100%;

    .user-img {
      height: 50px;
      aspect-ratio: 1/1;
      background-color: var(--element-background);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--font-regular);
      font-size: 16px;
      color: var(--text-color);
      text-transform: uppercase;

      .alt {
        font-size: 22px;
      }
    }

    .post-main {
      width: 100%;

      .user {
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-bottom: 10px;

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
`;

const Comments = styled.div`
  margin-top: 50px;
  * {
    color: var(--text-color);
  }

  .title {
    display: flex;
    align-items: center;
    column-gap: 10px;

    h2 {
      font-family: var(--font-medium);
      font-weight: normal;
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  max-height: 300px;
  height: 100%;
  top: 70px;
`;
