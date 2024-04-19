import React, { FC, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Searchbar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get("text") || "";
  const [focus, setFocus] = useState(false);

  const [value, setValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams((prev) => ({ ...prev, text: value }));
    inputRef.current?.blur();
  }

  function clearInput(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <Container>
      <Content data-focus={focus}>
        <form onSubmit={submit}>
          <span className="material-symbols-outlined icon">search</span>
          {/*  */}
          <input
            type="text"
            name="text"
            placeholder="Search"
            ref={inputRef}
            value={value}
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            onChange={(e) => setValue(e.target.value)}
          />
          {/*  */}
          {/*  */}
        </form>
        <button data-hidden={value.length === 0} onClick={clearInput}>
          <span className="material-symbols-outlined icon">close</span>
        </button>
      </Content>
    </Container>
  );
};

export default Searchbar;

const Container = styled.div`
  max-width: 550px;
  width: 100%;
  height: 40px;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 12px;
  border-radius: 100px;
  border: 1px solid var(--border-color-dark);
  background-color: var(--element-background);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &[data-focus="true"] {
    background-color: var(--element-background-hover);
  }

  .icon {
    font-size: 22px;
    cursor: default;
    color: var(--icon-color);
  }

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      padding: 10px 0;
      padding-left: 5px;
      color: var(--title-color);
      font-size: 14px;

      &::placeholder {
        color: #82959b;
        font-family: var(--font-regular);
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    &[data-hidden="true"] {
      visibility: hidden;
    }

    .icon {
      cursor: pointer;
    }
  }
`;
