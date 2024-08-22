import React, { useEffect, useState } from "react";
import axiosApi from "../../axios"; // axios 인스턴스
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  bookTitle: string;
  author: string;
  publishedYear: number;
  quizsubmitId: number;
}

function HistoryMain() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axiosApi.get("/api/history");
        setHistoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch history data", error);
      }
    };

    fetchHistoryData();
  }, []);

  const handleDetailView = (quizsubmitId: number) => {
    navigate(`/history/${quizsubmitId}`);
  };

  return (
    <div className="w-[80%] p-8 bg-[#151515] overflow-y-auto h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mt-4">히스토리</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {historyData.map((item, index) => (
          <div
            key={index}
            className="bg-[#21201E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src="/images/placeholder-image.png" // 책의 이미지가 없는 경우 placeholder 이미지 사용
              alt={item.bookTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{item.bookTitle}</h2>
                <p className="text-lg font-bold">점수 확인</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">{`${item.publishedYear} | ${item.author}`}</p>
                <button
                  className="text-sm font-bold text-purple-500"
                  onClick={() => handleDetailView(item.quizsubmitId)}
                >
                  상세보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryMain;
