<script lang="ts">

  // ✅ Props
  export let size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' | 'landing' = 'medium';
  export let className: string | undefined; // ✅ renamed to avoid reserved keyword

  // 🔹 Tailwind-based height mapping
  const sizeClass = {
    tiny: 'h-8',
    small: 'h-10',
    medium: 'h-12',
    large: 'h-16',
    giant: 'h-24',
    landing: 'h-64',
  }[size];
</script>

<!-- ✅ Simple, fast, and theme-agnostic -->
<img
  src="/favicon.svg"
  alt="Shutter logo"
  class={`aspect-square rounded-full shadow-sm bg-transparent ${sizeClass} ${className ?? ''}`}
/>
