import { FC, useContext } from "react";
import styled from "styled-components";
import utils from "utils";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Options from "../ui/Options";
import { useDispatch, useSelector } from "react-redux";
import { postApi } from "store/reducers/post";
import { AppDispatch, RootState } from "store";
import { UIContext } from "ui";

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
      navigate(`/edit/${elem.id}`);
      setId(0);
    },
  };

  return (
    <Container>
      <Content>
        <div
          className="post box-style"
          onClick={() => navigate(`/post/${elem.id}`)}
        >
          <div className="post-container">
            {/*  */}
            <div className="options">
              {elem.user_id === user?.id ? (
                <Options
                  options={[
                    {
                      icon: "edit",
                      label: "Update",
                      onClick: () => methods.update(),
                    },
                    {
                      icon: "delete",
                      label: "Delete",
                      onClick: () => methods.delete(),
                    },
                  ]}
                />
              ) : null}
            </div>
            {/*  */}
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
            <div className="post-content">{parse(elem.content)}</div>
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
                <p>{utils.count(elem?.likes?.[0]?.count)}</p>
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
                <span className="material-symbols-outlined icon">comment</span>
                <p>{elem?.comments?.[0]?.count}</p>
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
    cursor: pointer;

    .post-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;

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
`;
