import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스

interface HistoryItem {
  quizsubmitId: number;
  bookTitle: string;
  author: string;
  publishedYear: number;
  score?: number;
  totalQuestions?: number;
}

function HistoryMain() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // 히스토리 데이터를 먼저 가져옵니다.
        const response = await axiosApi.get("/api/history");
        const data = response.data;

        // 각 히스토리 아이템에 대해 totalScore를 가져오기 위한 API 호출
        const updatedData = await Promise.all(
          data.map(async (item: HistoryItem) => {
            try {
              const scoreResponse = await axiosApi.get(
                `/api/history/${item.quizsubmitId}`
              );
              const { totalScore } = scoreResponse.data;

              return {
                ...item,
                score: totalScore, // score를 totalScore로 설정
                totalQuestions: 10, // 총 문제 수를 10으로 설정 (필요시 변경 가능)
              };
            } catch (error) {
              console.error(
                `Failed to fetch score for quizsubmitId ${item.quizsubmitId}`,
                error
              );
              return item; // 점수 불러오기 실패 시 기본 데이터 반환
            }
          })
        );

        setHistoryData(updatedData);
      } catch (error) {
        console.error("Failed to fetch history data", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="w-[80%] p-8 bg-[#151515] overflow-y-auto h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mt-4">히스토리</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {historyData.map((item) => (
          <div
            key={item.quizsubmitId}
            className="bg-[#21201E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate(`/history/${item.quizsubmitId}`)}
          >
            <img
              src="/images/placeholder-image.png" // 필요 시 이미지 경로 수정
              alt={item.bookTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{item.bookTitle}</h2>
                <p className="text-lg font-bold">
                  {item.score !== undefined
                    ? `${item.score}/${item.totalQuestions}`
                    : "미채점"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">{`${item.publishedYear} | ${item.author}`}</p>
                <button className="text-sm font-bold text-purple-500">상세보기</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryMain;
