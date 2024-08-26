import React from "react";
import SideBar from "../../components/SideBar";
import DetailBookMain from "./DetailBookMain";

function DetailBook() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <DetailBookMain />
    </div>
  );
}

export default DetailBook;
