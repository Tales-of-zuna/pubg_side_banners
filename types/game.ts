// types/game.ts
export interface Player {
  uId: number;
  playerName: string;
  playerOpenId: string;
  picUrl: string;
  showPicUrl: boolean;
  teamId: number;
  teamName: string;
  character: string;
  isFiring: boolean;
  bHasDied: boolean;
  location: {
    x: number;
    y: number;
    z: number;
  };
  health: number;
  healthMax: number;
  liveState: number; // 0 = alive, 1 = knocked, 2 = in vehicle/plane, 3 = dead
  killNum: number;
  killNumBeforeDie: number;
  playerKey: number;
  gotAirDropNum: number;
  maxKillDistance: number;
  damage: number;
  killNumInVehicle: number;
  killNumByGrenade: number;
  AIKillNum: number;
  BossKillNum: number;
  rank: number;
  isOutsideBlueCircle: boolean;
  inDamage: number;
  heal: number;
  headShotNum: number;
  survivalTime: number;
  driveDistance: number;
  marchDistance: number;
  assists: number;
  outsideBlueCircleTime: number;
  knockouts: number;
  rescueTimes: number;
  useSmokeGrenadeNum: number;
  useFragGrenadeNum: number;
  useBurnGrenadeNum: number;
  useFlashGrenadeNum: number;
  PoisonTotalDamage: number;
  UseSelfRescueTime: number;
  UseEmergencyCallTime: number;
}

export interface TeamInfo {
  teamId: number;
  teamName: string;
  isShowLogo: boolean;
  logoPicUrl: string;
  killNum: number;
  liveMemberNum: number;
}

export interface GameData {
  observedPlayerId: string | null;
  observedPlayer: Player | null;
  teamMembers: Player[];
  teamInfo: TeamInfo | null;
  allPlayers: Player[];
  isConnected: boolean;
  lastUpdated: number;
}