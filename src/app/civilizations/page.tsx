import { type ICiv } from './models/civ';
import { Container } from './Container';
import fs from 'node:fs';
import path from 'node:path';

async function getLeadersData() {
  const filePath = path.join(process.cwd(), 'data', 'leaders.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(jsonData) as ICiv[];
}

export default async function Civilizations() {
  const civs = await getLeadersData();

  return (
    <section className='container mx-auto p-6'>
      <h1 className='mb-8 text-3xl font-bold'>Civilizations</h1>
      <Container civs={civs} />
    </section>
  );
}
