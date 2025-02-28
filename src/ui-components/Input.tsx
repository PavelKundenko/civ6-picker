'use client';

import { FC, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const Input: FC<IInputProps> = ({
  label,
  error,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={twMerge('w-full relative', className)}>
      {label && (
        <label 
          htmlFor={inputId}
          className={twMerge(
            'block mb-1 text-sm font-medium text-gray-200',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={twMerge(
          'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          inputClassName
        )}
        {...props}
      />
      {error && (
        <p className={twMerge('absolute left-0 -bottom-5 text-sm text-red-400', errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};
