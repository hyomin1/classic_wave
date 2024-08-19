import React from "react";
import { useNavigate } from "react-router-dom"; 
export const QuizStartScreen = (): JSX.Element => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 함수

  const handleStartQuiz = () => {
    navigate("/quiz"); // "/quiz" 경로로 이동
  };

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      {/* 상단 로고 */}
      <div className="flex items-center w-full">
        <img
          className="w-8 h-8"
          alt="Coffee"
          src="/images/coffee.svg"
        />
        <div className="ml-2 text-white text-[22px] font-bold tracking-[1.32px]">
          CLASSIC_WAVE
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full mt-10">
        {/* 텍스트 섹션 */}
        <div className="flex flex-col items-start lg:w-1/2">
          <h1 className="text-5xl font-bold text-white mb-2">Robinson Crusoe</h1>
          <p className="text-gray-400 text-lg mb-8">Daniel Defoe</p>
          <button className="bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-purple-700" onClick={(handleStartQuiz)}>
            시작 하기
          </button>
        </div>

        {/* 이미지 섹션 */}
        <div className="flex justify-center items-center lg:w-1/2 mt-10 lg:mt-0">
          <img
            className="w-[90%] h-auto rounded-lg object-cover"
            alt="Book Cover"
            src="/images/Rectangle 213.png"
          />
        </div>
      </div>
    </div>
  );
};
