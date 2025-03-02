import { PropsWithChildren } from 'react';

export default function CivilizationsLayout({ children }: PropsWithChildren) {
  return (
    <section className='container mx-auto p-6'>
      <h1 className='mb-8 text-3xl font-bold'>Civilizations Picker</h1>
      {children}
    </section>
  );
}
