import React from "react";

function AddListingStepper({ steps, currentStep }) {
  return (
    <div className="flex justify-center mb-8">
      <ol className="flex space-x-8">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          return (
            <li className="flex flex-col items-center" key={label}>
              <span
                className={
                  "w-8 h-8 flex items-center justify-center rounded-full font-bold mb-1 " +
                  (isActive
                    ? "bg-blue-600 text-white"
                    : "border-2 border-gray-300 text-gray-500 bg-white")
                }
              >
                {stepNum}
              </span>
              <span
                className={
                  "text-sm font-semibold " +
                  (isActive ? "text-blue-600" : "text-gray-500")
                }
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default AddListingStepper;