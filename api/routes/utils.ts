import { redis } from "../main.ts";
import { CacheResult, ClusterType, ColorType, SearchResult } from "./types.ts";

const DISABLE_CACHE_GET = Deno.env.get("DISABLE_CACHE_GET");
const DISABLE_CACHE_SET = Deno.env.get("DISABLE_CACHE_SET");
const CACHE_URL = Deno.env.get("CACHE_URL");
const USE_DENO_REDIS = Deno.env.get("USE_DENO_REDIS");

export function SuccessResponse(data: SearchResult) {
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export function ErrorResponse(error: Response) {
  return new Response(JSON.stringify(error), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export function hexToRgb(hex: string): number[] {
  const match = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

  if (match) {
    return match.slice(1).map((e) => parseInt(e, 16));
  }

  return [];
}

export function getDistance(searchColor: number[], matchColor: ColorType) {
  const matchColors = [matchColor.r, matchColor.g, matchColor.b];

  return matchColors.map((matchColor, i) =>
    Math.abs(searchColor[i] - matchColor)
  )
    .reduce((a, b) => a + b, 0);
}

export function minimizeDistance(
  a: ClusterType,
  b: ClusterType,
  searchColor: number[],
  colors: ColorType[],
) {
  const colorA = colors.find(({ id }: { id: number }) => id === a.color_id);
  const colorB = colors.find(({ id }: { id: number }) => id === b.color_id);

  if (!colorA || !colorB) {
    return Number.MAX_SAFE_INTEGER;
  }

  return getDistance(searchColor, colorA) - getDistance(searchColor, colorB);
}

export async function queryNodeCache(hex: string): Promise<CacheResult> {
  if (DISABLE_CACHE_GET) {
    return { isCached: false, result: [] };
  }

  const response = await fetch(`${CACHE_URL}/get/${hex}`);

  if (!response.ok) {
    throw Error();
  }

  const result = await response.json();

  return result;
}

export async function updateNodeCache(
  hex: string,
  value: string,
): Promise<void> {
  if (DISABLE_CACHE_SET) {
    return;
  }

  const response = await fetch(`${CACHE_URL}/set/${hex}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: value,
  });

  if (!response.ok) {
    throw Error();
  }

  await response.json();
}

export async function queryCache(hex: string): Promise<CacheResult> {
  if (USE_DENO_REDIS) {
    const result = await redis.get(hex);

    // @ts-expect-error: Day type
    return { isCached: !!result, result };
  } else {
    return await queryNodeCache(hex);
  }
}

export async function updateCache(
  hex: string,
  value: string,
): Promise<void> {
  if (USE_DENO_REDIS) {
    await redis.set(hex, value);
  } else {
    await updateNodeCache(hex, value);
  }
}
