import { Select } from "antd";
import { supabase } from "backend";
import { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { postApi } from "store/reducers/post";
import styled from "styled-components";
import utils from "utils";

const Edit: FC = () => {
  const [post, setPost] = useState<null | any>(null);
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  const id = useParams()?.id;
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    function fetchData() {
      supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .then(({ data }) => {
          if (data) {
            if (data[0]?.user_id !== user?.id) {
              navigate("/login");
              return;
            } else {
              setPost(data[0]);
            }
          }
        });
    }

    fetchData();
  }, []);

  const categories = utils.topics.map((e) => {
    return { value: e.name, label: e.name };
  });

  async function submit() {
    await dispatch(postApi.update({ id: post.id, post }));
    navigate(`/profile/${user?.id}`);
  }

  if (post && post.user_id === user?.id)
    return (
      <Container className="container">
        <Content>
          <h1 className="title">Create new post</h1>
          <div className="input-wrapper">
            <p className="label">Category</p>
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
            <button onClick={() => submit()} className="custom-btn">
              Submit
            </button>
          </div>
        </Content>
      </Container>
    );
};

export default Edit;

const Container = styled.div`
  padding: 100px 20px;
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
      background: var(--element-background);
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;

    .custom-btn {
      padding: 0 25px;
    }
  }

  .quill {
    background: var(--element-background);
    border-radius: 1em;

    .ql-toolbar {
      border: none;
      border-bottom: 1px solid var(--border-color);
    }

    .ql-container {
      border: none;
      min-height: 300px;
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
