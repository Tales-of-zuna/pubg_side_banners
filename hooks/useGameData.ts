import { GameData, Player, TeamInfo } from "@/types/game";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 1000; // 1 second

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
