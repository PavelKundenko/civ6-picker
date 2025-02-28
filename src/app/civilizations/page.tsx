import { type ICiv } from './models/civ';
import { Container } from './Container';

export default async function Civilizations() {
  const response = await fetch('http://localhost:3000/data/leaders.json');

  const civs: ICiv[] = await response.json();

  return (
    <section className='container mx-auto p-6'>
      <h1 className='mb-8 text-3xl font-bold'>Civilizations</h1>

      <Container civs={civs} />
    </section>
  );
}
