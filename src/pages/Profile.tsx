import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import UserImage from "../components/UserImage";
import { profileApi } from "store/reducers/profile";
import PostCard from "../components/PostCard";

const Profile: FC = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch() as AppDispatch;

  if (!id) return;

  const metadata = useSelector((state: RootState) => state.profile.data[id]);
  const user = useSelector((state: RootState) => state.user.data);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(profileApi.get(id));
  }, []);

  if (metadata)
    return (
      <Container>
        <Content>
          <Header>
            <div className="img">
              <UserImage src={metadata?.img} alt={metadata?.name} />
            </div>
            <h1 className="name">{metadata?.name}</h1>
          </Header>
          <Body>
            <h2 className="title">Posts</h2>
            <div className="add-btn-wrapper">
              {metadata?.id === user?.id ? (
                <button
                  className="add-btn"
                  onClick={() => {
                    if (metadata?.id) {
                      navigate("/create");
                    }
                  }}
                >
                  Add New Post
                </button>
              ) : null}
            </div>
            <ul>
              {" "}
              {metadata?.posts
                ? metadata.posts.map((elem: any, key: number) => {
                    return (
                      <li key={key}>
                        <PostCard elem={elem} />
                      </li>
                    );
                  })
                : null}
            </ul>
          </Body>
        </Content>
      </Container>
    );
};

export default Profile;

const Container = styled.div`
  max-width: 1000px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const Content = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 30px;
  align-items: center;
  margin-bottom: 40px;

  .img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--element-background);

    .alt {
      font-size: 50px;
    }
  }

  .name {
    font-size: 20px;
    font-family: var(--font-medium);
    font-weight: normal;
    color: var(--title-color);
  }
`;

const Body = styled.div`
  .add-btn-wrapper {
    border-bottom: 0.5px solid var(--border-color);
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;

    .add-btn {
      padding: 7px 20px;
      background: var(--element-color);
      border-radius: 5px;
      color: white;
      font-size: 14px;
      font-family: var(--font-medium);
      cursor: pointer;
    }
  }

  .title {
    font-family: var(--font-medium);
    font-size: 20px;
    color: var(--title-color);
    font-weight: normal;
    margin-bottom: 20px;
  }
`;
