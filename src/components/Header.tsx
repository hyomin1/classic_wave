// src/components/Header.tsx
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <div className="flex justify-between">
      <div></div>
      <div className="flex items-center">
        <Link to={"/search"}>
          <FaSearch className="fill-[white] w-6 h-6 hover:opacity-60 mr-4" />
        </Link>
        <img
          src="/images/profile.png"
          alt="기본 프로필 이미지"
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2 text-lg font-bold text-white">이효민</span>
      </div>
    </div>
  );
}

export default Header;
