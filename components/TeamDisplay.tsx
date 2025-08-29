"use client";

import { GameData } from "@/types/game";
import { AlertCircle } from "lucide-react";
import PlayerCard from "./PlayerCard";

interface TeamDisplayProps {
  gameData: GameData;
}

export default function TeamDisplay({ gameData }: TeamDisplayProps) {
  const { observedPlayer, teamMembers } = gameData;

  if (!observedPlayer) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-400">
            No Team Observed
          </h2>
          <p className="text-gray-500">
            Waiting for observer to select a player...
          </p>
        </div>
      </div>
    );
  }

  const sortedMembers = [...teamMembers].sort((a, b) => {
    if (a.isAlive !== b.isAlive) return b.isAlive ? 1 : -1;
    return b.killNum - a.killNum;
  });

  const playerSlots = Array.from(
    { length: 4 },
    (_, index) => sortedMembers[index] || null,
  );

  return (
    <div className="flex h-full w-full">
      {playerSlots.map((player, index) => (
        <PlayerCard
          key={player?.playerId || `empty-${index}`}
          player={player}
          isObserved={player?.playerId === observedPlayer.playerId}
          index={index}
        />
      ))}
    </div>
  );
}
