const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'src');
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.jsx?$/.test(e.name)) files.push(p);
  }
})(ROOT);

const tokens = new Map(); // token -> [files]
const add = (t, f) => {
  if (!t) return;
  if (!tokens.has(t)) tokens.set(t, new Set());
  tokens.get(t).add(f);
};

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /className=\{?\s*(['"`])([\s\S]*?)\1/g;
  let m;
  while ((m = re.exec(s))) {
    const raw = m[2].replace(/\$\{[^}]*\}/g, ' ');
    for (const t of raw.split(/\s+/)) add(t, path.basename(f));
  }
}

// also collect @apply usages in index.css
const css = fs.readFileSync(path.join(ROOT, 'index.css'), 'utf8');
for (const m of css.matchAll(/@apply\s+([^;]+);/g)) {
  for (const t of m[1].split(/\s+/)) add(t, 'index.css@apply');
}

// load built css
const distDir = path.join(__dirname, 'dist', 'assets');
const cssFile = fs.readdirSync(distDir).find((n) => n.endsWith('.css'));
const built = fs.readFileSync(path.join(distDir, cssFile), 'utf8');

function esc(t) {
  // convert class token to selector form, handling variants + arbitrary values
  return t;
}

function exists(token) {
  const parts = token.split(':');
  const base = parts.pop();
  let candidates;
  if (base.startsWith('[') && base.endsWith(']')) {
    const v = base.slice(1, -1);
    candidates = [`.${cssEscape(token)}`];
  } else {
    candidates = ['.' + cssEscape(token)];
  }
  return candidates.some((c) => built.includes(c));
}

function cssEscape(t) {
  // approximate: escape characters Tailwind escapes in selectors
  return t.replace(/([^a-zA-Z0-9_-])/g, (ch) => {
    if (ch === '[') return '\\[';
    if (ch === ']') return '\\]';
    if (ch === '(') return '\\(';
    if (ch === ')') return '\\)';
    if (ch === '.') return '\\.';
    if (ch === '/') return '\\/';
    if (ch === '%') return '\\%';
    if (ch === '#') return '\\#';
    if (ch === ',') return '\\,';
    if (ch === "'") return "\\'";
    if (ch === '"') return '\\"';
    if (ch === '&') return '\\&';
    if (ch === '+') return '\\+';
    if (ch === '=') return '\\=';
    if (ch === '_') return '\\_';
    if (ch === '*') return '\\*';
    if (ch === '!') return '\\!';
    if (ch === '@') return '\\@';
    if (ch === '<') return '\\<';
    if (ch === '>') return '\\>';
    if (ch === '~') return '\\~';
    if (ch === '^') return '\\^';
    if (ch === '|') return '\\|';
    if (ch === ':') return '\\:';
    return ch;
  });
}

const missing = [];
for (const [t, where] of tokens) {
  if (!t) continue;
  if (!exists(t)) missing.push([t, [...where].join(', ')]);
}
missing.sort();
console.log(`tokens scanned: ${tokens.size}`);
console.log(`MISSING (${missing.length}):`);
for (const [t, w] of missing) console.log(`  ${t}   <- ${w}`);
