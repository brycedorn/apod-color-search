# apod color search cache

Powers `/get/:hex` and `/set/:hex` endpoints for interacting with Redis.

Why Deno for API and separate Node-based cache? [Benchmarks](https://github.com/brycedorn/deno-node-redis-postgres-benchmarks) seem to indicate this is the most performant approach.

### Usage

Install dependencies and start the project:

```
npm i
npm start
```

This will watch the project directory and restart as necessary.
