import React from "react";

function ProfileMain() {
  return (
    <div className="flex flex-col items-start w-[80%] p-8 bg-black">
      <h1 className="text-white text-3xl font-bold mb-8">내 정보</h1>
      
      {/* 배지와 업데이트 버튼 */}
      <div className="flex items-center mb-8 justify-start">
        <img src="/images/grade.png" alt="Grade Badge" className="w-32 h-32" />
        <button className="bg-[#6100c2] text-white px-6 py-2 rounded-lg font-bold text-lg ml-8 hover:bg-purple-700">
          업데이트
        </button>
      </div>

      {/* 이름 입력란 */}
      <div className="w-full mb-8">
        <label className="text-white text-lg font-bold mb-2 block">이름</label>
        <input
          type="text"
          className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white"
          defaultValue="Morty Smith"
        />
      </div>

      {/* 소개 입력란 */}
      <div className="w-full mb-8">
        <label className="text-white text-lg font-bold mb-2 block">소개</label>
        <textarea
          className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white"
          rows={5}
          defaultValue="Welcome to my scheduling page. Please follow the instructions to add an event to my calendar."
        />
      </div>
    </div>
  );
}

export default ProfileMain;
