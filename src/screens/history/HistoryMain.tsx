import React from "react";
import Title from "../../components/Title";

interface HistoryItem {
  id: number;
  title: string;
  author: string;
  year: number;
  imageUrl: string;
}

const historyData: HistoryItem[] = [
  {
    id: 1,
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    year: 1719,
    imageUrl: "/images/robinson-crusoe.jpg",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    imageUrl: "/images/pride-and-prejudice.jpg",
  },
  // 추가적인 히스토리 데이터...
];

function HistoryMain() {
  return (
    <div className="w-[80%] p-8">
      <div className="mb-8">
        <Title />
        <h1 className="text-3xl font-bold text-white mt-4">Your Quiz History</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="bg-[#21201E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-400">{item.author}</p>
              <p className="text-gray-500">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryMain;
