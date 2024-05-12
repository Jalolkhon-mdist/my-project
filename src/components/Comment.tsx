import { FC, useMemo, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { setCommentReaction } from "store/reducers/post";
import { requireLogin } from "store/reducers/user";
import UserImage from "./UserImage";
import { postApi } from "store/reducers/post";
import utils from "utils";
import { setCommentEditor } from "store/reducers/commenteditor";

interface Props {
  element: any;
  id: string;
}

const Comment: FC<Props> = ({ element }) => {
  const post_id = useParams()?.id || "";
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const timeAgo = useMemo(
    () => utils.timeAgo(element.created_at),
    [element.created_at]
  );
  const likeTimer = useRef<any>();

  const methods = {
    like() {
      if (user?.id) {
        dispatch(
          setCommentReaction({
            comment_id: element.id,
            post_id,
            type: "like",
          })
        );
        clearTimeout(likeTimer.current);
        likeTimer.current = setTimeout(() => {
          dispatch(postApi.comments.like({ post_id, comment_id: element.id }));
        }, 1000);
      } else {
        dispatch(requireLogin(true));
      }
    },
    dislike() {
      if (user?.id) {
        dispatch(
          setCommentReaction({
            comment_id: element.id,
            post_id,
            type: "dislike",
          })
        );
        clearTimeout(likeTimer.current);
        likeTimer.current = setTimeout(() => {
          dispatch(postApi.comments.like({ post_id, comment_id: element.id }));
        }, 1000);
      } else {
        dispatch(requireLogin(true));
      }
    },
    reactionsCount() {
      const reaction = element?.reaction?.[0]?.type;
      const likesCount = element.likes[0]?.count;
      const dislikesCount = element.dislikes[0]?.count;
      let likes;
      let dislikes;

      if (reaction === "like") {
        likes = likesCount + 1;
      } else {
        likes = likesCount;
      }

      if (reaction === "dislike") {
        dislikes = dislikesCount + 1;
      } else {
        dislikes = dislikesCount;
      }

      return {
        likes,
        dislikes,
      };
    },
  };

  return (
    <Container>
      <Content>
        <div className="img">
          <UserImage src={element?.user.img} alt={element?.user.name} />
        </div>
        <div className="comment-main-wrapper box-style">
          <div className="comment-main">
            <div className="header">
              <div className="name">{element.user?.name}</div>
              <div>{timeAgo}</div>
              <div>{element?.changed ? "(changed)" : ""}</div>
            </div>
            <div className="body">
              <div className="text">{parse(element?.text)}</div>
            </div>
            <div className="footer">
              <button className="btn" onClick={() => methods.like()}>
                <p>{methods.reactionsCount().likes}</p>
                <span
                  className={`material-symbols-outlined bold icon ${element?.reaction?.[0]?.type === "like" && user?.id
                    ? "filled"
                    : ""
                    }`}
                >
                  favorite
                </span>
              </button>
            </div>
            {user && element.user.id === user?.id ? (
              <div className="options">
                <button
                  className="custom-btn secondary"
                  onClick={() => {
                    dispatch(setCommentEditor({ element, open: true }));
                  }}
                >
                  Edit
                </button>
                <button
                  className="custom-btn secondary red"
                  onClick={() => {
                    dispatch(
                      postApi.comments.delete({
                        id: element.id,
                        post_id,
                      })
                    );

                    dispatch(setCommentEditor({ element: null, open: false }));
                  }}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin: 15px 0;
`;

const Content = styled.div`
  color: var(--text-color);
  display: flex;
  align-items: flex-start;

  .img {
    height: 50px;
    min-width: 50px;
    margin-right: 15px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--element-background);

    .alt {
      font-size: 22px;
    }
  }

  .comment-main-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .comment-main {
      width: 100%;

      .header {
        display: flex;
        column-gap: 7px;
        font-size: 12px;
        align-items: center;
        margin-bottom: 3px;
        font-family: var(--font-regular);

        .name {
          font-family: var(--font-semiBold);
          color: var(--title-color);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: normal;
          font-size: 16px;

          @media screen and (max-width: 700px) {
            font-size: 13px;
          }
        }
      }

      .body {
        font-size: 14px;
        font-family: var(--font-regular);
      }

      .footer {
        display: flex;
        align-items: center;
        column-gap: 15px;
        margin-top: 15px;

        .btn {
          background: none;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          color: var(--title-color);
          font-family: var(--font-regular);

          .icon {
            font-size: 20px;
            color: #ff3333;
          }
        }
      }

      .options {
        display: flex;
        column-gap: 5px;
        margin-top: 15px;

        .custom-btn {
          padding: 0 15px;
          height: 35px;
        }
      }
    }
  }
`;
