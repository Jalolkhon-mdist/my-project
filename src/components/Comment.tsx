import { FC, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Options } from "ui";
import CommentEditor from "./CommentEditor";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { setCommentReaction } from "store/reducers/post";
import { requireLogin } from "store/reducers/user";
import UserImage from "./UserImage";
import { postApi } from "store/reducers/post";
import utils from "utils";

interface Props {
  element: any;
  id: string;
}

const Comment: FC<Props> = ({ element }) => {
  const post_id = useParams()?.id || "";
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const [edit, setEdit] = useState(false);

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
      {edit ? (
        <CommentEditor
          onCancel={() => setEdit(false)}
          open={true}
          element={element}
        />
      ) : (
        <Content>
          <div className="img">
            <UserImage src={element?.user.img} alt={element?.user.name} />
          </div>
          <div className="comment-main-wrapper">
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
                    className={`material-symbols-outlined icon ${
                      element?.reaction?.[0]?.type === "like" && user?.id
                        ? "filled"
                        : ""
                    }`}
                  >
                    thumb_up
                  </span>
                </button>
                <button className="btn" onClick={() => methods.dislike()}>
                  <p>{methods.reactionsCount().dislikes}</p>
                  <span
                    className={`material-symbols-outlined icon ${
                      element?.reaction?.[0]?.type === "dislike" && user?.id
                        ? "filled"
                        : ""
                    }`}
                  >
                    thumb_down
                  </span>
                </button>
                <button className="btn">Respond</button>
              </div>
            </div>
          </div>
          <div>
            {user && element.user.id === user?.id ? (
              <Options
                options={[
                  {
                    icon: "edit",
                    label: "Edit",
                    onClick: () => setEdit(true),
                  },
                  {
                    icon: "delete",
                    label: "Delete",
                    onClick: () =>
                      dispatch(
                        postApi.comments.delete({
                          id: element.id,
                          post_id,
                        })
                      ),
                  },
                ]}
              />
            ) : null}
          </div>
        </Content>
      )}
    </Container>
  );
};

export default Comment;

const Container = styled.div``;

const Content = styled.div`
  padding: 15px 0;
  color: var(--text-color);
  display: flex;
  align-items: flex-start;

  .img {
    height: 30px;
    min-width: 30px;
    margin-right: 15px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--element-background);

    .alt {
      font-size: 16px;
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
          font-size: 13px;
          color: var(--title-color);
          font-family: var(--font-regular);

          .icon {
            font-size: 20px;
          }
        }
      }
    }
  }
`;
