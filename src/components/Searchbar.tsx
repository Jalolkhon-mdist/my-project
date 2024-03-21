import React, { FC, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Searchbar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get("text") || "";

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
    <div id="Searchbar">
      <div className="content">
        <form onSubmit={submit}>
          <span className="material-symbols-outlined icon">search</span>
          {/*  */}
          <input
            type="text"
            name="text"
            placeholder="Search"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/*  */}
          {/*  */}
        </form>
        <button data-hidden={value.length === 0} onClick={clearInput}>
          <span className="material-symbols-outlined icon">close</span>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
