import { ICiv } from '@/app/civilizations/models/civ';

export enum EStep {
  List          = 'list',
  PlayersNumber = 'players-number',
  Result        = 'result',
}

export interface IPlayerDraft {
  playerId: number;
  civs: ICiv[];
}