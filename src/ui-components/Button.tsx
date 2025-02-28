'use client';

import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type TButtonVariant = 'primary' | 'success' | 'danger' | 'secondary';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
}

const variantStyles: Record<TButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
  success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
  danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500',
};

export const Button: FC<IButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => (
  <button
    className={twMerge(
      'px-4 py-2 rounded bg-purple-500',
      variantStyles[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);