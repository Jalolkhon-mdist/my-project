import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  // const user = useSelector((state: RootState) => state.user.data);

  const joined = new Date(metadata?.created_at).toLocaleDateString();

  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(profileApi.get(id));
  }, []);

  if (metadata)
    return (
      <Container>
        <Content>
          <Header className="box-style">
            <div className="user">
              <div className="user-img">
                <UserImage src={metadata?.img} alt={metadata?.name} />
              </div>
              <h1 className="user-name">{metadata?.name}</h1>
            </div>
            <div className="header-info-list">
              <div className="header-info">
                <div>Joined </div>
                <span>{joined}</span>
              </div>
              <div className="header-info">
                <div>Posts </div>
                <span>{metadata?.posts?.length}</span>
              </div>
            </div>
          </Header>
          <Body>
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
  padding: 100px 20px;
  margin: 0 auto;
`;

const Content = styled.div``;

const Header = styled.div`
  .user {
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 20px;

    .user-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--element-color);

      .alt {
        font-size: 50px;
        color: white;
      }
    }

    .user-name {
      font-size: 20px;
      font-family: var(--font-medium);
      font-weight: normal;
      color: var(--title-color);
    }
  }

  .header-info-list {
    display: flex;
    align-items: center;
    background: var(--content-background);
    border-radius: 10px;
    padding: 15px 10px;
    column-gap: 15px;
    row-gap: 10px;

    .header-info {
      color: var(--text-color);
      font-size: 15px;
      display: flex;
      column-gap: 5px;

      span {
        color: var(--title-color);
        font-family: var(--font-medium);
      }
    }
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
