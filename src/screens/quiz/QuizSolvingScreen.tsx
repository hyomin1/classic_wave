import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "./Stepper";
import QuizCompleteScreen from "./QuizCompleteScreen"; // 모달 컴포넌트 추가

export const QuizSolvingScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계 (1부터 시작)
  const [score, setScore] = useState(0); // 점수 관리
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(10).fill(false)); // 각 질문에 대한 점수 계산 여부
  const totalSteps = 10;  // 총 단계 수

  const handlePreviousPage = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1); // 첫 번째 단계에서 이전 페이지로 이동
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalSteps + 1); // 모든 단계 완료 후 모달을 띄우기 위해 +1으로 설정
    }
  };

  const handleOptionSelect = () => {
    if (!answeredQuestions[currentStep - 1]) { // 이미 점수가 계산된 문제가 아닌 경우
      setScore(score + 1); // 점수 증가 (임의로 1점 추가)
      const updatedAnswers = [...answeredQuestions];
      updatedAnswers[currentStep - 1] = true; // 현재 질문에 대해 점수 계산 완료
      setAnsweredQuestions(updatedAnswers);
    }
    handleNextStep();
  };

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
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />

      {/* 문제와 선택지 */}
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="bg-[#6100c2] rounded-lg p-8 max-w-4xl w-full">
          <h2 className="text-white text-3xl font-bold mb-8">
            {`In Robinson Crusoe, what word best describes Crusoe’s ability to build shelter, find food, and survive on the island? (Question ${currentStep})`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className="bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleOptionSelect}
            >
              Adventure
            </button>
            <button
              className="bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleOptionSelect}
            >
              Providence
            </button>
            <button
              className="bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleOptionSelect}
            >
              Survival
            </button>
            <button
              className="bg-[#d1d1d1] text-black py-4 px-8 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleOptionSelect}
            >
              Isolation
            </button>
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
      {currentStep > totalSteps && (
        <QuizCompleteScreen score={score} totalQuestions={totalSteps} />
      )}
    </div>
  );
};

export default QuizSolvingScreen;