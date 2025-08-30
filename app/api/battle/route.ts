import { NextResponse } from "next/server";

const GAME_SERVER_URL="http://localhost:10086";

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(`${GAME_SERVER_URL}/gettotalplayerlist`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data.playerInfoList || []);
  } catch (error) {
    console.error("Error fetching player list:", error);
    return NextResponse.json([], { status: 500 });
  }
}
