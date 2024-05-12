import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import UserImage from "./UserImage";
import utils from "utils";
import Options from "../ui/Options";
import { userApi } from "store/reducers/user";
import { setCreateModal } from "store/reducers/post";

const Navbar: FC = () => {
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;

  return (
    <Container id="Navbar">
      <div>
        <Content className="content">
          <div className="left">
            <div className="logo">
              <NavLink to={"/"}>
                <strong className="left">SC</strong>
                <strong>
                  Social <br /> Club
                </strong>
              </NavLink>
            </div>
            <ul className="group-list">
              {utils.categories.map((group) => {
                return (
                  <li className="group" key={group.label}>
                    <p className="group-label">{group.label}</p>
                    <div className="category-list">
                      {group.value.map((e, idx) => {
                        return (
                          <div key={idx} className="category">
                            <Link to={{ pathname: '/', search: `category=${group.label}, ${e.label}` }}>
                              <p>{e.label}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/*  */}
          <div className="right">
            {user?.id ? (
              <Options
                parent={
                  <div className="account">
                    <div className="account-img">
                      <UserImage src={metadata?.img} alt={metadata?.name} />
                    </div>
                  </div>
                }
                options={[
                  {
                    label: "New post",
                    icon: "add",
                    onClick: () => {
                      dispatch(setCreateModal({ open: true }));
                    },
                  },
                  {
                    label: "Profile",
                    icon: "person",
                    onClick: () => {
                      navigate(`/profile/${user?.id}`);
                    },
                  },
                  {
                    label: "Log Out",
                    icon: "logout",
                    onClick: () => {
                      dispatch(userApi.signOut());
                    },
                  },
                ]}
              />
            ) : (
              <ul className="link-list">
                <li className="link">
                  <Link to={`/login?type=sign-up`} className="custom-btn">
                    Sign Up
                  </Link>
                </li>
                <li className="link">
                  <Link to={`/login`} className="custom-btn">
                    <span className="material-symbols-outlined filled custom-btn-icon">
                      person
                    </span>
                    Log In
                  </Link>
                </li>
              </ul>
            )}
          </div>
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
  background-color: var(--element-background);
  z-index: 1000;
  border-bottom: 0.5px solid var(--border-color);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

const Content = styled.div`
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--navbar-height);

  .left {
    display: flex;
    align-items: center;
    column-gap: 20px;

    .logo {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        color: var(--title-color);
        text-transform: uppercase;
        display: flex;

        .left {
          font-size: 38px;
          line-height: 0;
          color: var(--element-color);
          border-right: 1px solid var(--border-color-dark);
          padding: 5px;
          margin-right: 5px;
        }
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .group-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 20px;

      .group {
        position: relative;
        font-size: 14px;
        color: var(--text-color);
        cursor: pointer;
        padding: 10px 0;

        &:hover {
          .category-list {
            display: block;
          }
        }

        .category-list {
          background: var(--element-background);
          border: 1px solid var(--border-color);
          box-shadow: 0 12px 12px rgba(0, 0, 0, 0.15);
          padding: 7px;
          display: none;
          position: absolute;
          top: calc(100%);
          min-width: 200px;
          left: 0;

          &:hover {
            display: block;
          }

          .category {
            padding: 7px;

            &:hover {
              background: var(--element-color);

              a {
                color: white;
              }
            }

            a {
              font-size: 14px;
              color: var(--text-color);
              white-space: nowrap;
              width: 100%;
            }
          }
        }
      }
    }
  }

  .right {
    .account {
      .account-img {
        height: 35px;
        aspect-ratio: 1/1;
        background: var(--element-color);
        border-radius: 50%;

        .alt {
          color: white;
          font-size: 16px;
        }
      }
    }

    .link-list {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
  }
`;
