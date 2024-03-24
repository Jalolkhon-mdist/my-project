import { FC } from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";

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
    <Container id="Navbar">
      <div>
        <Content className="content">
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
                    <span className="material-symbols-outlined icon">
                      expand_more
                    </span>
                  </div>
                </Dropdown>
              </button>
            </li>
          </ul>
          {/*  */}
        </Content>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--content-background);
  z-index: 1000;
  padding: 0 9px;
`;

const Content = styled.div`
  border-bottom: 0.5px solid var(--border-color);
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--navbar-height);

  .logo {
    * {
      font-size: 20px;
      text-decoration: none;
<<<<<<< HEAD
      color: var(--title-color);
=======
      color: $text-color;
>>>>>>> 4cd9569ad7189aa3bda1087c15c5d41457389b5f
    }
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    column-gap: 20px;

    li {
      button {
        cursor: pointer;

        span {
          font-size: 25px;
        }
      }

      [data-profile] {
        .dropdown {
          display: flex;
          align-items: center;
          column-gap: 10px;

          .icon {
            font-size: 25px;
          }

          .img {
            height: 40px;
            aspect-ratio: 1/1;
            background: $element-bg;
            border: 1px solid $border-color;
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
    }
  }
`;
