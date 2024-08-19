import React from "react";
import { useAppSelector } from "../../redux/hooks";

function PopularBookMain() {
  const popularBooks = useAppSelector((state) => state.books.popular);
  console.log(popularBooks);
  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">인기있는 작품</span>
      </div>
    </div>
  );
}

export default PopularBookMain;
