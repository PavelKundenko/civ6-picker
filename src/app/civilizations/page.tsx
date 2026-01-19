import { cache } from 'react';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { type ICiv, type ICivFull } from '@/models/civiliations/civ';
import { Container } from './Container';

const getLeadersData = cache(async (): Promise<ICiv[]> => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'leaders.json');

  const jsonData = await readFile(filePath, 'utf8');

  const fullCivs = JSON.parse(jsonData) as ICivFull[];
  
  return fullCivs.map(({ id, civilization, leader, avatar, isBannedByDefault }) => ({
    id,
    civilization,
    leader,
    avatar,
    isBannedByDefault,
  }));
});

export default async function Civilizations() {
  const civs = await getLeadersData();

  return <Container civs={civs} />;
}
