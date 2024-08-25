import React from "react";
import Title from "../../components/Title";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

function Cartoon() {
  const data = useAppSelector((state) => state.cartoon);
  console.log(data.cartoon);
  return (
    <div className="bg-[#21201E] h-screen p-12">
      <Title />
      <div className="flex items-center h-[80%] justify-between">
        <div className="flex flex-col">
          <span className="mb-12 text-4xl font-bold text-white">
            {data.cartoon.name}
          </span>
          <span className="mb-32 text-xl font-bold text-gray-400">
            {data.cartoon.authorName}
          </span>

          <button className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl text-white font-bold">
            <Link to={`/cartoon/scene/${data.cartoon.id}`}>시작 하기</Link>
          </button>
        </div>

        <div
          className="h-[70%] bg-center bg-cover border border-white w-[35%] rounded-2xl mr-40"
          style={{ backgroundImage: "url('/images/dog.png')" }}
        ></div>
      </div>
    </div>
  );
}

export default Cartoon;
