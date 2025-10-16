import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center   ">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="w-full mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
