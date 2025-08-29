"use client";

import TeamDisplay from "@/components/TeamDisplay";
import { useGameData } from "@/hooks/useGameData";

export default function Home() {
  const gameData = useGameData();

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <div className="h-full w-full">
        <TeamDisplay gameData={gameData} />
      </div>
    </main>
  );
}
