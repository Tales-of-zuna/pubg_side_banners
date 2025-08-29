import { GameData, Player, TeamInfo } from "@/types/game";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 2000;

export function useGameData() {
  const [gameData, setGameData] = useState<GameData>({
    observedPlayer: null,
    teamMembers: [],
    teamInfo: null,
    allPlayers: [],
    isConnected: false,
    lastUpdated: 0,
  });

  const fetchGameData = useCallback(async () => {
    try {
      const [observedRes, playersRes, teamInfoRes] = await Promise.all([
        fetch("/api/observed"),
        fetch("/api/battle"),
        fetch("/api/teamInfo"),
      ]);

      const [observedPlayer, allPlayers, teamInfoList] = await Promise.all([
        observedRes.json(),
        playersRes.json(),
        teamInfoRes.json(),
      ]);

      // Filter team members based on observed player's team
      let teamMembers: Player[] = [];
      let teamInfo: TeamInfo | null = null;

      if (observedPlayer && observedPlayer.teamId) {
        teamMembers = allPlayers.filter(
          (player: Player) => player.teamId === observedPlayer.teamId,
        );

        teamInfo =
          teamInfoList.find(
            (team: TeamInfo) => team.teamId === observedPlayer.teamId,
          ) || null;
      }

      setGameData({
        observedPlayer,
        teamMembers,
        teamInfo,
        allPlayers,
        isConnected: true,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      console.error("Error fetching game data:", error);
      setGameData((prev) => ({
        ...prev,
        isConnected: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchGameData();
    const interval = setInterval(fetchGameData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchGameData]);

  return gameData;
}

// import { GameData, Player, TeamInfo } from "@/types/game";
// import { useCallback, useEffect, useState } from "react";

// const REFRESH_INTERVAL = 1000; // 1 second

// // Demo data for testing
// const DEMO_OBSERVED_PLAYER = {
//   playerId: "player-001",
//   playerName: "ShroudGaming",
//   teamId: "team-alpha",
//   teamName: "Alpha Squad",
//   health: 85,
//   armor: 2,
//   helmet: 3,
//   backpack: 3,
// };

// const DEMO_TEAM_MEMBERS: Player[] = [
//   {
//     playerId: "player-001",
//     playerName: "ShroudGaming",
//     teamId: "team-alpha",
//     teamName: "Alpha Squad",
//     health: 85,
//     isAlive: true,
//     killNum: 7,
//     damageDealt: 1245,
//     rank: 1,
//     location: { x: 100, y: 200, z: 10 },
//   },
//   {
//     playerId: "player-002",
//     playerName: "NinjaWarrior",
//     teamId: "team-alpha",
//     teamName: "Alpha Squad",
//     health: 92,
//     isAlive: true,
//     killNum: 5,
//     damageDealt: 980,
//     rank: 1,
//     location: { x: 105, y: 195, z: 12 },
//   },
//   {
//     playerId: "player-003",
//     playerName: "TacticalAce",
//     teamId: "team-alpha",
//     teamName: "Alpha Squad",
//     health: 0,
//     isAlive: false,
//     killNum: 3,
//     damageDealt: 650,
//     rank: 1,
//     location: { x: 95, y: 205, z: 8 },
//   },
//   {
//     playerId: "player-004",
//     playerName: "SnipeElite",
//     teamId: "team-alpha",
//     teamName: "Alpha Squad",
//     health: 67,
//     isAlive: true,
//     killNum: 4,
//     damageDealt: 820,
//     rank: 1,
//     location: { x: 110, y: 190, z: 15 },
//   },
// ];

// const DEMO_TEAM_INFO: TeamInfo = {
//   teamId: "team-alpha",
//   teamName: "Alpha Squad",
//   teamNumber: 7,
//   liveMemberCount: 3,
//   totalKills: 19,
//   rank: 1,
// };

// const DEMO_ALL_PLAYERS: Player[] = [
//   ...DEMO_TEAM_MEMBERS,
//   // Add some other team players for completeness
//   {
//     playerId: "player-005",
//     playerName: "ProGamer",
//     teamId: "team-beta",
//     teamName: "Beta Force",
//     health: 78,
//     isAlive: true,
//     killNum: 2,
//     damageDealt: 445,
//     rank: 3,
//   },
//   {
//     playerId: "player-006",
//     playerName: "ElitePlayer",
//     teamId: "team-beta",
//     teamName: "Beta Force",
//     health: 0,
//     isAlive: false,
//     killNum: 1,
//     damageDealt: 200,
//     rank: 3,
//   },
// ];

// export function useGameData() {
//   const [gameData, setGameData] = useState<GameData>({
//     observedPlayer: null,
//     teamMembers: [],
//     teamInfo: null,
//     allPlayers: [],
//     isConnected: false,
//     lastUpdated: 0,
//   });

//   const fetchGameData = useCallback(async () => {
//     try {
//       // Comment out real API calls for demo
//       /*
//       const [observedRes, playersRes, teamInfoRes] = await Promise.all([
//         fetch("/api/observed"),
//         fetch("/api/battle"),
//         fetch("/api/teamInfo"),
//       ]);

//       const [observedPlayer, allPlayers, teamInfoList] = await Promise.all([
//         observedRes.json(),
//         playersRes.json(),
//         teamInfoRes.json(),
//       ]);

//       // Filter team members based on observed player's team
//       let teamMembers: Player[] = [];
//       let teamInfo: TeamInfo | null = null;

//       if (observedPlayer && observedPlayer.teamId) {
//         teamMembers = allPlayers.filter(
//           (player: Player) => player.teamId === observedPlayer.teamId,
//         );

//         teamInfo =
//           teamInfoList.find(
//             (team: TeamInfo) => team.teamId === observedPlayer.teamId,
//           ) || null;
//       }
//       */

//       // Use demo data instead
//       const observedPlayer = DEMO_OBSERVED_PLAYER;
//       const allPlayers = DEMO_ALL_PLAYERS;
//       const teamMembers = DEMO_TEAM_MEMBERS;
//       const teamInfo = DEMO_TEAM_INFO;

//       // Simulate some dynamic changes for testing
//       const now = Date.now();
//       const healthVariation = Math.sin(now / 5000) * 10; // Slow health variation
//       const updatedTeamMembers = teamMembers.map((player, index) => ({
//         ...player,
//         health: player.isAlive
//           ? Math.max(
//               10,
//               Math.min(100, player.health + healthVariation + index * 2),
//             )
//           : 0,
//         damageDealt: player.damageDealt + Math.floor(Math.random() * 2), // Occasional damage increase
//       }));

//       setGameData({
//         observedPlayer,
//         teamMembers: updatedTeamMembers,
//         teamInfo: {
//           ...teamInfo,
//           totalKills: updatedTeamMembers.reduce((sum, p) => sum + p.killNum, 0),
//         },
//         allPlayers,
//         isConnected: true,
//         lastUpdated: Date.now(),
//       });
//     } catch (error) {
//       console.error("Error fetching game data:", error);
//       setGameData((prev) => ({
//         ...prev,
//         isConnected: false,
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchGameData();
//     const interval = setInterval(fetchGameData, REFRESH_INTERVAL);
//     return () => clearInterval(interval);
//   }, [fetchGameData]);

//   return gameData;
// }
