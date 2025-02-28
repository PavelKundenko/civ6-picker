import { ICiv } from '@/app/civilizations/models/civ';
import { IPlayerDraft } from '@/app/civilizations/models/step';

export const searchCivs = (civs: ICiv[], search: string) => {
  return civs.filter((civ) =>
    civ.civilization.toLowerCase().includes(search.toLowerCase()) ||
    civ.leader.toLowerCase().includes(search.toLowerCase()));
};

export const suffleCivs = (
  civs: ICiv[],
  activeCivIds: number[],
  playersNumber: number,
  civsToPlayerNumber: number,
): IPlayerDraft[] => {
  const activeCivs = civs.filter(civ => activeCivIds.includes(civ.id));
      
  const shuffledCivs = [...activeCivs].sort(() => Math.random() - 0.5);
  
  const results: IPlayerDraft[] = [];
  
  for (let i = 0; i < playersNumber; i++) {
    const startIndex = i * civsToPlayerNumber;
    const endIndex = startIndex + civsToPlayerNumber;
    
    const playerCivs = shuffledCivs.slice(startIndex, endIndex);
    
    results.push({
      playerId: i + 1,
      civs: playerCivs,
    });
  }

  return results;
}