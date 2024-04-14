import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import UserImage from "./UserImage";

const Navbar: FC = () => {
  const metadata = useSelector((state: RootState) => state.user.metadata);
  const user = useSelector((state: RootState) => state.user.data);
  console.log(metadata);

  return (
    <Container id="Navbar">
      <div>
        <Content className="content">
          <div className="logo">
            <NavLink to={"/"}>Logo</NavLink>
          </div>
          <Searchbar />
          {/*  */}
          <div className="right">
            <div className="profile">
              <Link to={`profile/${user?.id}`} data-profile>
                <div className="user-img">
                  <UserImage src={metadata?.img} alt={metadata?.name} />
                </div>
              </Link>
            </div>
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
    }
  }

  .right {
    .profile {
      .user-img {
        height: 30px;
        border-radius: 50%;
        background: var(--element-background);
        border: 1px solid var(--border-color-light);

        .alt {
          font-size: 16px;
        }
      }
    }
  }
`;
