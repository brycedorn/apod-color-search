const express = require("express");
const redis = require("redis");

const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD, REDIS_USER } = process.env;

const client = redis.createClient({
  url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}/`,
});

client.on("error", (err) => console.log("Redis Client Error", err));

const app = express();
const port = 4000;

async function getCachedResult(req, res) {
  const { hex } = req.params;

  console.log(`Checking cache for #${hex}...`);

  try {
    const cachedResult = await client.get(hex);
    let isCached = !!cachedResult;
    let result;

    if (isCached) {
      isCached = true;
      result = JSON.parse(cachedResult);
    } else {
      result = null;
    }

    res.send({
      isCached,
      result,
    });
  } catch (error) {
    console.error(error);
  }
}

async function setCachedResult(req, res) {
  const {
    body,
    params: { hex },
  } = req;

  console.log(`Setting value in cache for #${hex}...`);

  try {
    const cachedResult = await client.set(hex, JSON.stringify(body));
    let isCached = !!cachedResult;

    res.send({
      isCached,
      result: cachedResult,
    });
  } catch (error) {
    console.error(error);
  }
}

function quit(signal) {
  console.log(`Received termination signal: ${signal}`);

  server.close(() => {
    client.quit(() => {
      console.log("Redis client quit.");
    });
    console.log("HTTP server has been closed.");
    process.exit(0);
  });
}

app.use(express.json());
app.get("/get/:hex", getCachedResult);
app.post("/set/:hex", setCachedResult);

const server = app.listen(port, async () => {
  await client.connect();
  console.log(`App listening on port ${port}`);
});

process.on("SIGINT", quit);
process.on("SIGTERM", quit);
