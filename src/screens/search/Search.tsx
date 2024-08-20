import React from "react";
import SideBar from "../../components/SideBar";
import SearchMain from "./SearchMain";

function Search() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <SearchMain />
    </div>
  );
}

export default Search;
