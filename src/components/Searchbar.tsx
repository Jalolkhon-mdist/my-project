import { supabase } from "backend";
import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import UserImage from "./UserImage";

const Searchbar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get("text") || "";
  const [focus, setFocus] = useState(false);

  const [value, setValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const [accounts, setAccounts] = useState<any[]>();

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

  useEffect(() => {
    let timer: any;
    if (value.length > 0) {
      timer = setTimeout(() => {
        supabase.from('user_metadata').select('name, id').ilike('name', `${value}%`).limit(10).then((e) => {
          if (e.data) {
            setAccounts(e.data)
          }
        })
      }, 200);
    } else {
      setAccounts([])
    }

    return () => clearTimeout(timer);
  }, [value])

  return (
    <Container>
      {focus ? <div className="searchbar-bg" onClick={() => setFocus(false)}></div> : null}
      <Content data-focus={focus}>
        <div className="searchbar-top">
          <form onSubmit={submit}>
            <span className="material-symbols-outlined icon">search</span>
            {/*  */}
            <input
              type="text"
              name="text"
              placeholder="Search"
              ref={inputRef}
              value={value}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(e) => setValue(e.target.value)}
            />
            {/*  */}
            {/*  */}
          </form>
          <button data-hidden={value.length === 0} onClick={clearInput}>
            <span className="material-symbols-outlined icon">close</span>
          </button>
        </div>
        {focus && accounts && accounts?.length > 0 ? <div className="accounts">
          <div className="searchbar-list">
            {accounts.map((e) => {
              return <Link className="searchbar-list-item" to={`/profile/${e.id}`}><div className="user-img"><UserImage src='' alt={e.name} /></div> <div className="user-name">{e?.name}</div></Link>
            })}
          </div>
        </div> : null}
      </Content>
    </Container>
  );
};

export default Searchbar;

const Container = styled.div`
  max-width: 550px;
  width: 100%;
  height: 40px;
  z-index: 200;

  .searchbar-bg{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #00000014;
  }
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  border: 1px solid var(--border-color-dark);
  background-color: var(--element-background);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &[data-focus="true"] {
    background-color: var(--element-background);
  }

  .searchbar-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
  }
  
  .searchbar-list{
    background: var(--element-background);
    border: 1px solid var(--border-color-dark);
    padding: 7px 12px;
    position: absolute;
    width: 100%;
    border-radius: 10px;
    top: calc(100% + 5px);
    display: flex;
    flex-direction: column;

    .searchbar-list-item{
      padding: 7px 0;
      color: var(--text-color);
      display: flex;
      align-items: center;
      column-gap: 7px;

      .user-img{
        height: 25px;
        aspect-ratio: 1/1;
        background: var(--element-color);
        border-radius: 50%;

        .alt{
          color: white;
          font-size: 14px;
        }
      }
    }
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
