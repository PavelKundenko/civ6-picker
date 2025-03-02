import fs from 'node:fs';
import path from 'node:path';

import { type ICiv } from '@/models/civiliations/civ';
import { Container } from './Container';

function getLeadersData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'leaders.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(jsonData) as ICiv[];
}

export default function Civilizations() {
  const civs = getLeadersData();

  return <Container civs={civs} />;
}
