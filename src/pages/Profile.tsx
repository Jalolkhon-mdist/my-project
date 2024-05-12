import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import UserImage from "../components/UserImage";
import { profileApi } from "store/reducers/profile";
import PostCard from "../components/PostCard";
import { Input } from "antd";
import { userApi } from "store/reducers/user";

const Profile: FC = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch() as AppDispatch;
  const [nameEdit, setNameEdit] = useState(false);
  const [username, setUsername] = useState('');

  if (!id) return;

  const metadata = useSelector((state: RootState) => state.profile.data[id]);
  const user = useSelector((state: RootState) => state.user.data);

  const joined = new Date(metadata?.created_at).toLocaleDateString();

  useEffect(() => {
    dispatch(profileApi.get(id));
  }, []);

  useEffect(() => {
    setUsername(metadata?.name)
  }, [metadata])

  if (metadata)
    return (
      <Container>
        <Content>
          <Header className="box-style">
            <div className="user">
              <div className="user-img">
                <UserImage src={metadata?.img} alt={metadata?.name} />
              </div>
              <div className="user-name">
                {nameEdit ? <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> : <p>{metadata?.name}</p>}
                {
                  user?.id === metadata?.id && !nameEdit ?
                    <button className="icon-btn" onClick={() => setNameEdit(true)}>
                      <span className="material-symbols-rounded icon">
                        edit
                      </span>
                    </button> : null
                }
                {nameEdit ? <div className="btn-group">
                  <button className="custom-btn secondary red" onClick={() => {
                    setUsername(metadata?.name);
                    setNameEdit(false);
                  }}>
                    <span className="material-symbols-rounded">
                      close
                    </span>
                  </button>
                  <button className="custom-btn secondary" onClick={() => dispatch(userApi.metadata.update({ name: username })).then(() => window.location.reload())}>
                    <span className="material-symbols-rounded">
                      check
                    </span>
                  </button>
                </div> : null}
              </div>
            </div>
            <div className="header-info-list">
              <div className="header-info">
                <div>Joined: </div>
                <span>{joined}</span>
              </div>
              <div className="header-info">
                <div>Posts: </div>
                <span>{metadata?.postsCount?.[0]?.count}</span>
              </div>
              <div className="header-info">
                <div>Likes given: </div>
                <span>{metadata?.liked?.[0]?.count}</span>
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
  padding: 20px 20px;
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
      display: flex;
      column-gap: 10px;
      align-items: center;
      
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }
    }
  }

  .header-info-list {
    display: flex;
    align-items: center;
    background: var(--content-background);
    border-radius: 10px;
    padding: 15px 10px;
    column-gap: 20px;
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
