'use client';

import { FC, ReactNode } from 'react';

interface IStepInstructionsProps {
  currentStep  : number;
  totalSteps   : number;
  title        : string;
  instructions : ReactNode;
}

export const StepInstructions: FC<IStepInstructionsProps> = ({
  currentStep,
  totalSteps,
  title,
  instructions,
}) => {
  return (
    <div className='mb-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <span className='inline-flex items-center justify-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium'>
          Step {currentStep} of {totalSteps}
        </span>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <p className='text-gray-400'>{instructions}</p>
    </div>
  );
};
