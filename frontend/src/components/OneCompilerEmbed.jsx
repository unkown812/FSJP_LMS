import React from 'react';

const ONE_COMPILER_EMBED_BASE = 'https://onecompiler.com/embed/';

const DEFAULT_FRAME_CLASSES = 'h-[420px] sm:h-[480px] lg:h-[600px]';

const toCssSize = (value) =>
  value === undefined || value === null || value === '' ? undefined : typeof value === 'number' ? `${value}px` : value;

const languageFromSrc = (url) => {
  if (!url) return '';
  const match = String(url).match(/onecompiler\.com\/(?:embed\/)?([A-Za-z0-9+#._-]+)/);
  return match ? match[1] : '';
};

const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');

export const getOneCompilerEmbedUrl = (language = 'python') =>
  `${ONE_COMPILER_EMBED_BASE}${String(language).trim().toLowerCase()}`;

/**
 * Resolves the iframe source.
 * - `src` wins when provided (direct/embed URL passthrough).
 * - OneCompiler editor URLs (`onecompiler.com/python`) are normalized to the
 *   embed format (`onecompiler.com/embed/python`).
 * - otherwise the URL is built from `language`.
 */
export const resolveEmbedSrc = ({ src, language = 'python' } = {}) => {
  if (src) {
    const normalized = String(src).trim();
    const editorMatch = normalized.match(/^(https?:\/\/(?:www\.)?onecompiler\.com\/)(?!embed\/)([A-Za-z0-9+#._-]+\/?)$/);
    if (editorMatch) return `${editorMatch[1]}embed/${editorMatch[2].replace(/\/$/, '')}`;
    return normalized;
  }
  return getOneCompilerEmbedUrl(language);
};

export const OneCompilerEmbed = ({
  language = 'python',
  src,
  title,
  width = '100%',
  height,
  className = '',
  frameClassName = '',
  frameStyle,
  allowFullScreen = true,
  loading = 'lazy',
  sandbox,
  ...rest
}) => {
  const embedSrc = resolveEmbedSrc({ src, language });
  const frameLanguage = languageFromSrc(embedSrc) || language;
  const frameTitle = title || `${capitalize(frameLanguage)} Compiler`;

  const containerWidth = toCssSize(width);
  const containerHeight = toCssSize(height);

  return (
    <div
      className={`w-full overflow-hidden rounded-sm border border-hairline bg-canvas ${className}`}
      style={{ width: containerWidth }}
    >
      <iframe
        src={embedSrc}
        title={frameTitle}
        className={`block w-full border-0 ${containerHeight ? '' : DEFAULT_FRAME_CLASSES} ${frameClassName}`}
        style={{ height: containerHeight, ...frameStyle }}
        loading={loading}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; cross-origin"
        allowFullScreen={allowFullScreen}
        referrerPolicy="no-referrer-when-downgrade"
        {...(sandbox ? { sandbox } : {})}
        {...rest}
      />
    </div>
  );
};

export default OneCompilerEmbed;
