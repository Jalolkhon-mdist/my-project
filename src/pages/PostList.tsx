import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import PostCard from "../components/PostCard";

const PostList: FC = () => {
  const posts = useSelector((state: RootState) => state.post.list.data);

  return (
    <Container>
      <Content>
        <ul className="post-list">
          {posts?.map((elem, key) => {
            return (
              <li key={key} className="post">
                <PostCard elem={elem} />
              </li>
            );
          })}
        </ul>
        <div className="page-info"></div>
      </Content>
    </Container>
  );
};

export default PostList;

const Container = styled.div``;

const Content = styled.div`
  .post-list {
    width: 100%;
    border-top: 0.5px solid var(--border-color-dark);
    margin-top: 50px;
  }
`;
