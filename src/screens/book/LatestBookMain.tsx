import React from "react";
import { useAppSelector } from "../../redux/hooks";

function LatestBookMain() {
  const latestBooks = useAppSelector((state) => state.books.latest);
  console.log(latestBooks);
  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">최근에 추가된 작품</span>
      </div>
    </div>
  );
}

export default LatestBookMain;
