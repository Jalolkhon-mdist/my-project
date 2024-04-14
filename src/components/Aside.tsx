import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import utils from "utils";

const Aside: FC = () => {
  return (
    <Container>
      <Content>
        <ul className="setting-list">
          <li className="setting-list-item">
            <div className="setting-list-item-content">
              <div className="profile">
                <div className="img">
                  <img src="" />
                </div>
                <p>Jalolkhon Makhmudov</p>
              </div>
            </div>
          </li>
          <li className="setting-list-item">
            <div className="setting-list-item-content">
              <span className="material-symbols-outlined icon">
                notifications
              </span>
              <p>Notifications</p>
            </div>
          </li>
          <li className="setting-list-item">
            <div className="setting-list-item-content">
              <span className="material-symbols-outlined icon">chat</span>
              <p>Notifications</p>
            </div>
          </li>
        </ul>
        <hr />
        <ul className="category-list">
          {utils.topics.map((elem, index) => {
            return (
              <li key={index} className="category-list-item">
                <Link to="/">
                  <div className="category-list-item-content">
                    <span className="material-symbols-outlined icon">
                      {elem.icon}
                    </span>
                    <p>{elem.name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Content>
    </Container>
  );
};

export default Aside;

const Container = styled.aside`
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  border-right: 0.5px solid var(--border-color);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 25px;

  hr {
    width: 100%;
    height: 0.5px;
    border: none;
    background: var(--border-color);
    margin: 22px 0;
  }

  .setting-list {
    .setting-list-item {
      .setting-list-item-content {
        display: flex;
        column-gap: 15px;
        color: var(--title-color);
        padding: 7px 0;
        font-size: 15px;

        .icon {
          font-size: 20px;
        }
      }
    }
  }

  .category-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    .category-list-item {
      a {
        text-decoration: none;
        color: var(--title-color);
        font-size: 14px;
      }

      .category-list-item-content {
        display: flex;
        align-items: center;
        column-gap: 15px;
        color: $text-color;

        .icon {
          font-size: 22px;
        }

        .profile {
          display: flex;
          align-items: center;
          column-gap: 15px;
          margin-bottom: 10px;

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
