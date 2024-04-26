import { FC } from "react";
import styled from "styled-components";

interface Props {
  children: any;
  open: boolean;
}

const Dropdown: FC<Props> = ({ children, open }) => {
  return (
    <Container className="box-style" data-open={open}>
      {children}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  box-shadow: 0 -1px 40px rgba(0, 0, 0, 0.12);
  position: fixed;
  bottom: 0;
  max-width: 1000px;
  width: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 900;
  display: none;
  animation: dropdown-up 0.5s forwards;
  transform: translateY(100%);

  @keyframes dropdown-up {
    100% {
      transform: translateY(0);
    }
  }

  &[data-open="true"] {
    display: block;
  }
`;
