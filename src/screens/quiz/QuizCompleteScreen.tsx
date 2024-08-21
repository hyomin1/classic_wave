import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스

interface QuizCompleteScreenProps {
  score: number;
  totalQuestions: number;
  quizListId: number;
  userAnswers: number[];
}

export const QuizCompleteScreen = ({
  score,
  totalQuestions,
  quizListId,
  userAnswers,
}: QuizCompleteScreenProps): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    // 퀴즈 제출 및 채점 API 호출
    const submitQuiz = async () => {
      try {
        const response = await axiosApi.post("/api/quiz/submit", {
          quizListId,
          userAnswers,
        });

        const finalScore = response.data.score;
        console.log("Quiz submitted successfully. Final score:", finalScore);

        // 이후 히스토리나 랭킹에 반영되는 추가 로직을 여기에 추가 가능
      } catch (error) {
        console.error("Failed to submit quiz", error);
      }
    };

    submitQuiz();
  }, [quizListId, userAnswers]);

  const handleComplete = () => {
    navigate("/home"); // 완료 후 홈으로 이동
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
