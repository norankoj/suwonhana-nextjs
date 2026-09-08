/**
 * 스냅샷에 등장하는 워드프레스 이미지를 public/wp-media 로 내려받고 최적화한다.
 *
 * 사용법 (Local 워드프레스가 켜져 있어야 함)
 *   node scripts/snapshot-media.mjs
 *
 * 순서
 *   1. fixtures/**.json 에서 http://suwonhana.local/... 이미지 URL을 모은다
 *   2. public/wp-media/<원래 경로> 로 내려받는다 (이미 있으면 건너뜀)
 *   3. 최대 1600px 로 줄이고 재압축한다
 *   4. fixtures 안의 절대 URL을 /wp-media/... 상대경로로 바꾼다
 *
 * 4번까지 끝나면 워드프레스 없이도 이미지가 뜬다.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const FIXTURES = path.join(ROOT, "fixtures");
const OUT = path.join(ROOT, "public", "wp-media");
const WP_HOST = process.env.WP_UPSTREAM || "http://suwonhana.local";
const MAX_W = 1600;

const mb = (n) => (n / 1048576).toFixed(1) + "MB";

// ── 1. URL 수집 ────────────────────────────────────────────────
function fixtureFiles() {
  const out = [];
  for (const kind of ["rest", "graphql"]) {
    const d = path.join(FIXTURES, kind);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      if (f !== "_index.json") out.push(path.join(d, f));
    }
  }
  return out;
}

const host = WP_HOST.replace(/^https?:\/\//, "").replace(/\/$/, "");
const RE = new RegExp(`https?://${host.replace(/\./g, "\\.")}/[^"'\\\\\\s)]+`, "g");

const urls = new Set();
for (const f of fixtureFiles()) {
  const raw = fs.readFileSync(f, "utf8").replace(/\\\//g, "/");
  for (const m of raw.matchAll(RE)) {
    if (/\.(jpe?g|png|gif|webp|svg)$/i.test(m[0])) urls.add(m[0]);
  }
}
console.log(`이미지 URL ${urls.size}개 발견`);

// ── 2. 내려받기 ────────────────────────────────────────────────
let ok = 0,
  fail = 0;
for (const url of urls) {
  const rel = decodeURIComponent(new URL(url).pathname).replace(/^\/+/, "");
  const dest = path.join(OUT, rel);
  if (fs.existsSync(dest)) {
    ok++;
    continue;
  }
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("HTTP " + r.status);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) {
    fail++;
    console.warn("  받기 실패:", rel.slice(0, 60), String(e).slice(0, 30));
  }
}
console.log(`내려받기 ${ok}개 / 실패 ${fail}개 (실패는 WP에서 이미 삭제된 파일)`);

// ── 3. 최적화 ──────────────────────────────────────────────────
const imgs = [];
(function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) imgs.push(p);
  }
})(OUT);

let before = 0,
  after = 0,
  shrunk = 0;
for (const f of imgs) {
  // sharp 에 경로를 넘기면 dev 서버가 public/ 을 감시하며 잡고 있는 핸들과
  // 충돌해 Windows 에서 "UNKNOWN: unknown error, open" 이 난다.
  // 우리가 직접 읽어 버퍼로 넘기면 문제가 없다.
  const src = fs.readFileSync(f);
  before += src.length;
  if (src.length < 200 * 1024) {
    after += src.length; // 200KB 미만은 손대지 않음
    continue;
  }
  try {
    const meta = await sharp(src).metadata();
    let pipe = sharp(src).rotate();
    if ((meta.width || 0) > MAX_W) pipe = pipe.resize({ width: MAX_W });
    const isJpg = /\.jpe?g$/i.test(f);
    const buf = await (isJpg
      ? pipe.jpeg({ quality: 80, mozjpeg: true })
      : pipe.png({ compressionLevel: 9, palette: true })
    ).toBuffer();
    if (buf.length < src.length) {
      fs.writeFileSync(f, buf);
      shrunk++;
      after += buf.length;
    } else after += src.length;
  } catch (e) {
    after += src.length;
    console.warn("  최적화 실패:", path.basename(f).slice(0, 45), String(e).slice(0, 60));
  }
}
console.log(`최적화 ${shrunk}/${imgs.length}개 · ${mb(before)} → ${mb(after)}`);

// ── 4. fixtures 안의 URL을 상대경로로 치환 ──────────────────────
let rewritten = 0;
for (const f of fixtureFiles()) {
  const raw = fs.readFileSync(f, "utf8");
  // JSON 안에서는 "/" 가 \/ 로 이스케이프될 수 있으므로 두 형태 모두 처리
  const next = raw
    .split(`${WP_HOST}/wp-content`)
    .join("/wp-media/wp-content")
    .split(`${WP_HOST.replace(/\//g, "\\/")}\\/wp-content`)
    .join("\\/wp-media\\/wp-content");
  if (next !== raw) {
    fs.writeFileSync(f, next, "utf8");
    rewritten++;
  }
}
console.log(`fixtures ${rewritten}개 파일의 이미지 URL을 /wp-media/... 로 치환`);
