export interface Player {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  health: number;
  isAlive: boolean;
  killNum: number;
  damageDealt: number;
  rank: number;
  location?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ObservedPlayer {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  health: number;
  armor: number;
  helmet: number;
  backpack: number;
}

export interface TeamInfo {
  teamId: string;
  teamName: string;
  teamNumber: number;
  liveMemberCount: number;
  totalKills: number;
  rank: number;
}

export interface GameData {
  observedPlayer: ObservedPlayer | null;
  teamMembers: Player[];
  teamInfo: TeamInfo | null;
  allPlayers: Player[];
  isConnected: boolean;
  lastUpdated: number;
}
