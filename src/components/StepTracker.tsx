import React, { useState } from 'react';
import { CheckCircle2, Circle, Lightbulb, AlertCircle } from 'lucide-react';
import { TutorialStep } from '../types';

interface StepTrackerProps {
  steps: TutorialStep[];
}

export const StepTracker: React.FC<StepTrackerProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const percentComplete = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="my-8 bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#F0EAE1] gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#261E1A]">
            Step-by-Step Instructions
          </h2>
          <p className="text-xs text-[#5C4D44] mt-1">
            Follow along and click each step to track your progress at your sewing table.
          </p>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center space-x-3 bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#E3EBE5]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F5947]">
            {completedSteps.length} of {steps.length} Steps Done
          </span>
          <div className="w-20 bg-[#EAE5DE] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#577861] h-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step) => {
          const isDone = completedSteps.includes(step.stepNumber);
          return (
            <div
              key={step.stepNumber}
              className={`p-5 rounded-xl border transition-all duration-200 ${
                isDone
                  ? 'bg-[#F3F6F4] border-[#C5D7C9]'
                  : 'bg-[#FAF7F2] border-[#EAE3D9] hover:border-[#D6CCC0]'
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  type="button"
                  onClick={() => toggleStep(step.stepNumber)}
                  className="mt-0.5 text-[#577861] hover:text-[#3F5947] focus:outline-none focus:ring-2 focus:ring-[#577861] rounded-full shrink-0"
                  aria-label={isDone ? `Mark step ${step.stepNumber} incomplete` : `Mark step ${step.stepNumber} complete`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-[#577861] fill-[#E3EBE5]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#8C7A6B]" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#577861] bg-[#E3EBE5] px-2 py-0.5 rounded">
                      Step {step.stepNumber}
                    </span>
                    <h3 className={`font-serif text-lg font-semibold text-[#261E1A] ${isDone ? 'line-through text-[#8C7A6B]' : ''}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#382C26] leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {step.proTip && (
                    <div className="mt-2 text-xs bg-[#FFFFFF] rounded-lg p-3 border border-[#E3EBE5] flex items-start space-x-2 text-[#3F5947]">
                      <Lightbulb className="w-4 h-4 text-[#577861] shrink-0 mt-0.5" />
                      <span><strong>Pro Tip:</strong> {step.proTip}</span>
                    </div>
                  )}

                  {step.checkpoint && (
                    <div className="mt-2 text-xs bg-[#FAF6F0] rounded-lg p-2.5 border border-[#EAE5DE] flex items-start space-x-2 text-[#5C4D44]">
                      <AlertCircle className="w-4 h-4 text-[#C87878] shrink-0 mt-0.5" />
                      <span><strong>Quality Checkpoint:</strong> {step.checkpoint}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
