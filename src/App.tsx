import "./App.scss";
import "../backend/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />} path="/" />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
