import React from "react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { label: "Choose Dishes", icon: "🍽" },
    { label: "Verify Phone", icon: "📞" },
    { label: "Submit Form", icon: "📋" },
  ];

  return (
<div className="lg:w-2/3 mx-auto">        
    <div className="flex  items-center justify-between lg:pb-3 bg-[var(--background)]">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center space-x-2 ${
            index + 1 <= currentStep ? "text-[var(--button)]" : "text-gray-400"
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
            {index + 1 < currentStep ? <span className="pb-1">{"✔️"}</span> : step.icon}
          </div>
          <span className="max-md:text-xs ">{step.label}</span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProgressSteps;
