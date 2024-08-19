import React from "react";
import Title from "./Title";
import { IoMdHome } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { PiRanking } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const goHistory = () => {
    navigate("/history");
  };

  const goRank = () => {
    navigate("/rank");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="w-[20%]  bg-[#21201E] p-4 flex flex-col justify-between">
      <div className="flex flex-col text-white ">
        <Title />

        <div
          className="flex items-center mt-8 mb-4 hover:opacity-60"
          onClick={goHome}
        >
          <IoMdHome className="w-8 h-8 mr-2" />
          <span>홈</span>
        </div>

        <div className="flex items-center mb-4 hover:opacity-60">
          <FaRegHeart className="w-8 h-8 mr-2" />
          <span>관심 작품</span>
        </div>

        <div
          className="flex items-center mb-4 hover:opacity-60"
          onClick={goHistory}
        >
          <FaHistory className="w-8 h-8 mr-2" />
          <span>히스토리</span>
        </div>

        <div
          className="flex items-center mb-4 hover:opacity-60"
          onClick={goRank}
        >
          <PiRanking className="w-8 h-8 mr-2" />

          <span>랭킹</span>
        </div>

        <div></div>
      </div>

      <div className="flex flex-col text-white">
        <div className="flex items-center mt-8 mb-4 hover:opacity-60">
          <CgProfile className="w-8 h-8 mr-2" />
          <span> 내정보</span>
        </div>

        <div
          className="flex items-center mb-4 hover:opacity-60"
          onClick={logout}
        >
          <MdLogout className="w-8 h-8 mr-2" />
          <span>로그아웃</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
