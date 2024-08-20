import React from "react";

interface RankItem {
  id: number;
  name: string;
  score: number;
  bookTitle: string;
  bookAuthor: string;
}

const rankData: RankItem[] = [
  {
    id: 1,
    name: "Alice",
    score: 98,
    bookTitle: "Robinson Crusoe",
    bookAuthor: "Daniel Defoe",
  },
  {
    id: 2,
    name: "Bob",
    score: 95,
    bookTitle: "Pride and Prejudice",
    bookAuthor: "Jane Austen",
  },
  // 추가적인 랭킹 데이터...
];

function RankMain() {
  return (
    <div className="w-[80%] p-8 bg-[#151515] text-white">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <div className="grid grid-cols-1 gap-6">
        {rankData.map((item) => (
          <div
            key={item.id}
            className="bg-[#21201E] rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-400">Score: {item.score}</p>
              <p className="text-gray-500">
                Book: {item.bookTitle} by {item.bookAuthor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankMain;
