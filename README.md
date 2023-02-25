# apod color search 🪐

Search for [APOD](https://apod.nasa.gov/apod/astropix.html) photos by color! Consists of four functional parts:

## web

A [Svelte](https://svelte.dev/) app to provide search interface. Uses [vanilla-colorful](https://github.com/web-padawan/vanilla-colorful) for color picker.

## api

[Deno](https://deno.land/)-based API that retrieves APOD information from database for images that match the given hex value. Uses Redis to store & retrieve query results.

## src

[Rust](https://www.rust-lang.org/) utility to analyze and process images. Used to populate database with historical data, now scheduled to run monthly to process new APODs.

 1. Fetches APOD metatada via [apod-api](https://github.com/nasa/apod-api).
 1. Analyzes image to get highest-frequency non-grayscale colors.
 1. Saves result to Postgres.

Runs via GitHub Actions UI to then trigger additional workflows. This was used to leverage GitHub Actions to batch process a large amount of images concurrently & remotely.