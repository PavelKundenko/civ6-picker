import { FC, ReactNode } from 'react';

interface IToolbarProps {
  children: ReactNode;
}

export const Toolbar: FC<IToolbarProps> = ({ children }) => {
  return (
    <div className='flex flex-col sm:flex-row items-end gap-4 mb-4 px-4 pt-4 pb-6 bg-slate-900 rounded-lg'>
      {children}
    </div>
  );
};