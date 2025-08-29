"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

interface ConnectionStatusProps {
  isConnected: boolean;
  lastUpdated: number;
}

export default function ConnectionStatus({
  isConnected,
  lastUpdated,
}: ConnectionStatusProps) {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        setTimeSinceUpdate(Math.floor((Date.now() - lastUpdated) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 backdrop-blur-sm">
      {isConnected ? (
        <>
          <Wifi className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-green-500">Connected</span>
          {timeSinceUpdate > 5 && (
            <span className="text-xs text-yellow-500">
              ({timeSinceUpdate}s ago)
            </span>
          )}
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-red-500">Disconnected</span>
        </>
      )}
    </div>
  );
}
