import { PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CivilizationsLayout({ children }: PropsWithChildren) {
  return (
    <section className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Civilizations Picker</h1>

        <Link 
          href='https://github.com/PavelKundenko/civ6-picker' 
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center hover:opacity-80 transition-opacity'
        >
          <Image
            src='/github.svg'
            alt='GitHub'
            width={20}
            height={20}
          />

          <span className='font-semibold text-sm ml-2 hidden sm:inline'>Project Repo</span>
        </Link>
      </div>
      {children}
    </section>
  );
}
