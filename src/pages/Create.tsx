import { FC, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Navigate, useNavigate } from "react-router-dom";
import { Select } from "antd";
import utils from "utils";
import { postApi } from "store/reducers/post";

const Create: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);
  const [post, setPost] = useState({ title: "", content: "", category: [] });

  if (!user?.id) {
    return <Navigate to={"/login"} />;
  }

  const categories = utils.topics.map((e) => {
    return { value: e.name, label: e.name };
  });

  async function submit() {
    await dispatch(postApi.post(post));
    navigate(`/profile/${user?.id}`);
  }

  return (
    <Container className="container">
      <Content>
        <h1 className="title">Create new post</h1>
        <div className="input-wrapper">
          <p className="label">Title</p>
          <input
            className="input"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div className="input-wrapper">
          <p className="label">Content</p>
          <ReactQuill
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e })}
            modules={utils.editorConfig.modules}
            formats={utils.editorConfig.formats}
          />
        </div>
        <div className="input-wrapper">
          <p className="label">Title</p>
          <Select
            options={categories}
            mode="tags"
            style={{ width: "100%" }}
            value={post.category}
            onChange={(e) => {
              setPost({ ...post, category: e });
            }}
          />
        </div>
        <div className="btn-group">
          <button onClick={() => submit()}>Submit</button>
        </div>
      </Content>
    </Container>
  );
};

export default Create;

const Container = styled.div`
  padding: 40px 20px;
`;
const Content = styled.div`
  .title {
    font-size: 20px;
    color: var(--title-color);
    font-family: var(--font-medium);
    font-weight: normal;
    margin-bottom: 20px;
  }

  .input-wrapper {
    width: 100%;
    margin-bottom: 20px;

    .label {
      font-size: 14px;
      font-family: var(--font-medium);
      color: var(--title-color);
      margin-bottom: 3px;
    }

    .input {
      width: 100%;
      background: none;
      border: 1px solid var(--border-color);
      outline: none;
      padding: 7px 10px;
      font-size: 14px;
      font-family: var(--font-regular);
      color: var(--text-color);
      border-radius: 5px;
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;

    button {
      padding: 8px 30px;
      font-size: 14px;
      font-family: var(--font-medium);
      color: var(--text-color);
      font-weight: normal;
      border: 1px solid var(--border-color);
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background: var(--element-color);
        color: white;
      }
    }
  }

  .quill {
    .ql-toolbar {
      border-color: var(--border-color);
    }

    .ql-container {
      border-color: var(--border-color);
    }

    .ql-editor {
      color: var(--text-color);
    }
  }

  .ck-editor {
    background: none;

    .ck-editor__top {
      .ck-sticky-panel {
        .ck-sticky-panel__content {
          .ck-toolbar_grouping {
            background: none;
            border-radius: 50px;
            border-color: var(--border-color-light) !important;
            border-bottom: 1px solid var(--border-color-light);

            .ck-icon {
              color: var(--text-color);
            }

            .ck-input {
              background: var(--element-background-hover);
              color: var(--text-color);
            }

            .ck-dropdown__panel {
              background: var(--element-background);

              .ck-insert-table-dropdown__label {
                color: var(--text-color);
              }

              .ck-labeled-field-view__status {
                color: var(--text-color);
              }
            }

            .ck-button {
              &:hover {
                background: var(--element-background-hover);
                cursor: pointer;
              }

              &.ck-on {
                background: var(--element-color);
              }
            }

            .ck-button__label {
              color: var(--text-color);
            }

            .ck-button_with-text {
              background: var(--main-background);
              outline: none;

              &[aria-checked="true"] {
                background: var(--element-color);
              }
            }
          }
        }
      }
    }

    .ck-content {
      background: none;
      padding-left: 0;
      padding-right: 0;
      border: none;
      border-bottom: 1px solid var(--border-color) !important;
      border-radius: 0 !important;
      font-size: 14px;

      * {
        font-size: var(--font-regalar);
        color: var(--text-color);
      }

      &.ck-focused {
        border: none;
        border-bottom: 1px solid var(--border-color-light) !important;
      }

      ul {
        list-style: decimal;
      }
    }
  }
`;
