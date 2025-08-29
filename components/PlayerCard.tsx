"use client";

import { Player } from "@/types/game";
import { motion } from "framer-motion";
import { Heart, Shield, Skull, Target } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  isObserved: boolean;
}

export default function PlayerCard({ player, isObserved }: PlayerCardProps) {
  const healthPercentage = Math.max(0, Math.min(100, player.health));
  const healthColor =
    healthPercentage > 75
      ? "bg-green-500"
      : healthPercentage > 40
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg border-2 bg-gray-900/90 p-4 backdrop-blur-sm ${
        isObserved
          ? "border-yellow-500 shadow-lg shadow-yellow-500/20"
          : "border-gray-700"
      }`}
    >
      {isObserved && (
        <div className="absolute -top-2 -right-2 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
          OBSERVED
        </div>
      )}

      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{player.playerName}</h3>
          <p className="text-sm text-gray-400">#{player.playerId.slice(-4)}</p>
        </div>
        {!player.isAlive && <Skull className="h-6 w-6 text-red-500" />}
      </div>

      <div className="space-y-2">
        {/* Health Bar */}
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-red-500" />
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${healthColor} transition-all`}
            />
          </div>
          <span className="w-12 text-right text-sm font-medium text-white">
            {Math.round(player.health)}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded bg-gray-800/50 px-2 py-1">
            <Target className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-white">{player.killNum} Kills</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-gray-800/50 px-2 py-1">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-white">{player.damageDealt} DMG</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
