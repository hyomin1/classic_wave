import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../../components/SideBar";
import HistoryMain from "./HistoryMain";
import HistoryDetail from "./HistoryDetail";

function History() {
  return (
    <div className="flex h-screen">
      <SideBar />
        <Routes>
          <Route path="/" element={<HistoryMain />} />
          <Route path=":quizsubmitId" element={<HistoryDetail />} />
        </Routes>
    </div>
  );
}

export default History;
