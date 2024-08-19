import React from "react";
import SideBar from "../../components/SideBar";
import RankMain from "./RankMain";

function Rank() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <RankMain />
    </div>
  );
}

export default Rank;
