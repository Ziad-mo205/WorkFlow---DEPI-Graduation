import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
