import { NextResponse } from "next/server";

const GAME_SERVER_URL =
  process.env.NEXT_PUBLIC_GAME_SERVER_URL || "http://localhost:10086";

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(`${GAME_SERVER_URL}/getobservingplayer`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data.observingPlayer?.[0] || null);
  } catch (error) {
    console.error("Error fetching observed player:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
