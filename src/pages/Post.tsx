import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { api } from "store/reducers";
import styled from "styled-components";
import utils from "utils";

const Post: FC = () => {
  const params = useParams();
  const id = params?.id;
  if (!id) return;

  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    dispatch(api.post.get(id));
  }, []);

  const post = useSelector((state: RootState) => state.post.data[id]);
  const comments = useSelector((state: RootState) => state.post.comments[id]);
  const user = useSelector((state: RootState) => state.user.data);

  const [addComment, setAddComment] = useState({
    open: true,
    ref: useRef<HTMLDivElement | null>(null),
    disabled: true,
    trim() {
      setAddComment((prevState) => ({
        ...prevState,
        disabled: !utils.trim(addComment.ref),
      }));
    },
    post: (value: string) => {
      dispatch(
        api.post.comments.post({
          post_id: id,
          value,
        })
      ).then(() => {
        setAddComment({ ...addComment, open: false });
      });
    },
    cancel() {
      setAddComment((prevState) => ({
        ...prevState,
        open: false,
        value: "",
      }));
    },
  });

  if (post) {
    const reaction = post?.reaction?.[0]?.type;
    // console.log(post);
    // console.log(comments);

    return (
      <Container>
        <Content>
          <div className="post-container">
            <div className="user">
              <div className="user-left">
                <div className="user-img">
                  {post.user.img ? (
                    <img src={post.user.img ?? " "} alt="" />
                  ) : (
                    post.user.name[0]
                  )}
                </div>
              </div>
              <div className="user-right">
                <div className="user-name">{post.user.name}</div>
                <span className="divider">•</span>
                <div className="user-post-created-at">
                  {utils.timeAgo(post.created_at)}
                </div>
              </div>
            </div>
            <h3 className="title">{post.title}</h3>
            <div className="post-content">{post.content}</div>
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
                <p>{utils.likes.count(post?.likes?.[0]?.count)}</p>
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
                <span className="material-symbols-rounded icon">comment</span>
                <p>{post?.likes?.[0]?.count}</p>
              </button>
              <button>
                <span className="material-symbols-rounded icon">ios_share</span>
                <p>Share</p>
              </button>
            </div>
          </div>
          <Comments>
            <NewComment>
              {!addComment.open ? (
                <button
                  className="add-comment-btn"
                  onClick={() => setAddComment({ ...addComment, open: true })}
                >
                  <span className="material-symbols-outlined icon">add</span>
                  <span>Add a Comment</span>
                </button>
              ) : null}
              {addComment.open ? (
                <div className="add-comment">
                  <div className="add-comment-left">
                    <div className="add-comment-img">
                      {user?.img ? <img src="" alt="" /> : user.name[0]}
                    </div>
                  </div>
                  <div className="add-comment-body">
                    <div className="add-comment-username">{user.name}</div>
                    <div className="input-wrapper">
                      <div
                        className="input"
                        contentEditable
                        ref={addComment.ref}
                        onInput={() => addComment.trim()}
                      ></div>
                    </div>
                    <div className="add-comment-options">
                      <button className="cancel" onClick={addComment.cancel}>
                        Cancel
                      </button>
                      <button
                        className="add"
                        disabled={addComment.disabled}
                        onClick={() =>
                          addComment.post(addComment.ref.current?.textContent!)
                        }
                      >
                        Add a Comment
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </NewComment>
            {comments
              ? Object.entries(comments)?.map(([key, comment]) => {
                  return (
                    <div key={key} className="comment">
                      <div className="comment-left">
                        <div className="comment-user-img">
                          {comment.user.img ? (
                            <img src={comment.user.img} alt="" />
                          ) : (
                            comment.user.name[0]
                          )}
                        </div>
                        <div className="comment-line-wrapper">
                          <div className="comment-line"></div>
                        </div>
                      </div>
                      <div className="comment-body">
                        <div className="comment-user">
                          <div className="comment-user-name">
                            <span>{comment.user.name}</span>
                            <span>•</span>
                            <span className="created-at">
                              {utils.timeAgo(comment.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="comment-content">{comment.content}</div>
                        <div className="comment-options">
                          <div className="comment-reactions">
                            <button className="comment-reaction">
                              <span
                                className={`material-symbols-outlined like icon ${
                                  comment.reaction?.[0]?.type === "like" &&
                                  "filled"
                                }`}
                              >
                                thumb_up
                              </span>
                            </button>
                            <span className="comment-likes-count">
                              {comment?.likes[0].count}
                            </span>
                            <button className="comment-reaction">
                              <span
                                className={`material-symbols-outlined dislike icon ${
                                  comment.reaction?.[0]?.type === "dislike" &&
                                  "filled"
                                }`}
                              >
                                thumb_down
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </Comments>
        </Content>
      </Container>
    );
  }
};

export default Post;

const Container = styled.div`
  padding: 0 15px;
`;

const Content = styled.div`
  padding-top: 30px;

  .post-container {
    display: flex;
    flex-direction: column;
    width: 100%;

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
`;

const Comments = styled.div`
  margin-top: 50px;
  * {
    color: var(--text-color);
  }

  .comment {
    display: flex;
    margin-bottom: 30px;
    overflow: hidden;

    .comment-left {
      .comment-user-img {
        height: 33px;
        aspect-ratio: 1/1;
        background-color: var(--element-background-hover);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-family: var(--font-regular);
        color: var(--text-color);

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }

      .comment-line-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;

        .comment-line {
          position: absolute;
          top: 5px;
          border: none;
          height: 100%;
          width: 0.5px;
          background-color: var(--border-color);
        }
      }
    }

    .comment-body {
      padding-top: 7px;
      padding-left: 10px;

      .comment-user {
        display: flex;
        align-items: center;

        .comment-user-name {
          display: flex;
          align-items: center;
          column-gap: 7px;
          font-size: 14px;

          span {
            color: var(--title-color);
            font-family: var(--font-medium);
          }

          .created-at {
            opacity: 0.7;
            font-size: 12px;
          }
        }
      }

      .comment-content {
        font-size: 14px;
        padding-top: 10px;
      }

      .comment-options {
        margin-top: 10px;

        .comment-reactions {
          display: flex;
          align-items: center;
          margin-left: -5px;

          .comment-likes-count {
            font-size: 14px;
            padding: 0 3px;
          }

          .comment-reaction {
            display: flex;
            align-items: center;
            column-gap: 5px;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;

            &:hover {
              background-color: var(--element-background-hover);

              .icon {
                &.like {
                  color: #bb0000;
                }
                &.dislike {
                  color: #008dd4;
                }
              }
            }

            .icon {
              font-size: 20px;

              &.like.filled {
                color: #bb0000;
              }
              &.dislike.filled {
                color: #008dd4;
              }
            }
          }
        }
      }
    }
  }
`;

const NewComment = styled.div`
  .add-comment-btn {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color-light);
    padding: 10px 12px;
    border-radius: 50px;
    margin-bottom: 25px;
    cursor: pointer;

    &:hover {
      border-color: white;
    }

    span {
      font-size: 15px;
      color: var(--title-color);
    }

    .icon {
      font-size: 30px;
      line-height: 0;
      margin-left: -5px;
    }
  }

  .add-comment {
    display: flex;
    column-gap: 10px;
    margin-bottom: 35px;

    .add-comment-left {
      .add-comment-img {
        height: 35px;
        aspect-ratio: 1/1;
        background-color: var(--element-background-hover);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        line-height: 0;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .add-comment-body {
      width: 100%;
      padding-top: 8px;

      .add-comment-username {
        font-size: 14px;
        font-family: var(--font-medium);
        color: var(--title-color);
        margin-bottom: 13px;
      }

      .input-wrapper {
        .input {
          background: none;
          border-bottom: 0.5px solid var(--border-color);
          padding-bottom: 7px;
          outline: none;
          transition: 0.1s;

          &:focus {
            border-color: var(--border-color-light);
          }
        }
      }

      .add-comment-options {
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 10px;

        button {
          padding: 7px 10px;
          border: 1px solid var(--border-color-light);
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            &.cancel {
              border-color: #a80000;
              color: #a80000;
            }
            &.add {
              border-color: #00a881;
              color: #00a881;
            }
          }
        }
      }
    }
  }
`;
