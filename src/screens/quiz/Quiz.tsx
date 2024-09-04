// Quiz.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizSolvingScreen from "./QuizSolvingScreen"; 

function Quiz() {

  return (
    <Routes>
      <Route path="/" element={<QuizSolvingScreen />} />
      <Route path="solve" element={<QuizSolvingScreen />} />
    </Routes>
  );
}

export default Quiz;
