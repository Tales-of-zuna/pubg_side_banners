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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border-2 border-blue-500 bg-gray-900/90 p-6 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">{teamInfo.teamName}</h2>
        <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1">
          <Hash className="h-4 w-4 text-blue-400" />
          <span className="font-bold text-blue-400">
            Team {teamInfo.teamNumber}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
          <p className="text-sm text-gray-400">Rank</p>
          <p className="text-3xl font-bold text-white">#{teamInfo.rank}</p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Users className="mx-auto mb-2 h-8 w-8 text-green-500" />
          <p className="text-sm text-gray-400">Alive</p>
          <p className="text-3xl font-bold text-white">
            {teamInfo.liveMemberCount}/4
          </p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <Target className="mx-auto mb-2 h-8 w-8 text-orange-500" />
          <p className="text-sm text-gray-400">Total Kills</p>
          <p className="text-3xl font-bold text-white">{teamInfo.totalKills}</p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
            <span className="font-bold text-white">PTS</span>
          </div>
          <p className="text-sm text-gray-400">Points</p>
          <p className="text-3xl font-bold text-white">
            {teamInfo.rank === 1
              ? 10
              : teamInfo.rank === 2
                ? 6
                : teamInfo.rank === 3
                  ? 5
                  : teamInfo.rank === 4
                    ? 4
                    : teamInfo.rank === 5
                      ? 3
                      : teamInfo.rank === 6
                        ? 2
                        : teamInfo.rank <= 8
                          ? 1
                          : 0}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
