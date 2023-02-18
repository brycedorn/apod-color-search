import { HandlerContext } from "$fresh/server.ts";
import { supabase } from "../../main.ts";
import {
  hexToRgb,
  minimizeDistance,
  queryCache,
  SuccessResponse,
  updateCache,
} from "../utils.ts";

const ENABLE_LOGS = Deno.env.get("ENABLE_LOGS");

if (!ENABLE_LOGS) {
  console.info = () => {};
}

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const { hex } = ctx.params;

  const cachedResult = await queryCache(hex);

  if (cachedResult.isCached) {
    console.info(`Returning cached result for #${hex}`);

    return SuccessResponse(cachedResult.result);
  }

  console.log("Getting RGB...");

  const rgb = hexToRgb(`#${hex}`);
  const [r, g, b] = rgb;
  const COLOR_MATCH_THRESHOLD = 30;

  console.log(rgb);

  // Find all color matches within threshold
  const { data: colors } = await supabase
    .from("colors")
    .select()
    .gt("r", r - COLOR_MATCH_THRESHOLD)
    .lt("r", r + COLOR_MATCH_THRESHOLD)
    .gt("g", g - COLOR_MATCH_THRESHOLD)
    .lt("g", g + COLOR_MATCH_THRESHOLD)
    .gt("b", b - COLOR_MATCH_THRESHOLD)
    .lt("b", b + COLOR_MATCH_THRESHOLD);

  // No color matches
  if (!colors || colors?.length == 0) {
    console.info(`Caching empty result for #${hex}`);

    await updateCache(hex, "[]");

    return SuccessResponse([]);
  }

  console.info(
    `Closest colors to #${hex}`,
    ":",
    colors.map(({ hex }) => hex),
  );

  // TODO: gather closest colors since this can be long list

  // Find all clusters that contain color matches
  const { data: clusters } = await supabase
    .from("clusters")
    .select()
    .in(
      "color_id",
      colors?.map(({ id }) => id),
    )
    // .order('percent', { ascending: false })
    .limit(15);

  // No cluster matches
  if (!clusters || clusters?.length == 0) {
    console.info(`Caching empty result for #${hex}`);

    await updateCache(hex, "[]");

    return SuccessResponse([]);
  }

  // Sort clusters by Euclidean distance to search color (smallest COLOR_MATCH_THRESHOLD)
  clusters.sort((a, b) => minimizeDistance(a, b, rgb, colors));

  console.info(
    "Closest cluster to",
    hex,
    ":",
    colors.find((color) => color.id === clusters[0].color_id),
  );

  const { data: days } = await supabase
    .from("days")
    .select()
    .in(
      "id",
      clusters?.map(({ day_id }) => day_id),
    )
    .is("exclude_from_results", null)
    .limit(5);

  if (!days) {
    console.info(`No matching days found for #${hex}`);

    return SuccessResponse([]);
  }

  console.info(`Caching result for #${hex}`);

  await updateCache(hex, JSON.stringify(days));

  return SuccessResponse(days);
};
