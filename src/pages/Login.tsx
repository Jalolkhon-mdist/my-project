import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch } from "store";
import { userApi } from "store/reducers/user";
import styled from "styled-components";

const Login: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [passwordType, setPasswordType] = useState("password");
  const [userExists, setUserExists] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (type === "sign-up") {
      setUserExists(false);
    }
  }, [searchParams]);

  async function signIn() {
    dispatch(userApi.signIn(form)).then((e) => {
      if (e.payload) {
        setUserExists(false);
      } else {
        setUserExists(true);
      }
    });
  }

  async function signUp() {
    dispatch(userApi.signUp(form)).then((e) => {
      if (e.payload) {
        setUserExists(false);
        navigate('/')
        window.location.reload();
      } else {
        setUserExists(true);
      }
    });
  }

  function switchType() {
    setForm({ email: "", password: "" });
    if (type === "sign-up") {
      setSearchParams({ type: "log-in" });
    } else {
      setSearchParams({ type: "sign-up" });
    }
  }

  function getContent() {
    if (type === "sign-up") {
      return (
        <Content>
          <h1 className="title">Sign Up</h1>
          <h2 className="subtitle">
            Enter your email and password to create a new account
          </h2>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            <div className="form-content">
              <div className="input-container" data-error={userExists}>
                <h3 className="input-label">Email</h3>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      setUserExists(false);
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                </div>
                <span className="error-message">This user already exists</span>
              </div>
              <div className="input-container">
                <h3 className="input-label">Password</h3>
                <div className="input-wrapper">
                  <input
                    type={passwordType}
                    name="password"
                    autoComplete="off"
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (passwordType === "password") {
                        setPasswordType("text");
                      } else {
                        setPasswordType("password");
                      }
                    }}
                  >
                    <span className="material-symbols-rounded icon">
                      visibility
                    </span>
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </div>
          </form>

          <h2 className="subtitle">
            Already have an account?{" "}
            <button onClick={() => switchType()}>Sign In</button>
          </h2>
        </Content>
      );
    } else {
      return (
        <Content>
          <h1 className="title">Sign In</h1>
          <h2 className="subtitle">
            Enter your email and password to access your account
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <div className="form-content">
              <div className="input-container" data-error={userExists}>
                <h3 className="input-label">Email</h3>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(e) => {
                      setUserExists(false);
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="input-container" data-error={userExists}>
                <h3 className="input-label">Password</h3>
                <div className="input-wrapper">
                  <input
                    type={passwordType}
                    name="password"
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (passwordType === "password") {
                        setPasswordType("text");
                      } else {
                        setPasswordType("password");
                      }
                    }}
                  >
                    <span className="material-symbols-rounded icon">
                      visibility
                    </span>
                  </button>
                </div>
                <span className="error-message">
                  Username or password is incorrect
                </span>
              </div>

              <button type="submit" className="submit-button">
                Sign In
              </button>
            </div>
          </form>

          <h2 className="subtitle">
            Don't have an account?{" "}
            <button onClick={() => switchType()}>Sign Up</button>
          </h2>
        </Content>
      );
    }
  }

  return <Container>{getContent()}</Container>;
};

export default Login;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--content-background);
`;

const Content = styled.div`
  max-width: 420px;
  width: 100%;
  border: 1px solid var(--border-color);
  padding: 40px 50px;
  background-color: var(--element-background);
  border-radius: 7px;

  .title {
    font-size: 50px;
    font-family: var(--font-medium);
    font-weight: normal;
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 10px;
    color: var(--title-color);
  }

  .subtitle {
    font-size: 16px;
    font-family: var(--font-regular);
    font-weight: normal;
    text-align: center;
    color: var(--title-color);

    button {
      color: var(--element-color);
      background: none;
      border: none;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
    }
  }

  form {
    margin-top: 35px;

    .form-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;

      .input-container {
        margin: 5px 0;
        width: 100%;

        &[data-error="true"] {
          .error-message {
            display: block;
          }

          .input-wrapper {
            border-color: red;
          }
        }

        .input-label {
          font-size: 14px;
          font-family: var(--font-medium);
          font-weight: normal;
          margin-bottom: 8px;
          color: var(--title-color);
        }

        .error-message {
          color: red;
          font-family: var(--font-light);
          font-size: 14px;
          display: none;
          margin-top: 3px;
        }

        .input-wrapper {
          height: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--content-background);
          border: 1px solid var(--border-color-light);
          border-radius: 7px;
          overflow: hidden;

          input {
            border: none;
            outline: none;
            height: 100%;
            padding: 0 10px;
            outline: none;
            width: 100%;
            background: none;
            color: var(--text-color);

            &:-webkit-autofill {
              box-shadow: 0 0 0 30px var(--content-background) inset;
              -webkit-text-fill-color: var(--text-color);
            }

            /* Firefox */
            &:-moz-autofill {
              box-shadow: 0 0 0 30px var(--content-background) inset;
              -webkit-text-fill-color: var(--text-color);
            }
          }

          button {
            border: none;
            background: none;
            padding: 0 5px;
            padding-right: 10px;
            height: 100%;
            cursor: pointer;
            background: none;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              font-size: 22px;
              margin-bottom: -2px;
              color: var(--text-color);
            }
          }
        }
      }
    }

    .submit-button {
      width: 100%;
      background-color: var(--element-color);
      border: none;
      padding: 10px;
      font-size: 16px;
      color: white;
      border-radius: 7px;
      margin-top: 25px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`;
