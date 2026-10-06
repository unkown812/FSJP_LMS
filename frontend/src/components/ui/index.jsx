import React from 'react';

export { Card } from './Card';
export { GradientRibbon } from './GradientRibbon';

/* ---------------------------------------------------------------- Eyebrow */
export const Eyebrow = ({ children, className = '', as: Tag = 'p' }) => (
  <Tag className={`eyebrow ${className}`}>{children}</Tag>
);

/* ---------------------------------------------------------- Section head */
export const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
  tone = 'light',
  className = '',
  align = 'between',
}) => (
  <div
    className={`section-head ${align === 'start' ? 'md:justify-start' : ''} ${className}`}
  >
    <div className="max-w-3xl space-y-4">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && (
        <h2
          className={`text-display-xl ${
            tone === 'dark' ? 'text-on-dark' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      )}
      {description && <p className="lead">{description}</p>}
    </div>
    {action && <div className="flex shrink-0 flex-wrap items-center gap-3">{action}</div>}
  </div>
);

/* ------------------------------------------------------------------ Badge */
const BADGE_VARIANTS = {
  neutral: 'badge-neutral',
  dark: 'badge-dark',
  mint: 'badge-mint',
  outline: 'badge-outline',
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-warning',
};

export const Badge = ({ children, variant = 'neutral', className = '', icon = null }) => (
  <span className={`badge ${BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral} ${className}`}>
    {icon}
    {children}
  </span>
);

/* --------------------------------------------------------------- StatTile */
const TILE_TONES = {
  mint: 'bg-accent-mint',
  periwinkle: 'bg-accent-periwinkle',
  light: 'bg-canvas border border-hairline',
};

export const StatTile = ({
  value,
  label,
  tone = 'mint',
  icon,
  className = '',
  as: Tag = 'div',
}) => (
  <Tag
    className={`card-pad-lg rounded-sm flex min-h-[132px] flex-col justify-between ${
      TILE_TONES[tone] || TILE_TONES.mint
    } ${className}`}
  >
    <div className="flex items-start justify-between gap-3">
      <span className="text-display-xl text-ink break-words">{value}</span>
      {icon && <span className="shrink-0 text-ink/60 text-xl leading-none">{icon}</span>}
    </div>
    <p className="eyebrow mt-6 text-ink/70">{label}</p>
  </Tag>
);

/* ------------------------------------------------------- Wordmark sign-off */
export const WordmarkBanner = ({ wordmark = 'Edvanta', className = '' }) => (
  <div className={`wordmark-banner ${className}`} aria-hidden="true">
    <span>{wordmark}</span>
  </div>
);

/* ------------------------------------------------------------- Skeletons */
export const SkeletonLine = ({ className = '' }) => (
  <div className={`skeleton h-4 w-full ${className}`} aria-hidden="true" />
);

export const SkeletonBlock = ({ className = '' }) => (
  <div className={`skeleton w-full ${className}`} aria-hidden="true" />
);

export default Eyebrow;
