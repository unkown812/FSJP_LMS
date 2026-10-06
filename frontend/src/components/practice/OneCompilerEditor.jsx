import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from 'antd';

const EMBED_BASE = 'https://onecompiler.com/embed/';

const DEFAULT_FILE_NAMES = {
  python: 'main.py',
  java: 'Main.java',
  javascript: 'script.js',
  node: 'script.js',
  c: 'main.c',
  cpp: 'main.cpp',
  go: 'main.go',
  typescript: 'main.ts',
};

const LANGUAGE_LABELS = {
  python: 'Python',
  java: 'Java',
  javascript: 'JavaScript',
  node: 'Node.js',
  c: 'C',
  cpp: 'C++',
  go: 'Go',
  typescript: 'TypeScript',
};

export const languageLabel = (language = 'python') =>
  LANGUAGE_LABELS[language] || `${String(language).charAt(0).toUpperCase()}${String(language).slice(1)}`;

export const defaultFileName = (language = 'python') =>
  DEFAULT_FILE_NAMES[language] || `main.${language}`;

/**
 * Builds the OneCompiler embed URL.
 * `https://onecompiler.com/embed/` for the default editor,
 * `https://onecompiler.com/embed/{language}` for a specific language.
 * `listenToEvents=true` is required for the parent page to populate code
 * through `postMessage` (OneCompiler embed API).
 */
export const buildEmbedUrl = ({ language, listenToEvents = false } = {}) => {
  const slug = language ? String(language).trim().toLowerCase() : '';
  const url = slug ? `${EMBED_BASE}${slug}` : EMBED_BASE;
  return listenToEvents ? `${url}?listenToEvents=true` : url;
};

/**
 * Reusable OneCompiler editor iframe.
 *
 * OneCompiler owns editing/execution — this component only embeds it,
 * configures language/height/filename and (when starter code is provided)
 * pushes the template into the editor via OneCompiler's documented
 * `populateCode` postMessage event.
 */
export const OneCompilerEditor = ({
  language = 'python',
  starterCode,
  fileName,
  height = '450px',
  title,
  showToolbar = true,
  className = '',
  frameClassName = '',
  ...rest
}) => {
  const iframeRef = useRef(null);
  const resolvedFileName = fileName || defaultFileName(language);
  const resolvedTitle = title || `${languageLabel(language)} code editor`;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  const sendStarterCode = useCallback(() => {
    if (!starterCode) return;
    const frame = iframeRef.current;
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      {
        eventType: 'populateCode',
        language,
        files: [{ name: resolvedFileName, content: starterCode }],
      },
      '*'
    );
  }, [starterCode, language, resolvedFileName]);

  // Populate after the embed finishes loading; retried once shortly after
  // because the editor finishes bootstrapping a tick after the load event.
  useEffect(() => {
    if (!starterCode) return undefined;
    const timeout = setTimeout(sendStarterCode, 400);
    return () => clearTimeout(timeout);
  }, [starterCode, sendStarterCode]);

  const embedUrl = buildEmbedUrl({ language, listenToEvents: Boolean(starterCode) });

  return (
    <div className={`card overflow-hidden ${className}`} {...rest}>
      {showToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="eyebrow truncate">{resolvedFileName}</span>
            <span className="badge badge-neutral">{languageLabel(language)}</span>
          </div>
          {starterCode && (
            <Button size="small" onClick={sendStarterCode}>
              Load starter code
            </Button>
          )}
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={resolvedTitle}
        frameBorder="0"
        width="100%"
        loading="lazy"
        onLoad={sendStarterCode}
        className={`block w-full border-0 ${frameClassName}`}
        style={{ height: cssHeight }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; cross-origin"
      />
    </div>
  );
};

export default OneCompilerEditor;
