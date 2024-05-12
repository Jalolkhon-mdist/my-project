import "./App.scss";
import "../backend/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { Login, MainPage, Create, Profile, Edit, Groups } from "pages";
import { useEffect, useState } from "react";
import { userApi } from "store/reducers/user";
import { UIProvider } from "ui";
import Navbar from "./components/Navbar";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch() as AppDispatch;
  const [startApp, setStartApp] = useState(false);

  useEffect(() => {
    async function getUser() {
      dispatch(userApi.auth()).then(() => {
        setStartApp(true);
      });
    }
    getUser();
  }, []);

  if (startApp) {
    return (
      <div>
        <AppWrapper>
          <BrowserRouter>
            <UIProvider>
              <Navbar />
              <Routes>
                <Route element={<MainPage />} path="*" />{" "}
                <Route element={<Login />} path="/login" />
                <Route element={<Create />} path="/create" />
                <Route element={<Profile />} path="/profile/:id" />
                <Route element={<Edit />} path="/edit/:id" />
                <Route element={<Groups />} path="/g" />
              </Routes>
              <div className="create-wrapper">
                <Create />
              </div>
              <div className="edit-wrapper">
                <Edit />
              </div>
            </UIProvider>
          </BrowserRouter>
        </AppWrapper>
      </div>
    );
  }
}

export default App;

const AppWrapper = styled.div`
    .create-wrapper,
    .edit-wrapper {
    display: flex;
    justify-content: center;
  }
`
