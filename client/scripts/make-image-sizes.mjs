// Makes smaller copies of the site's photos, so phones don't download desktop-size images.
// Run it after adding or replacing a photo in public/images:   npm run images
//
// For each photo it writes WebP copies 480, 800 and 1200 pixels wide (only sizes smaller than the photo;
// JPG/PNG photos also get a full-width WebP copy) and lists them in src/utils/image-srcsets.json.
// responsive() in src/utils/responsiveImage.js reads that list for <img srcSet>.
// A photo that hasn't been through this script still works; it just isn't resized.
// Needs Google's `cwebp` tool (macOS: `brew install webp`; MAMP also ships one).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');
const manifestFile = path.join(root, 'src/utils/image-srcsets.json');

const WIDTHS = [480, 800, 1200];
const QUALITY = '78';
const SKIP_DIRS = new Set(); // folders to leave alone, e.g. new Set(['icons'])
const COPY = /-\d+w\.webp$/; // the copies this script makes
const PHOTO = /\.(webp|jpe?g|png)$/i;

const cwebp = ['cwebp', '/opt/homebrew/bin/cwebp', '/usr/local/bin/cwebp', '/Applications/MAMP/Library/bin/cwebp'].find((bin) => {
  try { execFileSync(bin, ['-version'], { stdio: 'ignore' }); return true; } catch { return false; }
});
if (!cwebp) { console.error('cwebp not found. Install it (macOS: brew install webp) and run again.'); process.exit(1); }

// Width and height from the file header (WebP, JPEG or PNG), so no image library is needed.
function dimensions(file) {
  const b = fs.readFileSync(file);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (chunk === 'VP8L') { const n = b.readUInt32LE(21); return [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]; }
    if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9;) {
      if (b[i] !== 0xff) { i += 1; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  throw new Error(`Can't read the size of ${file}`);
}

function photos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : photos(full);
    return PHOTO.test(e.name) && !COPY.test(e.name) ? [full] : [];
  });
}

const manifest = {};
const keep = new Set();
let made = 0;
for (const file of photos(imagesDir)) {
  const [width] = dimensions(file);
  const isWebp = /\.webp$/i.test(file);
  // Only make a copy when it's clearly smaller; non-WebP photos also get a full-width WebP copy.
  const widths = WIDTHS.filter((w) => w < width * 0.85);
  if (!isWebp) widths.push(width);
  if (!widths.length) continue;

  const url = `/${path.relative(publicDir, file).split(path.sep).join('/')}`;
  const entries = widths.map((w) => {
    const out = file.replace(PHOTO, `-${w}w.webp`);
    keep.add(out);
    if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(file).mtimeMs) {
      const resize = w < width ? ['-resize', String(w), '0'] : [];
      execFileSync(cwebp, ['-quiet', '-q', QUALITY, '-m', '6', ...resize, file, '-o', out]);
      made += 1;
    }
    return `${url.replace(PHOTO, `-${w}w.webp`)} ${w}w`;
  });
  if (isWebp) entries.push(`${url} ${width}w`);
  manifest[url] = entries.join(', ');
}

// Remove copies whose original photo was deleted or renamed.
let removed = 0;
const allCopies = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? allCopies(path.join(dir, e.name)) : COPY.test(e.name) ? [path.join(dir, e.name)] : []));
for (const copy of allCopies(imagesDir)) if (!keep.has(copy)) { fs.rmSync(copy); removed += 1; }

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(manifestFile, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Image sizes: ${Object.keys(sorted).length} photos, ${made} copies made, ${removed} old copies removed -> src/utils/image-srcsets.json`);
