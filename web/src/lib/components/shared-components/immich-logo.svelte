<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { t } from 'svelte-i18n';

  interface Props extends HTMLImgAttributes {
    /** Hide text if any (kept for API compatibility) */
    noText?: boolean;
    class?: string | undefined;
  }

  let { noText = false, class: cssClass }: Props = $props();
</script>

<!-- ✅ LemurPhoto logo (inline SVG) -->
<svg
  viewBox="0 0 192 192"
  width="192"
  height="192"
  class={cssClass}
  aria-label={$t('lemurphoto_logo')}
  role="img"
>
  <title>{$t('lemurphoto_logo')}</title>

  <!-- Gradient background -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Rounded-square gradient background -->
  <rect x="8" y="8" width="176" height="176" rx="36" fill="url(#bgGradient)" />

  <!-- Camera corners -->
  <path d="M24 36 v32 h8 v-24 h24 v-8 h-32 z" fill="#ffffff" />
  <path d="M168 36 v32 h-8 v-24 h-24 v-8 h32 z" fill="#ffffff" />
  <path d="M24 156 v-32 h8 v24 h24 v8 h-32 z" fill="#ffffff" />
  <path d="M168 156 v-32 h-8 v24 h-24 v8 h32 z" fill="#ffffff" />

  <!-- Lemur face -->
  <ellipse
    cx="96"
    cy="96"
    rx="54"
    ry="44"
    fill="#f8f9fa"
    stroke="#2c3e50"
    stroke-width="3"
  />

  <!-- Eyes -->
  <ellipse
    cx="72"
    cy="106"
    rx="13"
    ry="16"
    fill="#ffffff"
    stroke="#2c3e50"
    stroke-width="2"
  />
  <ellipse
    cx="120"
    cy="106"
    rx="13"
    ry="16"
    fill="#ffffff"
    stroke="#2c3e50"
    stroke-width="2"
  />

  <!-- Pupils -->
  <circle
    cx="72"
    cy="112"
    r="5"
    fill="#3498db"
    stroke="#2c3e50"
    stroke-width="1.5"
  />
  <circle
    cx="120"
    cy="112"
    r="5"
    fill="#3498db"
    stroke="#2c3e50"
    stroke-width="1.5"
  />

  <!-- Nose -->
  <ellipse cx="96" cy="126" rx="7" ry="4" fill="#2c3e50" />

  <!-- Mask patches -->
  <ellipse
    cx="54"
    cy="96"
    rx="10"
    ry="18"
    fill="#2c3e50"
    opacity="0.6"
  />
  <ellipse
    cx="138"
    cy="96"
    rx="10"
    ry="18"
    fill="#2c3e50"
    opacity="0.6"
  />

  <!-- Ears -->
  <ellipse
    cx="40"
    cy="76"
    rx="14"
    ry="20"
    fill="#f8f9fa"
    stroke="#2c3e50"
    stroke-width="2"
  />
  <ellipse
    cx="152"
    cy="76"
    rx="14"
    ry="20"
    fill="#f8f9fa"
    stroke="#2c3e50"
    stroke-width="2"
  />
</svg>
