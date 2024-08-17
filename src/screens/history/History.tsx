import React from "react";
import SideBar from "../../components/SideBar";
import HistoryMain from "./HistoryMain";

function History() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <HistoryMain />
    </div>
  );
}

export default History;
