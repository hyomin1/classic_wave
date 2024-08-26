import React from "react";
import SideBar from "../../components/SideBar";
import LatestBookMain from "./LatestBookMain";

function LatestBook() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <LatestBookMain />
    </div>
  );
}

export default LatestBook;
