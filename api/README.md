# apod color search API

Powers `/search/:hex` endpoint that returns/sets result from/in database/cache.

Why Deno for API and separate Node-based cache?
[Benchmarks](https://github.com/brycedorn/deno-node-redis-postgres-benchmarks)
seem to indicate this is the most performant approach.

Uses [fresh](https://fresh.deno.dev/) for simple project structure.

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
