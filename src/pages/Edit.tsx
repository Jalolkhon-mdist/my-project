import { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Select } from "antd";
import utils from "utils";
import { postApi, setEditModal } from "store/reducers/post";
import Dropdown from "../components/Dropdown";
import { supabase } from "backend";

const Edit: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const open = useSelector((state: RootState) => state.post.editModal.open);
  const id = useSelector((state: RootState) => state.post.editModal.id);
  const user = useSelector((state: RootState) => state.user.data);
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .then((response) => {
          if (response.data?.[0]) {
            setPost(response.data[0]);
          }
        });
    }
  }, [id]);

  if (!user?.id || !id) {
    return;
  }

  async function submit() {
    await dispatch(postApi.update({ id: id!, post }));
    location.reload();
  }

  if (post)
    return (
      <Dropdown open={open}>
        <Container className="container">
          <Content>
            <div className="toolbar">
              <button>
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    dispatch(setEditModal({ open: false, id: null }));
                  }}
                >
                  expand_more
                </span>
              </button>
            </div>
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
              <p className="label">Group</p>
              <div className="categories-select">
                <Select
                  showSearch={true}
                  style={{ width: "100%" }}
                  value={post.category}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  onChange={(e) => {
                    setPost({ ...post, category: e });
                  }}
                >
                  {utils.categoriesList
                    .flat()
                    .map((item: any, index: number) => {
                      return (
                        <Select.Option
                          key={index}
                          value={`${item.group}, ${item.category}`}
                        >
                          <div className="option">
                            <div
                              className="color"
                              data-color={item?.color}
                            ></div>{" "}
                            {item.group}{" "}
                            <div
                              className="color"
                              data-color={item?.color}
                            ></div>{" "}
                            {item.category}
                          </div>
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
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
            <div className="btn-group">
              <button
                onClick={() =>
                  dispatch(setEditModal({ open: false, id: null }))
                }
                className="custom-btn red secondary"
              >
                Close
              </button>
              <button onClick={() => submit()} className="custom-btn">
                Submit
              </button>
            </div>
          </Content>
        </Container>
      </Dropdown>
    );
};

export default Edit;

const Container = styled.div`
  padding: 0;
  padding-bottom: 10px;
`;
const Content = styled.div`
  .toolbar {
    display: flex;
    justify-content: flex-end;

    button {
      cursor: pointer;
    }
  }

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

    .categories-select {
      .option {
        display: flex;
        align-items: center;
        column-gap: 7px;

        .color {
          height: 10px;
          aspect-ratio: 1/1;
          border-radius: 50%;
        }

        .color[data-color="red"] {
          background: var(--red-color);
        }

        .color[data-color="blue"] {
          background: var(--blue-color);
        }

        .color[data-color="green"] {
          background: var(--green-color);
        }

        .color[data-color="purple"] {
          background: var(--purple-color);
        }

        .color[data-color="orange"] {
          background: var(--orange-color);
        }
      }
    }

    .label {
      font-size: 14px;
      font-family: var(--font-medium);
      color: var(--title-color);
      margin-bottom: 3px;
    }

    .input {
      width: 100%;
      background: none;
      border: 1px solid var(--border-color-dark);
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
    column-gap: 7px;

    .custom-btn {
      padding: 0 25px;
    }
  }

  .quill {
    background: var(--element-background);
    border-radius: 1em;
    border: 1px solid var(--border-color-dark);

    .ql-toolbar {
      border: none;
      border-bottom: 1px solid var(--border-color-dark);
    }

    .ql-container {
      border: none;
    }

    .ql-editor {
      min-height: 300px;
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
