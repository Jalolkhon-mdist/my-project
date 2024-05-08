import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import utils from "utils";
import CommentEditor from "../components/CommentEditor";
import Comment from "../components/Comment";
import { postApi, setPostReaction } from "store/reducers/post";
import parse from "html-react-parser";
import { setCommentEditor } from "store/reducers/commenteditor";
import UserImage from "../components/UserImage";
import { supabase } from "backend";
import { requireLogin } from "store/reducers/user";

const Post: FC = () => {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const id = params?.id;
  const user = useSelector((state: RootState) => state.user.data);
  const [viewed, setViewed] = useState(false);

  if (!id) return;

  const dispatch = useDispatch() as AppDispatch;

  const post = useSelector((state: RootState) => state.post.element.data[id]);

  const comments = useSelector(
    (state: RootState) => state.post.comments.data[id]
  );
  const commentsCount = useSelector(
    (state: RootState) => state.post.comments.count[id]
  );

  const likeTimer = useRef<any>();

  const methods = {
    like() {
      if (user?.id) {
        dispatch(
          setPostReaction({
            post_id: post?.id,
            type: "like",
          })
        );
        clearTimeout(likeTimer.current);
        likeTimer.current = setTimeout(() => {
          dispatch(postApi.like(post?.id));
        }, 1000);
      } else {
        dispatch(requireLogin(true));
      }
    },
  };

  useEffect(() => {
    dispatch(postApi.get(id));
  }, []);

  useEffect(() => {
    if (post && user?.id && !post?.viewed?.[0] && !viewed) {
      setViewed(true);
      supabase.from("views").upsert({ user_id: user?.id, post_id: id }).then();
    }
  }, [post]);

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
                  <button
                    className="group-btn"
                    onClick={() => {
                      methods.like();
                    }}
                  >
                    <span
                      className={`material-symbols-outlined bold like icon ${
                        reaction === "like" && "filled"
                      }`}
                    >
                      favorite
                    </span>
                  </button>
                  <button
                    className="group-btn"
                    disabled={copied}
                    onClick={() => {
                      setCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  >
                    <span className="label" data-visible={copied}>
                      Link copied!
                    </span>
                    <span className="material-symbols-outlined icon bold">
                      link
                    </span>
                  </button>
                </div>
              </div>

              <div className="info-list">
                <div className="info">
                  <div className="info-subtitle">created</div>
                  <div className="info-user">
                    <div className="info-user-img">
                      <UserImage src={post?.user?.img} alt={post?.user?.name} />
                    </div>
                    <div className="info-user-title">
                      {utils.timeAgo(post?.created_at)}
                    </div>
                  </div>
                </div>

                <div className="info">
                  <div className="info-title">{commentsCount}</div>
                  <div className="info-subtitle">replies</div>
                </div>

                <div className="info">
                  <div className="info-title">{post?.views?.[0]?.count}</div>
                  <div className="info-subtitle">views</div>
                </div>

                <div className="info">
                  <div className="info-title">
                    {reaction === "like"
                      ? post?.likes?.[0]?.count + 1
                      : post?.likes?.[0]?.count}
                  </div>
                  <div className="info-subtitle">hearts</div>
                </div>

                {/*  */}
              </div>
            </div>
          </div>
          <Comments>
            <Comments>
              <CommentEditor />
              {/*  */}
              <ul>
                {comments?.length > 0
                  ? comments.map((item: any) => (
                      <li key={item.id}>
                        <Comment element={item} id={id} />
                      </li>
                    ))
                  : null}
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
      background-color: var(--element-color);
      border-radius: 50%;
      opacity: 0.9;

      .alt {
        font-size: 22px;
        color: white;
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
        justify-content: flex-end;
        margin-bottom: 5px;

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
            height: 35px;
            aspect-ratio: 1/1;
            cursor: pointer;
            border: none;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50px;
            transition: 0.2s;

            &:hover {
              background: var(--element-color);

              .icon {
                color: white !important;
              }
            }

            &:disabled {
              .icon {
                color: var(--element-color);
              }
            }

            .label {
              display: none;
              position: absolute;
              top: 0;
              left: 50%;
              transform: translate(-50%, -100%);
              white-space: nowrap;
              color: var(--element-color);

              &[data-visible="true"] {
                display: block;
              }
            }

            .icon {
              font-size: 23px;
              color: var(--text-color);
              line-height: 0;

              &.like {
                color: var(--red-color);
              }
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

      .info-list {
        padding: 7px 10px;
        border: 1px solid var(--border-color);
        display: flex;
        background: var(--secondary-element-background);
        border-radius: 15px;
        column-gap: 25px;

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;

          .info-title {
            color: var(--text-color);
            font-size: 20px;
            font-family: var(--font-regular);
          }

          .info-subtitle {
            color: var(--text-color);
            font-size: 14px;
            font-family: var(--font-regular);
            opacity: 0.8;
          }

          .info-user {
            width: 100%;
            display: flex;
            align-items: center;
            column-gap: 8px;
            margin-top: 2px;

            .info-user-img {
              background: var(--element-color);
              border-radius: 50%;
              opacity: 0.9;
              height: 25px;
              aspect-ratio: 1/1;

              .alt {
                color: white;
                font-size: 14px;
                font-family: var(--font-regular);
              }
            }

            .info-user-title {
              color: var(--title-color);
              font-size: 18px;
              font-family: var(--font-regular);
            }
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
