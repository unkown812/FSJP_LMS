const { execSync } = require('child_process');

const BASE = 'b4ac055';
const files = execSync(`git ls-tree -r ${BASE} --name-only -- frontend/src`, {
  cwd: process.cwd(),
})
  .toString()
  .split('\n')
  .map((s) => s.trim())
  .filter((s) => /\.jsx$/.test(s));

function show(ref, file) {
  try {
    return execSync(`git show ${ref}:${file}`, { cwd: process.cwd(), maxBuffer: 1e8 }).toString();
  } catch (e) {
    return null;
  }
}

// extract human-ish UI strings: string literals in JSX/text and common props
function strings(src) {
  const out = new Set();
  if (!src) return out;
  const patterns = [
    /\b(?:title|label|description|placeholder|message|tip|name|aria-label|emptyMessage|actionText|subTitle)=\{?["'`]([^"'`]+)["'`]/g,
    /(?:^|>|\s)([A-Z][A-Za-z0-9 ,.'&\/()!?:%+-]{3,60})(?=<|\{|\n|\s{2,})/g,
    /<span[^>]*>([^<>{}\n]{3,70})<\/span>/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(src))) {
      const t = (m[1] || '').trim();
      if (t && !/^https?:/.test(t)) out.add(t);
    }
  }
  return out;
}

let totalMissing = 0;
for (const f of files) {
  const a = strings(show(BASE, f));
  const b = strings(show('HEAD', f));
  if (!a.size) continue;
  const missing = [...a].filter((s) => !b.has(s));
  if (missing.length) {
    totalMissing += missing.length;
    console.log(`\n=== ${f} (missing ${missing.length}) ===`);
    missing.slice(0, 40).forEach((s) => console.log(`  - ${s}`));
  }
}
console.log(`\nTOTAL missing strings: ${totalMissing}`);
