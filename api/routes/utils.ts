import { redis } from "../main.ts";
import { CacheResult, ClusterType, ColorType, SearchResult } from "./types.ts";

const DISABLE_CACHE_GET = Deno.env.get("DISABLE_CACHE_GET");
const DISABLE_CACHE_SET = Deno.env.get("DISABLE_CACHE_SET");

export function SuccessResponse(data: SearchResult) {
  return new Response(JSON.stringify({ data }), {
    status: 200,
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

export async function queryCache(hex: string): Promise<CacheResult> {
  if (DISABLE_CACHE_GET) {
    return { isCached: false, result: [] };
  }

  const result = await redis.get(hex);

  // @ts-expect-error: Day type
  return { isCached: !!result, result: JSON.parse(result) };
}

export async function updateCache(
  hex: string,
  value: string,
): Promise<void> {
  if (DISABLE_CACHE_SET) {
    return;
  }

  await redis.set(hex, value);
}
