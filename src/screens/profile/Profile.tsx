import React from "react";
import SideBar from "../../components/SideBar";
import ProfileMain from "./ProfileMain";

function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <ProfileMain />
    </div>
  );
}

export default Home;
