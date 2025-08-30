// hooks/useGameData.ts
import { GameData, Player, TeamInfo } from "@/types/game";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 2000;

export function useGameData() {
  const [gameData, setGameData] = useState<GameData>({
    observedPlayerId: null,
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

      const [observedPlayerId, allPlayers, teamInfoList] = await Promise.all([
        observedRes.json(),
        playersRes.json(),
        teamInfoRes.json(),
      ]);

      let observedPlayer: Player | null = null;
      let teamMembers: Player[] = [];
      let teamInfo: TeamInfo | null = null;

      // Find the observed player from all players using the uId string
      if (observedPlayerId && allPlayers) {
        observedPlayer = allPlayers.find(
          (player: Player) => player.uId.toString() === observedPlayerId
        ) || null;

        // If we found the observed player, get their team members
        if (observedPlayer) {
          teamMembers = allPlayers.filter(
            (player: Player) => player.teamId === observedPlayer!.teamId
          );

          // Find the team info for this team
          teamInfo = teamInfoList.find(
            (team: TeamInfo) => team.teamId === observedPlayer!.teamId
          ) || null;
        }
      }

      setGameData({
        observedPlayerId,
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