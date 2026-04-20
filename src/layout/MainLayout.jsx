import React from "react";
import { Outlet } from "react-router-dom";
import FloatingFooter from "../components/Footer/FloatingFooter";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1e1b4b] to-[#0f172a] overflow-hidden flex justify-center">
      
      {/* background blobs */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[200px] left-[-40px] w-60 h-60 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[120px] right-[-30px] w-52 h-52 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* app frame */}
      <main
        className="relative w-full md:w-[400px]
                   min-h-screen md:min-h-[720px]
                   md:rounded-[40px]
                   overflow-hidden flex flex-col
                   bg-gradient-to-br
                   shadow-[0_0_100px_rgba(99,102,241,0.15),0_40px_80px_rgba(0,0,0,0.7)]"
      >
        {/* scroll area */}
        <div className="flex-1 overflow-y-auto pb-[100px]">
          <Outlet />
        </div>

        <FloatingFooter />
      </main>
    </div>
  );
};

export default MainLayout;

