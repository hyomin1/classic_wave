import React from "react";
import SideBar from "../../components/SideBar";
import FavorBookMain from "./FavorBookMain";

function FavorBook() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <FavorBookMain />
    </div>
  );
}

export default FavorBook;
