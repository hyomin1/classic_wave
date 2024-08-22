import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스
import Title from "../../components/Title";

interface QuizHistoryItem {
  question: string;
  submitAnswer: number[];
  answer: number;
  comment: string;
}

interface QuizHistory {
  quizHistoryResponses: QuizHistoryItem[];
  totalScore: number;
}

function HistoryDetail() {
  const { summitId } = useParams<{ summitId: string }>();
  const [quizHistory, setQuizHistory] = useState<QuizHistory>({
    quizHistoryResponses: [],
    totalScore: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axiosApi.get(`/api/history/${summitId}`);
        setQuizHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz history", error);
      }
    };

    if (summitId) {
      fetchQuizHistory();
    }
  }, [summitId]);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      <div className="flex items-center w-full mb-8">
        <Title />
        <h1 className="text-3xl font-bold text-white ml-4">Quiz History Detail</h1>
      </div>

      <div className="w-full max-w-4xl overflow-y-auto bg-[#21201E] p-8 rounded-lg shadow-lg">
        {quizHistory.quizHistoryResponses.map((item, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-4">
              {item.question}
            </h2>
            <div className="bg-[#6100c2] p-4 rounded-lg">
              <p className="text-white text-lg mb-2">
                <strong>정답:</strong> {item.answer}
              </p>
              <p className="text-white text-lg mb-4">
                <strong>해설:</strong> {item.comment}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.submitAnswer.map((answer, i) => (
                  <button
                    key={i}
                    className={`py-4 px-8 rounded-lg text-lg font-bold transition-colors ${
                      answer === item.answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBack}
        className="mt-8 bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
      >
        돌아가기
      </button>
    </div>
  );
}

export default HistoryDetail;
