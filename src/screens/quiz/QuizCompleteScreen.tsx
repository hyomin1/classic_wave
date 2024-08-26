import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스

interface QuizCompleteScreenProps {
  totalQuestions: number;
  quizListId: number;
  userAnswers: number[];
  score: number;
}

export const QuizCompleteScreen = ({
  totalQuestions,
  quizListId,
  userAnswers,
  score,
}: QuizCompleteScreenProps): JSX.Element => {
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const submitQuiz = async () => {
      try {
        const response = await axiosApi.post("/api/quiz/submit", {
          quizListId,
          userAnswers,
        });

        setFinalScore(response.data.score);
      } catch (error) {
        console.error("Failed to submit quiz", error);
      }
    };

    submitQuiz();
  }, [quizListId, userAnswers]);

  const handleComplete = () => {
    if (finalScore !== null) {
      navigate("/home");
      //navigate("/history", { state: { score: finalScore } }); // 히스토리 페이지로 이동하면서 점수 전달
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl p-8 bg-white rounded-lg">
        {finalScore !== null ? (
          <>
            <div className="flex items-center justify-center mb-8">
              <div className="bg-[#6100c2] rounded-full w-64 h-64 flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2 text-xl text-white">Your score</p>
                  <p className="text-6xl font-bold text-white">{finalScore}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleComplete}
              className="absolute bottom-8 right-8 bg-[#6100c2] text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700"
            >
              완료
            </button>
          </>
        ) : (
          <p className="text-center">Scoring...</p> // 모달에만 Loading 표시
        )}
      </div>
    </div>
  );
};

export default QuizCompleteScreen;
