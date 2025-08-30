"use client";

import { Player } from "@/types/game";
import { Image } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

interface PlayerCardProps {
  player: Player | null;
  isObserved: boolean;
  index: number;
}

export default function PlayerCard({
  player,
  isObserved,
  index,
}: PlayerCardProps) {
  return (
    <div className="h-full w-1/4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
          className="relative flex h-full w-full flex-col items-start justify-end bg-gradient-to-t from-black to-transparent p-6"
          style={{ transitionDelay: `${(index + 1) * 150}ms` }}
        >
          {player && (
            <div className="absolute top-6 left-6 z-30">
              <p className="text-4xl font-bold text-[#CFE356]">
                {player.playerName}
              </p>
              {isObserved && (
                <div className="mt-1 inline-block rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                  OBSERVED
                </div>
              )}
              {!player.isAlive && (
                <div className="mt-1 inline-block rounded bg-neutral-500 px-2 py-1 text-xs font-bold text-white">
                  ELIMINATED
                </div>
              )}
            </div>
          )}

          <div className="z-30 text-[#CFE356]">
            <p className="text-5xl font-bold">{player?.killNum || 0}</p>
            <p className="text-lg">KILLS</p>
          </div>

          <div className="z-30 text-[#CFE356]">
            <p className="text-5xl font-bold">{player?.damageDealt || 0}</p>
            <p className="text-lg">DAMAGE</p>
          </div>

          <div className="z-30 text-[#CFE356]">
            <p className="text-5xl font-bold">
              {player ? Math.round(player.health) : 0}
            </p>
            <p className="text-lg">HEALTH</p>
          </div>

          <div className="z-30 text-[#CFE356]">
            <p className="text-5xl font-bold">{player?.rank || 0}</p>
            <p className="text-lg">RANK</p>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: (index + 1) * 0.1 }}
              className="absolute right-0 bottom-0 z-10 flex h-full w-full items-end justify-end"
            >
              {player ? (
                <div
                  className={`${!player.isAlive ? "opacity-50 grayscale" : ""} relative flex h-[900px] w-full items-end`}
                >
                  <Image
                    src={`/assets/images/players/${player.uId}.png`}
                    alt=""
                    className="h-[900px] object-cover object-top"
                  />
                  <div className="absolute z-20 h-full w-full bg-gradient-to-t from-black to-transparent"></div>
                </div>
              ) : (
                <div className="flex h-96 w-64 items-center justify-center opacity-30">
                  <span className="text-6xl text-gray-600">?</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {player && (
            <div className="absolute top-10 right-6 z-30">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    !player.isAlive
                      ? "bg-red-500"
                      : player.health > 75
                        ? "bg-green-500"
                        : player.health > 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-[#CFE356]">
                  {player.isAlive ? "ALIVE" : "DOWN"}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
