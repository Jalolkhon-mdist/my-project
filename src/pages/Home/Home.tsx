import { FC } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Home: FC = () => {
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
      { img: "https://styles.redditmedia.com/t5_2qzb6/styles/communityIcon_v0zs2b3d7f251.png", name: "r/IAmA" },
      { img: "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png", name: "r/classicwow" },
      { img: "https://styles.redditmedia.com/t5_2seh9/styles/communityIcon_hybmyae0zqx31.png", name: "r/Instagram" },
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
        content: "https://res.cloudinary.com/jerrick/image/upload/v1687178845/64904e5d848003001d71ce27.jpg",
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
        content: "https://isp.page/news/wp-content/uploads/2023/12/compressed_img-MVluSKI5SyHtcKoG9e8ziZQG.png",
        comments: 921,
        likes: 10200,
      },
      {
        title: "Dream it, type it, and create it using simple text prompts with new Generative Fill",
        content:
          "https://preview.redd.it/mercedes-benz-greets-nazi-airplanes-with-a-heil-hitler-v0-p2l8yg111ric1.jpeg?width=640&crop=smart&auto=webp&s=a25efcbcc29f786b7fba7635511e049fe7d71cf3",
        comments: 617,
        likes: 6700,
      },
    ],
  };

  function getLikes(count: number) {
    const str = count.toString();
    if (str.length > 3) {
      return `${str.substring(0, 1)}.${str.substring(1, 2)}k`;
    } else {
      return str;
    }
  }

  return (
    <main id="Home">
      <div className="container">
        <div className="content">
          <div className="left">
            <ul>
              <li>
                <div className="content">
                  <div className="profile">
                    <div className="img">
                      <img src="" />
                    </div>
                    <p>Jalolkhon Makhmudov</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="content">
                  <span className="material-symbols-outlined">notifications</span>
                  <p>Notifications</p>
                </div>
              </li>
              <li>
                <div className="content">
                  <span className="material-symbols-outlined">chat</span>
                  <p>Notifications</p>
                </div>
              </li>
            </ul>
            <hr />
            <ul>
              {data.topics.map((elem, index) => {
                return (
                  <li key={index}>
                    <Link to="/">
                      <div className="content">
                        <span className="material-symbols-outlined">{elem.icon}</span>
                        <p>{elem.name}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="center">
            <div className="content">
              <ul>
                {data.posts.map((elem, index) => {
                  return (
                    <li key={index}>
                      <div className="post-container">
                        <div className="user"></div>
                        <div className="title">
                          <h3>{elem.title}</h3>
                        </div>
                        <div className="post-content">
                          <img src={elem.content} alt="" />
                        </div>
                        <div className="post-details">
                          <div className="group">
                            <button className="group-btn">
                              <span className="material-symbols-rounded">thumb_up</span>
                            </button>
                            <p>{getLikes(elem.likes)}</p>
                            <button className="group-btn">
                              <span className="material-symbols-rounded">thumb_down</span>
                            </button>
                          </div>
                          <button>
                            <span className="material-symbols-rounded">comment</span>
                            <p>{elem.comments}</p>
                          </button>
                          <button>
                            <span className="material-symbols-rounded">ios_share</span>
                            <p>Share</p>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
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
    </main>
  );
};

export default Home;
