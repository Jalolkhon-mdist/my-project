import { FC } from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

const Navbar: FC = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "item1",
    },
    {
      key: "2",
      label: "item2",
    },
    {
      key: "3",
      label: "item3",
    },
  ];

  return (
    <nav id="Navbar">
      <div className="container">
        <div className="content">
          <div className="logo">
            <NavLink to={"/"}>Logo</NavLink>
          </div>
          <Searchbar />
          {/*  */}
          <ul>
            <li>
              <button>
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </li>
            <li>
              <button>
                <span className="material-symbols-outlined">chat</span>
              </button>
            </li>
            <li>
              <button data-profile>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <div className="dropdown">
                    <div className="img">
                      <img src="" />
                    </div>
                    <span className="material-symbols-outlined icon">expand_more</span>
                  </div>
                </Dropdown>
              </button>
            </li>
          </ul>
          {/*  */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
