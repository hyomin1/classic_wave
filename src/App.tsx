import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizStartScreen } from "./QuizStartScreen/QuizStartScreen";
import { QuizSolvingScreen } from "./QuizSolvingScreen/QuizSolvingScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizStartScreen />} />
        <Route path="/quiz" element={<QuizSolvingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
