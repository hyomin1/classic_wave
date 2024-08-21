import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axios";
import { IBookDetail } from "../../interfaces/bookInterface";

function DetailBookMain() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<IBookDetail>();

  const fetchMetaData = async () => {
    const res = await axiosApi.get("/api/book/metadata", {
      params: {
        bookId,
      },
    });
    setBook(res.data);
  };

  useEffect(() => {
    fetchMetaData();
  }, [bookId]);

  const handleQuizStart = () => {
    navigate("/quiz", { state: { book } });
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">상세보기</span>
      </div>
      <div className="flex flex-col w-[100%] h-[100%]">
        <div
          className="bg-center bg-cover w-[80%] h-[65%] rounded-t-2xl"
          style={{ backgroundImage: "url('/images/dog.png')" }}
        ></div>
        <div className="bg-[#e9e8eb] w-[80%] h-[15%] rounded-b-2xl flex justify-between items-center px-4">
          <div className="flex flex-col">
            <span className="mb-2 text-xl font-bold">{book?.name}</span>
            <span>{book?.authorName}</span>
          </div>
          <div className="font-bold text-white ">
            <button className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl mr-4">
              줄거리 보기
            </button>
            <button
              className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl"
              onClick={handleQuizStart}
            >
              퀴즈 풀기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBookMain;
