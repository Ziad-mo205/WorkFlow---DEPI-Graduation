import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 overflow-y-auto bg-base-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
