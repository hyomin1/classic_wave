import React, { useState } from "react";
import axiosApi from "../../axios";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchMain() {
  const [title, setTitle] = useState<string>("");

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axiosApi.get("/api/book/search", {
      params: {
        searchText: title,
      },
    });
    console.log(res.data);
    setTitle("");
  };
  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col ">
      <form onSubmit={handleSubmit} className="p-4 w-[100%]  flex items-center">
        <input
          value={title}
          onChange={onChangeInput}
          className="w-[80%] bg-[#71706F] p-2 text-white rounded-xl"
          placeholder="책 제목을 입력해주세요"
        />
        <FaSearch className="fill-[white] w-6 h-6 hover:opacity-60 ml-4" />
        <Link
          to={"/home"}
          className="ml-4 text-xl font-bold text-white hover:opacity-60"
        >
          취소
        </Link>
      </form>
    </div>
  );
}

export default SearchMain;
