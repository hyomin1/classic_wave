import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title"; // Title 컴포넌트 가져오기

export const QuizStartScreen = (): JSX.Element => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("solve"); // "solve" 경로로 이동
  };

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      <div className="flex items-center w-full">
        <Title />  {/* Title 컴포넌트 사용 */}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full mt-10">
        <div className="flex flex-col items-start lg:w-1/2">
          <h1 className="text-5xl font-bold text-white mb-2">Robinson Crusoe</h1>
          <p className="text-gray-400 text-lg mb-8">Daniel Defoe</p>
          <button
            className="bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-purple-700"
            onClick={handleStartQuiz}
          >
            시작 하기
          </button>
        </div>
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

export default QuizStartScreen;
