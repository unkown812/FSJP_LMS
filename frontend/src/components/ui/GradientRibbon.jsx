import React from 'react';

/**
 * The brand's single piece of decorative chrome: a three-stop
 * orange -> magenta -> periwinkle gradient rendered as a looping ribbon.
 * Hero scale only — never miniaturised, never reordered, never reduced
 * to a single colour.
 */
export const GradientRibbon = ({ className = '', title = 'Brand gradient ribbon' }) => (
  <svg
    viewBox="0 0 640 560"
    role="img"
    aria-label={title}
    className={`block h-auto w-full ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="ribbonBrand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fc4c02" />
        <stop offset="52%" stopColor="#ef2cc1" />
        <stop offset="100%" stopColor="#bdbbff" />
      </linearGradient>

      <radialGradient id="ribbonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef2cc1" stopOpacity="0.55" />
        <stop offset="55%" stopColor="#fc4c02" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#bdbbff" stopOpacity="0" />
      </radialGradient>

      <filter id="ribbonBlurSoft" x="-30%" y="-30%" width="80%" height="80%">
        <feGaussianBlur stdDeviation="12" />
      </filter>

      <filter id="ribbonBlurTight" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" />
      </filter>

      <path
        id="ribbonPath"
        d="M96 424 C 34 296, 132 148, 276 162 C 412 176, 474 318, 384 384 C 300 446, 178 404, 206 316 C 234 228, 372 210, 480 254 C 586 298, 612 410, 546 486"
      />
    </defs>

    {/* Atmospheric depth: a soft brand glow behind the ribbon */}
    <ellipse cx="330" cy="300" rx="290" ry="240" fill="url(#ribbonGlow)" opacity="0.9" />

    <g className="ribbon-drift-slow" opacity="0.35" filter="url(#ribbonBlurSoft)">
      <use href="#ribbonPath" fill="none" stroke="url(#ribbonBrand)" strokeWidth="120" strokeLinecap="round" transform="translate(18 34)" />
    </g>

    <g className="ribbon-drift" opacity="0.55" filter="url(#ribbonBlurTight)">
      <use href="#ribbonPath" fill="none" stroke="url(#ribbonBrand)" strokeWidth="96" strokeLinecap="round" transform="translate(-6 14)" />
    </g>

    <g className="ribbon-drift">
      <use href="#ribbonPath" fill="none" stroke="url(#ribbonBrand)" strokeWidth="78" strokeLinecap="round" />
      {/* translucent highlights layered over the ribbon */}
      <use href="#ribbonPath" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="10" strokeLinecap="round" transform="translate(0 -18)" />
      <circle cx="540" cy="150" r="52" fill="#bdbbff" opacity="0.22" />
      <circle cx="120" cy="196" r="34" fill="#fc4c02" opacity="0.3" />
      <circle cx="470" cy="470" r="26" fill="#ef2cc1" opacity="0.35" />
    </g>
  </svg>
);

export default GradientRibbon;
