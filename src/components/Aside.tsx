import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Aside: FC = () => {
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
          {data.topics.map((elem, index) => {
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
