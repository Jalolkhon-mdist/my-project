import { FC } from "react";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar";

const MainLayout: FC = () => {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default MainLayout;
