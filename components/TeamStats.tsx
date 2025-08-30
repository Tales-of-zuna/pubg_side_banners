// components/TeamStats.tsx
"use client";

import { TeamInfo } from "@/types/game";
import { motion } from "framer-motion";
import { Hash, Target, Trophy, Users } from "lucide-react";

interface TeamStatsProps {
  teamInfo: TeamInfo | null;
  teamName: string;
}

export default function TeamStats({ teamInfo, teamName }: TeamStatsProps) {
  if (!teamInfo) {
    return (
      <div className="rounded-lg border-2 border-gray-700 bg-gray-900/90 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold text-white">{teamName}</h2>
        <p className="text-gray-400">Loading team stats...</p>
      </div>
    );
  }

  // Calculate placement points based on typical PUBG scoring
  const getPlacementPoints = (alivePlayers: number) => {
    // This is a placeholder - you should adjust based on actual game rules
    if (alivePlayers === 4) return 10;
    if (alivePlayers === 3) return 6;
    if (alivePlayers === 2) return 4;
    if (alivePlayers === 1) return 2;
    return 0;
  };

  const placementPoints = getPlacementPoints(teamInfo.liveMemberNum);
  const totalPoints = placementPoints + teamInfo.killNum; // 1 point per kill typically

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border-2 border-blue-500 bg-gray-900/90 p-6 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">{teamInfo.teamName}</h2>
        {teamInfo.isShowLogo && teamInfo.logoPicUrl && (
          <img
            src={teamInfo.logoPicUrl}
            alt={teamInfo.teamName}
            className="h-12 w-12 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
          <p className="text-sm text-gray-400">Team ID</p>
          <p className="text-3xl font-bold text-white">#{teamInfo.teamId}</p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Users className="mx-auto mb-2 h-8 w-8 text-green-500" />
          <p className="text-sm text-gray-400">Alive</p>
          <p className="text-3xl font-bold text-white">
            {teamInfo.liveMemberNum}/4
          </p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Target className="mx-auto mb-2 h-8 w-8 text-orange-500" />
          <p className="text-sm text-gray-400">Total Kills</p>
          <p className="text-3xl font-bold text-white">{teamInfo.killNum}</p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
            <span className="font-bold text-white">PTS</span>
          </div>
          <p className="text-sm text-gray-400">Points</p>
          <p className="text-3xl font-bold text-white">{totalPoints}</p>
        </div>
      </div>
    </motion.div>
  );
}
