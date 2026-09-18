import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-[calc(100vh-104px)] bg-[#f1f1f6] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 xl:px-10">

      <div className="mx-auto flex w-full max-w-[1640px] items-start gap-5 lg:gap-[38px]">

        {/* USER SIDEBAR */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* USER DASHBOARD CONTENT */}
        <main className="min-w-0 flex-1 rounded-xl">
          <Outlet />
        </main>

      </div>

    </section>
  );
};

export default UserDashboardLayout;