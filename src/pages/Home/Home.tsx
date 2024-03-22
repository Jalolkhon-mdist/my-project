import { FC, useEffect } from "react";
import "./style.scss";
import { api } from "store/reducers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import PostList from "../PostList";
import styled from "styled-components";
import Aside from "../../components/Aside";

const Home: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const data = {
    topics: [
      { icon: "joystick", name: "Gaming" },
      { icon: "monitoring", name: "Business" },
      { icon: "gamepad", name: "Game Reviews" },
      { icon: "joystick", name: "PC Gaming" },
      { icon: "sports_soccer", name: "Sport" },
      { icon: "keyboard", name: "Software Development" },
      { icon: "headset", name: "Accessories" },
      { icon: "comic_bubble", name: "Anime" },
      { icon: "smart_display", name: "Television" },
      { icon: "styler", name: "Fashion" },
      { icon: "movie_edit", name: "Movies" },
      { icon: "trophy", name: "Achievements and Trophies" },
    ],
    communities: [
      {
        img: "https://styles.redditmedia.com/t5_2qzb6/styles/communityIcon_v0zs2b3d7f251.png",
        name: "r/IAmA",
      },
      {
        img: "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
        name: "r/classicwow",
      },
      {
        img: "https://styles.redditmedia.com/t5_2seh9/styles/communityIcon_hybmyae0zqx31.png",
        name: "r/Instagram",
      },
      {
        img: "https://styles.redditmedia.com/t5_3h47q/styles/communityIcon_zqvf8dnae26b1.jpg?format=pjpg&s=0b962cdc797fd23a9e335c94ac78398d32108165",
        name: "r/NintendoSwitch",
      },
      {
        img: "https://styles.redditmedia.com/t5_2w7mz/styles/communityIcon_jmyuhs81jl211.png",
        name: "r/Tinder",
      },
      {
        img: "https://styles.redditmedia.com/t5_2qh2b/styles/communityIcon_ig9nr9020vnb1.jpg?format=pjpg&s=d099cbfa5c87f941a1e65a58a52a18047f151eaa",
        name: "r/iphone",
      },
    ],
    posts: [
      {
        title: "Exploring the wonders of virtual reality in gaming",
        content:
          "https://res.cloudinary.com/jerrick/image/upload/v1687178845/64904e5d848003001d71ce27.jpg",
        comments: 789,
        likes: 8900,
      },
      {
        title: "Unleash your creativity with the latest AI-powered art tools",
        content:
          "https://littleart.club/wp-content/uploads/2023/07/Exploring-the-World-of-Best-Free-AI-Image-Generator-Unleash-Your-Creativity.jpg",
        comments: 512,
        likes: 7400,
      },
      {
        title: "The evolution of gaming consoles: Past, Present, and Future",
        content:
          "https://isp.page/news/wp-content/uploads/2023/12/compressed_img-MVluSKI5SyHtcKoG9e8ziZQG.png",
        comments: 921,
        likes: 10200,
      },
      {
        title:
          "Dream it, type it, and create it using simple text prompts with new Generative Fill",
        content:
          "https://preview.redd.it/mercedes-benz-greets-nazi-airplanes-with-a-heil-hitler-v0-p2l8yg111ric1.jpeg?width=640&crop=smart&auto=webp&s=a25efcbcc29f786b7fba7635511e049fe7d71cf3",
        comments: 617,
        likes: 6700,
      },
    ],
  };

  useEffect(() => {
    dispatch(api.post.list.get());
  }, []);

  return (
    <Main id="Home">
      <div>
        <div className="main-content">
          <div className="left">
            <Aside />
          </div>
          <div className="center">
            <div className="content">
              <ul>
                <PostList />
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="block">
              <div className="title">
                <span className="material-symbols-outlined">group</span>
                <h2>Popular Communities</h2>
              </div>
              <ul>
                {data.communities.map((elem, index) => {
                  return (
                    <li key={index}>
                      <div className="content">
                        <div className="img">
                          <img src={elem.img} alt="" />
                        </div>
                        <p className="name">{elem.name}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Home;

const Main = styled.main`
  padding-top: var(--navbar-height);
  background-color: var(--main-background);

  .main-content {
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    position: relative;
    height: 100%;

    .left {
      min-width: 272px;
      height: calc(100vh - var(--navbar-height));
      position: sticky;
      top: var(--navbar-height);
    }

    .center {
      max-width: 500px;
      width: 100%;
    }

    .right {
      min-width: 300px;
      height: 100%;
      position: sticky;
      top: var(--navbar-height);

      .block {
        border: 1px solid $border-color;
        overflow: hidden;
        padding: 0 15px;

        .title {
          display: flex;
          align-items: center;
          column-gap: 10px;
          padding: 15px 0;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            margin: 0 auto;
            width: 95%;
            background: $border-color;
            height: 0.5px;
            bottom: 0;
            left: 0;
            right: 0;
          }

          span {
            font-size: 22px;
          }

          h2 {
            font-size: 15px;
            font-weight: normal;
            text-transform: uppercase;
          }
        }

        ul {
          li:nth-last-child(1) {
            .content {
              &::after {
                display: none;
              }
            }
          }

          li {
            .content {
              padding: 10px 0;
              display: flex;
              align-items: center;
              column-gap: 15px;
              position: relative;

              &::after {
                content: "";
                position: absolute;
                margin: 0 auto;
                width: 95%;
                background: $border-color;
                height: 0.5px;
                bottom: 0;
                left: 0;
                right: 0;
              }

              .img {
                height: 32px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                overflow: hidden;

                img {
                  object-fit: cover;
                  height: 100%;
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
`;
