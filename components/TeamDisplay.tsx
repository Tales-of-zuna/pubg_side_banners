"use client";

import { GameData } from "@/types/game";
import { AlertCircle } from "lucide-react";
import PlayerCard from "./PlayerCard";
import TeamStats from "./TeamStats";

interface TeamDisplayProps {
  gameData: GameData;
}

export default function TeamDisplay({ gameData }: TeamDisplayProps) {
  const { observedPlayer, teamMembers, teamInfo } = gameData;

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

  // Sort team members: alive first, then by kills
  const sortedMembers = [...teamMembers].sort((a, b) => {
    if (a.isAlive !== b.isAlive) return b.isAlive ? 1 : -1;
    return b.killNum - a.killNum;
  });

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Team Stats Header */}
      <TeamStats teamInfo={teamInfo} teamName={observedPlayer.teamName} />

      {/* Players Grid */}
      <div className="flex-1">
        <h3 className="mb-4 text-xl font-bold text-white">Team Members</h3>
        <div className="grid grid-cols-2 gap-4">
          {sortedMembers.map((player) => (
            <PlayerCard
              key={player.playerId}
              player={player}
              isObserved={player.playerId === observedPlayer.playerId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
