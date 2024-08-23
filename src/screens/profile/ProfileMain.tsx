import React, { useState, useEffect } from "react";
import axiosApi from "../../axios"; // axios 인스턴스

function ProfileMain() {
  const [name, setName] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    // 프로필 정보 불러오기
    const fetchProfile = async () => {
      try {
        const response = await axiosApi.get("/api/profile");
        setName(response.data.name);
        setIntroduction(response.data.introduction);
      } catch (error) {
        console.error("Failed to fetch profile information", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // 서버로 PATCH 요청 보내기
      await axiosApi.patch("/api/profile", {
        name,
        introduction,
      });
      alert("프로필이 업데이트되었습니다.");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-start w-[80%] p-8 bg-black">
      <h1 className="text-white text-3xl font-bold mb-8">내 정보</h1>
      
      {/* 배지와 업데이트 버튼 */}
      <div className="flex items-center mb-8 justify-start">
        <img src="/images/grade.png" alt="Grade Badge" className="w-32 h-32" />
        <button
          className="bg-[#6100c2] text-white px-6 py-2 rounded-lg font-bold text-lg ml-8 hover:bg-purple-700"
          onClick={handleUpdateProfile}
        >
          업데이트
        </button>
      </div>

      {/* 이름 입력란 */}
      <div className="w-full mb-8">
        <label className="text-white text-lg font-bold mb-2 block">이름</label>
        <input
          type="text"
          className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 소개 입력란 */}
      <div className="w-full mb-8">
        <label className="text-white text-lg font-bold mb-2 block">소개</label>
        <textarea
          className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white"
          rows={5}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ProfileMain;
