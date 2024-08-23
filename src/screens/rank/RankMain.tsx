import React from "react";

interface RankItem {
  id: number;
  name: string;
  score: number;
  photoUrl: string;
}

const rankData: RankItem[] = [
  {
    id: 1,
    name: "Antonio Lima",
    score: 24,
    photoUrl: "/images/user1.png",
  },
  {
    id: 2,
    name: "Fernanda Araujo",
    score: 22,
    photoUrl: "/images/user2.png",
  },
  {
    id: 3,
    name: "Valdilene Carvalho",
    score: 21,
    photoUrl: "/images/user3.png",
  },
  {
    id: 4,
    name: "Rafael Pereira",
    score: 20,
    photoUrl: "/images/user4.png",
  },
  {
    id: 5,
    name: "Larissa Santos",
    score: 19,
    photoUrl: "/images/user5.png",
  },
  {
    id: 6,
    name: "Gabrielly Tavares",
    score: 22,
    photoUrl: "/images/user6.png",
  },
  {
    id: 7,
    name: "Lucas Ferreira",
    score: 15,
    photoUrl: "/images/user7.png",
  },
  {
    id: 8,
    name: "Beatriz Silva",
    score: 14,
    photoUrl: "/images/user8.png",
  },
  {
    id: 9,
    name: "Carlos Eduardo",
    score: 24,
    photoUrl: "/images/user9.png",
  },
  {
    id: 10,
    name: "Amanda Souza",
    score: 12,
    photoUrl: "/images/user10.png",
  },
  // 추가적인 데이터 예시
];

function RankMain() {
  // 사용자 데이터를 점수 내림차순, 이름 오름차순으로 정렬
  const sortedRankData = [...rankData].sort((a, b) => {
    if (b.score === a.score) {
      return a.name.localeCompare(b.name); // 이름 사전순 정렬
    }
    return b.score - a.score;
  });

  // 상위 3명 추출 (사용자가 3명 이하일 경우에도 대응)
  const topThree = sortedRankData.slice(0, Math.min(3, sortedRankData.length));

  // 4등 이후 유저들 추출 (3명 이하일 경우는 빈 리스트)
  const leaderboard = sortedRankData.length > 3 ? sortedRankData.slice(3) : [];

  // 프로필 이미지가 없을 경우 기본 이미지로 설정하는 함수
  const getProfileImage = (photoUrl: string) => {
    return photoUrl || "/images/profile.png";
  };

  return (
    <div className="flex w-full h-full bg-[#151515] text-white">
      <div className="flex-1 overflow-y-auto p-8">
        {/* 상단 제목 */}
        <h1 className="text-4xl font-bold mb-8">랭킹</h1>

        {/* 상위 3명 랭킹 */}
        <div className="flex justify-center items-end mb-8">
          {topThree.length > 1 && (
            <div className="flex flex-col items-center p-4 mt-8">
              <img
                src={getProfileImage(topThree[1].photoUrl)}
                alt={topThree[1].name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <span className="text-lg font-bold">{topThree[1].name}</span>
              <div className="w-24 h-40 flex flex-col justify-center items-center mt-2 bg-[#6100c2] rounded-lg">
                <div className="text-4xl font-bold mb-2">🎖️</div>
                <span className="text-4xl font-bold">{topThree[1].score}</span>
                <span className="text-lg font-semibold">Vendas</span>
              </div>
            </div>
          )}
          {topThree.length > 0 && (
            <div className="flex flex-col items-center p-4">
              <img
                src={getProfileImage(topThree[0].photoUrl)}
                alt={topThree[0].name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <span className="text-lg font-bold">{topThree[0].name}</span>
              <div className="w-24 h-52 flex flex-col justify-center items-center mt-2 bg-[#FFD700] rounded-lg">
                <div className="text-4xl font-bold mb-2">🏆</div>
                <span className="text-4xl font-bold">{topThree[0].score}</span>
                <span className="text-lg font-semibold">Vendas</span>
              </div>
            </div>
          )}
          {topThree.length > 2 && (
            <div className="flex flex-col items-center p-4 mt-8">
              <img
                src={getProfileImage(topThree[2].photoUrl)}
                alt={topThree[2].name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <span className="text-lg font-bold">{topThree[2].name}</span>
              <div className="w-24 h-36 flex flex-col justify-center items-center mt-2 bg-[#6100c2] rounded-lg">
                <div className="text-4xl font-bold mb-2">🎖️</div>
                <span className="text-4xl font-bold">{topThree[2].score}</span>
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
                  <th className="text-left p-2">Rank</th>
                  <th className="text-left p-2">Foto</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-center p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={item.id} className="border-t border-gray-700">
                    <td className="p-2">{index + 4}</td>
                    <td className="p-2">
                      <img
                        src={getProfileImage(item.photoUrl)}
                        alt={item.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">{item.score}</td>
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
