/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import "dotenv";
import { createClient } from "supabase";
import { connect } from "redis";

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") as string,
  Deno.env.get("SUPABASE_PUBLIC_API_KEY") as string,
);

export const redis = await connect({
  hostname: Deno.env.get("REDIS_URL") as string,
  port: Deno.env.get("REDIS_PORT") as string,
  password: Deno.env.get("REDIS_PASSWORD") as string,
});

await start(manifest);
