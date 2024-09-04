import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axios"; // axios 인스턴스
import Header from "../../components/Header";

interface HistoryItem {
  quizsubmitId: number;
  bookTitle: string;
  author: string;
  publishedYear: number;
  score?: number;
  totalQuestions?: number;
  bookId: number;
}

function HistoryMain() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [bookImg, setBookImg] = useState<any>();
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
        await fetchImg(updatedData);
      } catch (error) {
        console.error("Failed to fetch history data", error);
      }
    };

    fetchHistoryData();
  }, []);
  const fetchImg = async (historyData: HistoryItem[]) => {
    // data?.content가 undefined일 경우 빈 배열을 기본값으로 사용
    const imgs =
      historyData?.map(async (history) => {
        const res = await axiosApi.get("/api/book/thumbnail", {
          params: {
            bookId: history.bookId,
          },
        });

        return res.data;
      }) || []; // 빈 배열을 기본값으로 설정

    try {
      // imgs가 빈 배열이 아닌 경우에만 Promise.all을 호출
      const imgurl = await Promise.all(imgs);
      setBookImg(imgurl);
    } catch (error) {
      console.error("Failed to fetch image URLs", error);
    }
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <Header />
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">히스토리</span>
      </div>

      <div className="grid w-full grid-cols-4 gap-4 overflow-y-auto scrollbar">
        {historyData.map((item, index) => (
          <div
            key={item.quizsubmitId}
            className="border border-white rounded-2xl hover:opacity-60 w-[90%] mb-8"
            onClick={() => navigate(`/history/${item.quizsubmitId}`)}
          >
            <div
              className="bg-cover w-[100%] h-44 rounded-t-2xl flex justify-end"
              style={{ backgroundImage: `url('${bookImg && bookImg[index]}')` }}
            ></div>

            <div className="w-[100%] rounded-b-2xl bg-[#e9e8eb] h-20 flex flex-col justify-center px-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-black">
                  {item.bookTitle}
                </h2>
                <p className="text-lg font-bold text-black">
                  {item.score !== undefined
                    ? `${item.score}/${item.totalQuestions}`
                    : "미채점"}
                </p>
              </div>
              <span className="text-gray-500">{`${item.publishedYear} | ${item.author}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryMain;