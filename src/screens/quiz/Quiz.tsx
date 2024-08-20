import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizStartScreen from "./QuizStartScreen";
import QuizSolvingScreen from "./QuizSolvingScreen";
import SideBar from "../../components/SideBar"; // SideBar 컴포넌트 추가

function Quiz() {
  return (
    <div className="flex">
      <SideBar />  {/* 사이드바를 추가하여 왼쪽에 고정 */}
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<QuizStartScreen />} />
          <Route path="solve" element={<QuizSolvingScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default Quiz;
