import React from "react";
import SideBar from "../../components/SideBar";
import Main from "./Main";

function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <Main />
    </div>
  );
}

export default Home;
