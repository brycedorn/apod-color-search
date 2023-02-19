<script>
  import "vanilla-colorful";
  import { debounce } from "throttle-debounce";
  import { lazyLoad } from "./lazy-load.js";
  import { onMount } from "svelte";

  import colorWheel from "./assets/color-wheel.svg";

  // const API_URL = "http://localhost:8000";
  const API_URL = "https://acs-api.deno.dev";

  const queryParams = new URLSearchParams(window.location.search);
  const defaultColor = queryParams.get("c")?.match(/[a-f0-9]{6}/gi);

  let inputColor = "";
  let matchedColor = "";
  let results = [];
  let loading = false;
  let showColorPicker = false;
  let errorText = "";
  let firstImageLoaded = false;

  function onFirstImageLoaded() {
    firstImageLoaded = true;
  }

  onMount(async () => {
    if (defaultColor) {
      inputColor = `#${defaultColor}`;
      matchedColor = `#${defaultColor}`;
      loading = true;
      await search(defaultColor);
    }
  });

  async function search(color) {
    try {
      const resp = await fetch(`${API_URL}/search/${color}`);
      const { data } = await resp.json();

      results = data;

      if (results.length > 0) {
        matchedColor = `#${color}`;
      }
    } catch (error) {
      console.error(error);
      errorText = error;
    }

    loading = false;
  }

  function handleColorChanged(event) {
    const color = event.detail.value;
    inputColor = color;
    loading = true;
    firstImageLoaded = false;
    results = [];
    matchedColor = "";

    const hex = color.replace("#", "");
    const searchParams = new URLSearchParams({ c: hex });
    window.location.search = searchParams.toString();

    search(hex);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
  }

  function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        showColorPicker = false;
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  const debouncedColorChange = debounce(100, handleColorChanged);
</script>

<div id="top-bar" style="--color: {matchedColor}">
  <h2 id="title">
    <a href="/">APOD Color Search</a>
  </h2>
  <h2 id="title-sm">
    <a href="/">🪐</a>
  </h2>

  <div id="right">
    {#if results.length > 0}
      <h3>
        {results.length} matches for
        <span style="--color: {matchedColor}">{matchedColor}</span>
      </h3>
    {:else if loading}
      <h3>Loading...</h3>
    {:else if errorText}
      <h3>{errorText}</h3>
    {:else if inputColor === ""}
      <h3>Try picking a color! 👉</h3>
    {:else}
      <h3>
        No matches found for <span style="--color: {inputColor}"
          >{inputColor}</span
        >
      </h3>
    {/if}

    <button id="color-wheel-button" style="--color: {matchedColor || '#fff'}">
      {#if showColorPicker}
        <div id="close-indicator" on:click={() => (showColorPicker = false)}>
          +
        </div>
      {:else}
        <img
          src={colorWheel}
          alt="color-wheel"
          on:click={() => (showColorPicker = true)}
        />
      {/if}
    </button>
  </div>

  {#if showColorPicker}
    <div id="color-picker">
      <hex-color-picker
        color={inputColor}
        on:color-changed={debouncedColorChange}
        use:clickOutside
      />
    </div>
  {/if}
</div>

{#if results.length > 0}
  <div id="results">
    {#each results as result, i}
      <h2>
        <a
          target="_blank"
          href="https://apod.nasa.gov/apod/ap{result.date
            .slice(2)
            .replaceAll('-', '')}.html"
        >
          {result.title} ({formatDate(result.date)})
        </a>
      </h2>
      <a href={result.url} target="_blank" class="image-link">
        {#if i === 0}
          <img
            use:lazyLoad={{ src: result.url, callback: onFirstImageLoaded }}
            alt={result.title}
          />
        {:else if firstImageLoaded}
          <img use:lazyLoad={{ src: result.url }} alt={result.title} />
        {/if}
      </a>
    {/each}
  </div>
{/if}

{#if inputColor === ""}
  <h3 id="help">
    Use the color picker at the top right of the page to search for pictures
    that match that color!
  </h3>
{/if}

<footer class={results.length === 0 && "bottom"}>
  Disclaimer: this site has no affiliation with <a
    href="https://apod.nasa.gov/apod/astropix.html">APOD</a
  >. All content displayed here is hosted by and links directly to
  <a href="https://apod.nasa.gov/apod/astropix.html">APOD</a>. View
  <a href="https://github.com/brycedorn/apod-color-search">source on GitHub</a>.
</footer>
