import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserImage from "./UserImage";
import { postApi } from "store/reducers/post";
import Dropdown from "./Dropdown";
import { setCommentEditor } from "store/reducers/commenteditor";

interface Props {
  onCancel?: () => void;
}

const CommentEditor: FC<Props> = ({ onCancel }) => {
  const post_id = useParams()?.id || "";
  const editor = useSelector((state: RootState) => state.commenteditor);
  const element = editor.element;
  const open = editor.open;
  const user = useSelector((state: RootState) => state.user.data);
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const ref = useRef<HTMLDivElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  function onInput() {
    if (ref.current && ref.current.textContent) {
      if (ref.current.textContent?.trim().length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }

  function cancel() {
    dispatch(setCommentEditor({ element: null, open: false }));

    if (onCancel) {
      onCancel();
    }
    if (ref.current && ref.current.textContent) {
      ref.current.textContent = "";
    }
  }

  useEffect(() => {
    ref.current?.focus();

    if (element && ref.current) {
      ref.current.innerHTML = element?.text;
    }
  }, [element, open]);

  function submit() {
    const value = ref.current?.innerHTML;

    if (value) {
      if (element) {
        dispatch(
          postApi.comments.update({
            post_id,
            id: element.id,
            value: value.trim(),
          })
        ).then(() => {
          cancel();
        });
      } else {
        dispatch(postApi.comments.post({ post_id, value: value.trim() })).then(
          () => {
            cancel();
          }
        );
      }
    }
  }

  if (user && user.id) {
    return (
      <Dropdown open={open}>
        <Container>
          <div className="new-comment">
            <div className="body">
              <div className="img">
                <UserImage src={metadata?.img} alt={metadata?.name} />
              </div>
              <div className="comment-input-wrapper">
                <div
                  className="comment-input"
                  contentEditable={true}
                  onInput={onInput}
                  ref={ref}
                  role="textbox"
                ></div>
              </div>
            </div>
            <div className="footer">
              <div className="buttons-wrapper">
                <button className="custom-btn secondary red" onClick={cancel}>
                  Cancel
                </button>
                <button
                  className="custom-btn"
                  disabled={disabled}
                  data-primary
                  onClick={submit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Dropdown>
    );
  }
};

export default CommentEditor;

const Container = styled.div`
  padding: 20px;

  .new-comment {
    width: 100%;

    .body {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      width: 100%;

      .img {
        height: 50px;
        min-width: 50px;
        margin-right: 15px;
        border-radius: 50%;
        overflow: hidden;
        background: var(--element-background-hover);

        .alt {
          font-size: 22px;
        }
      }

      .comment-input-wrapper {
        flex: 1;
        overflow: hidden;

        .comment-input {
          border: none;
          background: none;
          outline: none;
          resize: none;
          border-bottom: 1px solid var(--border-color);
          padding: 5px 0;
          font-family: var(--font-regular);
          color: var(--text-color);
          font-size: 14px;
          transition: 0.1s;

          &::placeholder {
            color: var(--placeholder-color);
          }

          &:focus {
            border-bottom: 0.5px solid var(--border-color-dark);
          }
        }
      }
    }

    .footer {
      margin-bottom: 5px;

      .buttons-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 5px;

        .custom-btn {
          padding: 0 15px;
          color: white;

          &.red {
            color: var(--red-color);

            &:hover {
              color: white;
            }
          }
        }
      }
    }

    .footer-margin {
      margin-bottom: 25px;
    }
  }

  .warning {
    border: 1px solid var(--border-color-dark);
    background: none;
    padding: 7px 13px;
    padding-left: 5px;
    cursor: pointer;
    border-radius: 30px;
    display: flex;
    align-items: center;
    column-gap: 1px;

    &:hover {
      border-color: var(--element-color-hover);

      * {
        color: var(--element-color-hover);
      }
    }

    * {
      color: var(--text-color);
    }

    .icon {
      line-height: 0;
      font-size: 25px;
    }

    span {
      font-size: 14px;
    }
  }
`;
