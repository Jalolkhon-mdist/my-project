import "./App.scss";
import "../backend/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import { MainPage } from "pages";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainPage />} path="*" />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
