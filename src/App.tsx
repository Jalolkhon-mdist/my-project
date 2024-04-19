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
          </UIProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
