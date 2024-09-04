import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axios";
import { IBookDetail } from "../../interfaces/bookInterface";
import { useAppDispatch } from "../../redux/hooks";
import { setCartoon } from "../../redux/slices/cartoonSlice";
import { getImg } from "../../api";

function DetailBookMain() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<IBookDetail>();
  const [img, setImg] = useState("");

  const fetchMetaData = async () => {
    const res = await axiosApi.get("/api/book/metadata", {
      params: { bookId },
    });

    dispatch(setCartoon(res.data));
    setBook(res.data);
  };

  useEffect(() => {
    fetchMetaData();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      getImg(book.id).then((data) => setImg(data));
    }
  }, [book]);

  const goCartoon = () => {
    navigate(`/cartoon/${bookId}`);
  };

  const handleQuizStart = () => {
    navigate("/quiz/solve", { state: { book } }); 
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">상세보기</span>
      </div>
      <div className="flex flex-col w-[100%] h-[100%]">
        <div
          className="bg-cover w-[80%] h-[65%] rounded-t-2xl"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="bg-[#e9e8eb] w-[80%] h-[15%] rounded-b-2xl flex justify-between items-center px-4">
          <div className="flex flex-col">
            <span className="mb-2 text-xl font-bold">{book?.name}</span>
            <span>{book?.authorName}</span>
          </div>
          <div className="font-bold text-white ">
            <button
              onClick={goCartoon}
              className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl mr-4"
            >
              줄거리 보기
            </button>
            <button
              onClick={handleQuizStart}
              className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl"
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
