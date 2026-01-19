import { ICiv } from '@/models/civiliations/civ';

export enum EStep {
  List          = 'list',
  PlayersNumber = 'players-number',
  Result        = 'result',
}

export interface IPlayerDraft {
  playerId   : number;
  playerName : string;
  civs       : ICiv[];
}