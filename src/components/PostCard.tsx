import { FC, useContext } from "react";
import styled from "styled-components";
import utils from "utils";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postApi, setEditModal } from "store/reducers/post";
import { AppDispatch, RootState } from "store";
import { UIContext } from "ui";
import UserImage from "./UserImage";

interface Props {
  elem: any;
}

const PostCard: FC<Props> = ({ elem }) => {
  const reaction = elem?.reaction?.[0]?.type;
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const user = useSelector((state: RootState) => state.user.data);
  const { setId } = useContext(UIContext);

  const methods = {
    delete: async function () {
      await dispatch(postApi.delete(elem.id));
      setId(0);
    },
    update: async function () {
      dispatch(setEditModal({ open: true, id: elem?.id }));
      setId(0);
    },
  };

  if (elem)
    return (
      <Container>
        <Content>
          <div
            className="post box-style"
            onClick={() => navigate(`/post/${elem.id}`)}
          >
            <div className="post-container">
              <div className="category">{elem?.category}</div>
              <div className="user">
                <div className="user-left">
                  <div className="user-img">
                    <UserImage src={elem?.user?.img} alt={elem?.user?.name} />
                  </div>
                </div>
                <div className="user-right">
                  <div className="user-name">{elem.user.name}</div>
                  <div className="user-post-created-at">
                    Created {utils.timeAgo(elem.created_at)}
                  </div>
                </div>
              </div>
              <h3 className="title">{elem.title}</h3>
              <div className="post-content-wrapper">
                <div className="post-content">{parse(elem.content)}</div>
                {user && elem.user.id === user?.id ? (
                  <div className="post-options">
                    <button
                      className="custom-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        methods.update();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="custom-btn secondary red"
                      onClick={(e) => {
                        e.stopPropagation();
                        methods.delete();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="post-info">
                <div className="info-group">
                  <div className="info">
                    <p>{elem?.views?.[0]?.count}</p>
                    <span
                      className={`material-symbols-outlined icon ${
                        reaction?.type === "like" && "filled"
                      }`}
                    >
                      visibility
                    </span>
                  </div>
                  <div className="info">
                    <p>{elem?.likes?.[0]?.count}</p>
                    <span
                      className={`material-symbols-outlined icon ${
                        reaction?.type === "like" && "filled"
                      }`}
                    >
                      favorite
                    </span>
                  </div>
                </div>
                <div className="info-group">
                  <div className="info">
                    <p>{utils.timeAgo(elem.created_at)}</p>
                    <span className="material-symbols-outlined icon">
                      history
                    </span>
                  </div>
                  <div className="info">
                    <p>{elem?.comments?.[0]?.count}</p>
                    <span className="material-symbols-outlined icon">
                      chat_bubble
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Container>
    );
};

export default PostCard;

const Container = styled.div``;
const Content = styled.div`
  .post {
    width: 100%;
    margin: 15px 0;
    padding: 10px 20px 10px;
    cursor: pointer;

    .post-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;

      .category {
        text-align: right;
        font-size: 13px;
        color: var(--text-color);
        opacity: 0.8;
      }

      .options {
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .user {
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-bottom: 10px;

        .user-left {
          .user-img {
            height: 45px;
            aspect-ratio: 1/1;
            background-color: var(--element-color);
            border-radius: 50%;
            overflow: hidden;
            opacity: 0.9;

            .alt {
              font-size: 20px;
              color: white;
            }
          }
        }

        .user-right {
          .user-name {
            font-family: var(--font-bold);
            font-size: 15px;
            color: var(--title-color);
            opacity: 0.9;
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
        color: var(--element-color);
        font-weight: normal;
        font-family: var(--font-regular);
        font-size: 22px;

        &:hover {
          text-decoration: underline;
        }
      }

      .post-content-wrapper {
        border-bottom: 1px solid var(--border-color);
        padding: 10px 0;
        margin-bottom: 10px;
        width: 100%;

        .post-content {
          overflow: hidden;
          font-size: 15px;
          color: var(--text-color);

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .post-options {
          display: flex;
          column-gap: 5px;
          margin-top: 15px;

          .custom-btn {
            padding: 0 15px;
            height: 35px;
          }
        }
      }

      .post-info {
        display: flex;
        justify-content: space-between;

        .info-group {
          display: flex;
          justify-content: flex-end;
          column-gap: 7px;

          .info {
            display: flex;
            align-items: center;
            background: var(--element-background);
            border-radius: 50px;

            p {
              padding: 0 2px;
              font-size: 13px;
              font-family: var(--font-medium);
              color: var(--text-color);
            }

            .icon {
              font-size: 18px;
              color: var(--text-color);
              line-height: 0;
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
