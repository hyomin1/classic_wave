import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "./Stepper";
import QuizCompleteScreen from "./QuizCompleteScreen";
import axiosApi from "../../axios";  // axios 인스턴스

export const QuizSolvingScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [quizListId, setQuizListId] = useState<number | null>(null);
  const totalSteps = 10;
  const bookTitle = "Robinson Crusoe";

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axiosApi.post("/api/quiz/create", { bookTitle });
        setQuizData(response.data.quiz);
        setQuizListId(response.data.quizListId);
      } catch (error) {
        console.error("Failed to fetch quiz data", error);
      }
    };

    fetchQuizData();
  }, [bookTitle]);

  const handlePreviousPage = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalSteps + 1);
    }
  };

  const handleOptionSelect = (selectedOption: number) => {
    if (answeredQuestions[currentStep - 1] === undefined) {
      const correctAnswer = quizData[currentStep - 1]?.answer;  // 안전하게 접근
      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }
      const updatedAnswers = [...answeredQuestions];
      updatedAnswers[currentStep - 1] = selectedOption;
      setAnsweredQuestions(updatedAnswers);
    }
    handleNextStep();
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizData[currentStep - 1]; // 방어적 접근

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      <div className="flex items-center w-full">
        <img className="w-8 h-8" alt="Coffee" src="/images/coffee.svg" />
        <div className="ml-2 text-white text-[22px] font-bold tracking-[1.32px]">
          CLASSIC_WAVE
        </div>
      </div>

      <Stepper currentStep={currentStep} totalSteps={totalSteps} />

      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="bg-[#6100c2] rounded-lg p-8 max-w-4xl w-full">
          <h2 className="text-white text-3xl font-bold mb-8">
            {currentQuiz?.question || "Loading..."} (Question {currentStep})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuiz &&
              Object.keys(currentQuiz.options).map((key, index) => (
                <button
                  key={index}
                  className="bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => handleOptionSelect(Number(key))}
                >
                  {currentQuiz.options[key]}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-between w-full max-w-4xl mt-12">
          <button
            onClick={handlePreviousPage}
            className="bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
          >
            이전 페이지
          </button>
          <button
            onClick={handleNextStep}
            className="bg-[#6100c2] text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
          >
            다음 페이지
          </button>
        </div>
      </div>

      {currentStep > totalSteps && quizListId !== null && (
        <QuizCompleteScreen
          score={score}
          totalQuestions={totalSteps}
          quizListId={quizListId}
          userAnswers={answeredQuestions}
        />
      )}
    </div>
  );
};

export default QuizSolvingScreen;
