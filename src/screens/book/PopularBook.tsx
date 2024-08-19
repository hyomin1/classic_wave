import React from "react";
import SideBar from "../../components/SideBar";
import PopularBookMain from "./PopularBookMain";

function PopularBook() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <PopularBookMain />
    </div>
  );
}

export default PopularBook;
