import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const resp = await ctx.next();

  const allowedOrigin = Deno.env.get("ACS_WEB_ORIGIN") as string;

  resp.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  resp.headers.set("Access-Control-Allow-Methods", "GET");

  return resp;
}
