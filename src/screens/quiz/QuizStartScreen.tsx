import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../../components/Title";

export const QuizStartScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};  // 이전 페이지에서 전달된 책 정보를 가져옴

  const handleStartQuiz = () => {
    navigate("solve", { state: { book } });  // "solve" 경로로 이동, book 정보를 전달.
  };

  if (!book) {
    return <div>Loading...</div>;  // 책 정보가 없을 경우 로딩 표시
  }

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      <div className="flex items-center w-full">
        <Title />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full mt-10">
        <div className="flex flex-col items-start lg:w-1/2">
          <h1 className="text-5xl font-bold text-white mb-2">{book.name}</h1>
          <p className="text-gray-400 text-lg mb-8">{book.authorName}</p>
          <button
            className="bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-purple-700"
            onClick={handleStartQuiz}
          >
            시작 하기
          </button>
        </div>
        <div className="flex justify-center items-center lg:w-1/2 mt-10 lg:mt-0">
          <img
            className="max-w-[75%] max-h-[75%] rounded-lg object-contain"  
            alt="Book Cover"
            src={book.coverImageUrl || "/images/Rectangle213.png"}  // 책의 커버 이미지를 사용, 없을 경우 기본 이미지 사용
          />
        </div>
      </div>
    </div>
  );
};

export default QuizStartScreen;
