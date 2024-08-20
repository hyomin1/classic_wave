import React from "react";
import { useNavigate } from "react-router-dom";

interface QuizCompleteScreenProps {
  score: number;
  totalQuestions: number;
}

export const QuizCompleteScreen = ({ score, totalQuestions }: QuizCompleteScreenProps): JSX.Element => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/"); // 완료 후 홈으로 이동
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
        {/* 점수 표시 원 */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-[#6100c2] rounded-full w-64 h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-xl mb-2">Your score</p>
              <p className="text-white text-6xl font-bold">{score}</p>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 bg-[#6100c2] text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default QuizCompleteScreen;