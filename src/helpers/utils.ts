import { ICiv } from '@/models/civiliations/civ';
import { IPlayerDraft } from '@/models/civiliations/step';

export const searchCivs = (civs: ICiv[], search: string) => {
  return civs.filter((civ) =>
    civ.civilization.toLowerCase().includes(search.toLowerCase()) ||
    civ.leader.toLowerCase().includes(search.toLowerCase()));
};

export const suffleCivs = (
  civs: ICiv[],
  activeCivIds: number[],
  playerNames: string[],
  civsToPlayerNumber: number,
): IPlayerDraft[] => {
  const activeCivs = civs.filter(civ => activeCivIds.includes(civ.id));
      
  const shuffledCivs = [...activeCivs];

  for (let index = shuffledCivs.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledCivs[index], shuffledCivs[randomIndex]] = [shuffledCivs[randomIndex], shuffledCivs[index]];
  }
  
  const results: IPlayerDraft[] = [];
  
  for (let index = 0; index < playerNames.length; index++) {
    const startIndex = index * civsToPlayerNumber;
    const endIndex = startIndex + civsToPlayerNumber;
    
    const playerCivs = shuffledCivs.slice(startIndex, endIndex);
    
    results.push({
      playerId: index + 1,
      playerName: playerNames[index],
      civs: playerCivs,
    });
  }

  return results;
}