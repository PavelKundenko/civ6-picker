'use client';

interface IErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: IErrorProps) {
  return (
    <div className='p-6'>
      <p>Something went wrong.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
