import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Aside: FC = () => {
  return (
    <Container>
      <Content className="box-style">
        <Link to={`/g`} className="custom-btn secondary">
          Join Groups
        </Link>
      </Content>
    </Container>
  );
};

export default Aside;

const Container = styled.aside`
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

  .custom-btn {
    width: 100%;
    font-size: 16px;
  }
`;
