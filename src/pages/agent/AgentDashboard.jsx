import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/agent/SideBar";

const AgentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="min-h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="lg:ml-80">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
