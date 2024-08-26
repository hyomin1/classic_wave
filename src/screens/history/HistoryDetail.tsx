import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스

interface QuizHistoryResponse {
  question: string;
  submitAnswer: number[];
  answer: number;
  comment: string;
}

interface QuizDetail {
  quizHistoryResponses: QuizHistoryResponse[];
  totalScore: number;
}

function HistoryDetail() {
  const { quizsubmitId } = useParams<{ quizsubmitId: string }>();
  const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const response = await axiosApi.get(`/api/history/${quizsubmitId}`);
        setQuizDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetail();
  }, [quizsubmitId]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!quizDetail) {
    return <div className="text-white">Quiz details not available</div>;
  }

  return (
    <div className="w-[80%] p-8 bg-[#151515] overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold text-white mt-4">퀴즈 상세 정보</h1>
      <p className="text-xl font-bold text-white mt-4">점수: {quizDetail.totalScore}</p>
      <div className="mt-6 space-y-4">
        {quizDetail.quizHistoryResponses.map((item, index) => (
          <div key={index} className="p-4 bg-[#21201E] rounded-lg">
            <h2 className="text-lg font-bold text-white">{item.question}</h2>
            <p
              className={`text-sm mt-2 ${
                item.submitAnswer[0] === item.answer ? "text-green-500" : "text-red-500"
              }`}
            >
              제출한 답: {item.submitAnswer[0]}{" "}
              {item.submitAnswer[0] === item.answer ? "(정답)" : "(오답)"}
            </p>
            <p className="text-sm text-white">정답: {item.answer}</p>
            <p className="text-sm mt-2 text-gray-400">해설: {item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryDetail;
