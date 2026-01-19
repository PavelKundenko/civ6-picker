export interface ICivFull {
  id: number;
  civilization: string;
  leader: string;
  expansion: string;
  leaderAbility: string;
  civAbility: string;
  uniqueUnits: string[];
  uniqueInfrastructure: string[];
  avatar: string;
  isBannedByDefault?: boolean;
}

export interface ICiv {
  id: number;
  civilization: string;
  leader: string;
  avatar: string;
  isBannedByDefault?: boolean;
}
