import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper } from "./Stepper";
import QuizCompleteScreen from "./QuizCompleteScreen";
import axiosApi from "../../axios"; // axios 인스턴스

export const QuizSolvingScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {}; // 이전 페이지에서 전달된 책 정보
  const [currentStep, setCurrentStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [quizListId, setQuizListId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가: 퀴즈 제출 상태
  const [score, setScore] = useState(0); // 점수 상태 추가

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (book?.name) {
          const response = await axiosApi.post("/api/quiz/addOrView", {
            bookTitle: book.name,
          });

          setQuizData(response.data.questions);
          setQuizListId(response.data.quizListId);
        } else {
          console.error("No book name provided");
        }
      } catch (error) {
        console.error("Failed to fetch quiz data", error);
      }
    };

    if (book) {
      fetchQuizData();
    }
  }, [book]);

  const handlePreviousPage = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < quizData.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true); // 제출 시작
    }
  };

  const handleOptionSelect = (selectedOption: number) => {
    if (answeredQuestions[currentStep - 1] === undefined) {
      const updatedAnswers = [...answeredQuestions];
      updatedAnswers[currentStep - 1] = selectedOption;
      setAnsweredQuestions(updatedAnswers);
      // 정답 체크
      if (quizData[currentStep - 1]?.answer === String(selectedOption)) {
        setScore((prevScore) => prevScore + 1); // 점수 증가
      }
    }
    handleNextStep();
  };

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizData[currentStep - 1];

  return (
    <div className="bg-[#151515] flex flex-col items-center justify-between w-full h-screen px-12 py-8">
      {/* 상단 로고 */}
      <div className="flex items-center w-full">
        <img className="w-8 h-8" alt="Coffee" src="/images/coffee.svg" />
        <div className="ml-2 text-white text-[22px] font-bold tracking-[1.32px]">
          CLASSIC_WAVE
        </div>
      </div>

      {/* 스텝퍼 */}
      <Stepper currentStep={currentStep} totalSteps={quizData.length} />

      {/* 문제와 선택지 */}
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="bg-[#6100c2] rounded-lg p-8 max-w-4xl w-full">
          <h2 className="mb-8 text-3xl font-bold text-white">
            {currentQuiz?.question || "Loading..."} (Question {currentStep})
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {currentQuiz &&
              Object.keys(currentQuiz.options).map((key, index) => (
                <button
                  key={index}
                  className={`bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors ${
                    answeredQuestions[currentStep - 1] === Number(key)
                      ? "bg-[#b0b0b0]"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(Number(key))}
                >
                  {currentQuiz.options[key]}
                </button>
              ))}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
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

      {/* 퀴즈 완료 모달 */}
      {isSubmitting && quizListId !== null && (
        <QuizCompleteScreen
          score={score}
          totalQuestions={quizData.length}
          quizListId={quizListId}
          userAnswers={answeredQuestions}
        />
      )}
    </div>
  );
};

export default QuizSolvingScreen;
