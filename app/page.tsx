"use client";

import ConnectionStatus from "@/components/ConnectionStatus";
import TeamDisplay from "@/components/TeamDisplay";
import { useGameData } from "@/hooks/useGameData";

export default function Home() {
  const gameData = useGameData();

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <ConnectionStatus
        isConnected={gameData.isConnected}
        lastUpdated={gameData.lastUpdated}
      />

      <div className="mx-auto h-full w-full max-w-7xl">
        <TeamDisplay gameData={gameData} />
      </div>
    </main>
  );
}
