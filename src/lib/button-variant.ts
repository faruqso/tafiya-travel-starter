import type { ButtonVariant } from '../types/content';

/** Map CMS secondary buttons to the light-outline variant on dark surfaces. */
export function buttonVariantOnDark(variant?: ButtonVariant): ButtonVariant {
  if (variant === 'secondary') return 'secondary-inverse';
  return variant ?? 'primary';
}

/** Compact heroes sit on a photo overlay — same secondary mapping as CTA bands. */
export function heroButtonVariant(variant?: ButtonVariant): ButtonVariant {
  if (variant === 'secondary') return 'secondary-inverse';
  return variant ?? 'primary';
}
