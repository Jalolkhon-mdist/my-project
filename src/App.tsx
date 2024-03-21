import "./App.scss";
import "../backend/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
