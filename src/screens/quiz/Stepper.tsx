import React from "react";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export const Stepper = ({ currentStep, totalSteps }: StepperProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full mt-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-4 ${
              index < currentStep
                ? "border-purple-700 bg-purple-700"
                : index === currentStep
                ? "border-purple-700 bg-white"
                : "border-gray-400 bg-gray-400"
            }`}
          >
            <span className={index === currentStep ? "text-purple-700" : "text-gray-700"}>{index + 1}</span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-1 ${
                index < currentStep ? "bg-yellow-400" : "bg-gray-400"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
