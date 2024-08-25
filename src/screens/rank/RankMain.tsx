import React, { useEffect, useState } from "react";
import axiosApi from "../../axios";

interface RankItem {
  loginId: string;
  name: string;
  rating: number;
  photoUrl?: string;
}

function RankMain() {
  const [rankData, setRankData] = useState<RankItem[]>([]);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await axiosApi.get<RankItem[]>("/api/ranking");
        setRankData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch ranking data", error);
      }
    };

    fetchRankData();
  }, []);

  // 사용자 데이터를 점수 내림차순, 이름 오름차순으로 정렬
  const sortedRankData = [...rankData].sort((a, b) => {
    if (b.rating === a.rating) {
      return a.name.localeCompare(b.name); // 이름 사전순 정렬
    }
    return b.rating - a.rating;
  });

  // 상위 3명 추출 (사용자가 3명 이하일 경우에도 대응)
  const topThree = sortedRankData.slice(0, Math.min(3, sortedRankData.length));

  // 4등 이후 유저들 추출 (3명 이하일 경우는 빈 리스트)
  const leaderboard = sortedRankData.length > 3 ? sortedRankData.slice(3) : [];

  // 프로필 이미지가 없을 경우 기본 이미지로 설정하는 함수
  const getProfileImage = (photoUrl?: string) => {
    return photoUrl || "/profile.png";
  };

  console.log(topThree);

  return (
    <div className="flex w-full h-full bg-[#151515] text-white">
      <div className="flex-1 p-8 overflow-y-auto">
        {/* 상단 제목 */}
        <h1 className="mb-8 text-4xl font-bold">랭킹</h1>

        {/* 상위 3명 랭킹 */}
        <div className="flex items-end justify-center mb-8">
          {topThree.length > 1 && (
            <div className="flex flex-col items-center p-4 mt-8">
              {/* <img
                src={getProfileImage(topThree[1].photoUrl)}
                className="w-24 h-24 mb-2 rounded-full"
              /> */}
              <span className="text-lg font-bold">{topThree[1].name}</span>
              <div className="w-24 h-40 flex flex-col justify-center items-center mt-2 bg-[#6100c2] rounded-lg">
                <div className="mb-2 text-4xl font-bold">🎖️</div>
                <span className="text-4xl font-bold">{topThree[1].rating}</span>
                <span className="text-lg font-semibold">Vendas</span>
              </div>
            </div>
          )}
          {topThree.length > 0 && (
            <div className="flex flex-col items-center p-4">
              {/* <img
                src={getProfileImage(topThree[0].photoUrl)}
                alt={topThree[0].name}
                className="w-24 h-24 mb-2 rounded-full"
              /> */}
              <span className="text-lg font-bold">{topThree[0].name}</span>
              <div className="w-24 h-52 flex flex-col justify-center items-center mt-2 bg-[#FFD700] rounded-lg">
                <div className="mb-2 text-4xl font-bold">🏆</div>
                <span className="text-4xl font-bold">{topThree[0].rating}</span>
                <span className="text-lg font-semibold">Vendas</span>
              </div>
            </div>
          )}
          {topThree.length > 2 && (
            <div className="flex flex-col items-center p-4 mt-8">
              <img
                src={getProfileImage(topThree[2].photoUrl)}
                alt={topThree[2].name}
                className="w-24 h-24 mb-2 rounded-full"
              />
              <span className="text-lg font-bold">{topThree[2].name}</span>
              <div className="w-24 h-36 flex flex-col justify-center items-center mt-2 bg-[#6100c2] rounded-lg">
                <div className="mb-2 text-4xl font-bold">🎖️</div>
                <span className="text-4xl font-bold">{topThree[2].rating}</span>
                <span className="text-lg font-semibold">Vendas</span>
              </div>
            </div>
          )}
        </div>

        {/* 리더보드 (4명 이상일 경우만 표시) */}
        {leaderboard.length > 0 && (
          <div className="bg-[#21201E] rounded-lg p-4 shadow-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left">Rank</th>
                  <th className="p-2 text-left">Foto</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={item.loginId} className="border-t border-gray-700">
                    <td className="p-2">{index + 4}</td>
                    <td className="p-2">
                      <img
                        src={getProfileImage(item.photoUrl)}
                        alt={item.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RankMain;
