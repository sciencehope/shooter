<script lang="ts">
  // Props like Immich’s component
  export let size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' | 'landing' = 'medium';
  export let variant: 'logo' | 'icon' = 'logo';
  export let className: string = '';

  // ✅ Use your static SVG (in web/static/)
  const logoSrc = '/favicon.svg';

  // Tailwind-based height mapping
  const sizeClass = {
    tiny: 'h-8',
    small: 'h-10',
    medium: 'h-12',
    large: 'h-16',
    giant: 'h-24',
    landing: 'h-64',
  }[size];

  // Variant-based styling
  const variantClass =
    variant === 'logo'
      ? 'bg-transparent aspect-square rounded-full'
      : 'aspect-square';
</script>

<img
  src={logoSrc}
  alt="LemurPhoto logo"
  class={`mx-auto ${sizeClass} ${variantClass} ${className}`}
/>
