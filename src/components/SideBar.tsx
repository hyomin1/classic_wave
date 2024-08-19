import React from "react";
import Title from "./Title";
import { IoMdHome } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { PiRanking } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHistory = () => {
    navigate("/history");
  };

  const logout = () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirm) {
      localStorage.removeItem("accessToken");
    }
  };

  const linkClass = (path: string) =>
    `flex items-center mb-4 hover:opacity-60 font-bold ${
      location.pathname === path ? "text-white" : "text-gray-400"
    }`;

  return (
    <div className="w-[20%]  bg-[#21201E] p-4 flex flex-col justify-between">
      <div className="flex flex-col text-white ">
        <Title />

        <Link to={"/home"} className={linkClass("/home")}>
          <IoMdHome className="w-8 h-8 mr-2" />
          <span>홈</span>
        </Link>

        <Link to={""} className={linkClass("/favorite")}>
          <FaRegHeart className="w-8 h-8 mr-2" />
          <span>관심 작품</span>
        </Link>

        <Link
          to={"/history"}
          className={linkClass("/history")}
          onClick={goHistory}
        >
          <FaHistory className="w-8 h-8 mr-2" />
          <span>히스토리</span>
        </Link>

        <Link to={"/rank"} className={linkClass("/rank")}>
          <PiRanking className="w-8 h-8 mr-2" />

          <span>랭킹</span>
        </Link>

        <div></div>
      </div>

      <div className="flex flex-col">
        <Link to={""} className={linkClass("/profile")}>
          <CgProfile className="w-8 h-8 mr-2" />
          <span>내 정보</span>
        </Link>

        <Link
          to={"/"}
          className="flex items-center mb-4 font-bold text-gray-400 hover:opacity-60"
          onClick={logout}
        >
          <MdLogout className="w-8 h-8 mr-2" />
          <span>로그아웃</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
