import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const htmlPages = [
  "home.html",
  "calculator.html",
  "dashboard.html",
  "goals.html",
  "learn.html",
  "community.html",
  "reports.html",
];

const requiredLinks = [
  "home.html",
  "calculator.html",
  "dashboard.html",
  "goals.html",
  "learn.html",
  "community.html",
  "reports.html",
];

const scannedFiles = [
  "app.js",
  "styles.css",
  "README.md",
  "index.html",
  "home.html",
  "calculator.html",
  "dashboard.html",
  "goals.html",
  "learn.html",
  "community.html",
  "reports.html",
  "package.json",
  "server.js",
  "render.yaml",
  "engine.mjs",
  "tests/engine.test.mjs",
];

function read(file) {
  return readFileSync(join(root, file), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const packageJson = JSON.parse(read("package.json"));
const indexHtml = read("index.html");
const appJs = read("app.js");
const styles = read("styles.css");
const sourceBundle = scannedFiles.map(read).join("\n");
const hasRemoteAssetAttr = /(?:src|href)\s*=\s*["'][^"']*https?:\/\//i;
const hasRemoteAssetUrl = /url\(\s*["']?https?:\/\//i;

assert(packageJson.scripts?.start === "node server.js", "package.json should expose the start script");
assert(packageJson.scripts?.test === "node --test tests/engine.test.mjs && node scripts/verify.mjs", "package.json should expose the test script");
assert(indexHtml.includes("url=home.html"), "index.html should redirect to home.html");
assert(appJs.includes('from "./engine.mjs"'), "app.js should import the shared engine module");
assert(!appJs.includes("const DEFAULT_INPUTS ="), "app.js should rely on shared default inputs");
assert(!appJs.includes("const PERSONAS ="), "app.js should rely on shared persona data");
assert(!appJs.includes("function calculateFootprint("), "app.js should rely on the shared carbon engine");
assert(!appJs.includes("function buildAssistant("), "app.js should rely on the shared assistant logic");
assert(!appJs.includes("function buildAlerts("), "app.js should rely on the shared alert logic");
assert(!appJs.includes("function buildLocations("), "app.js should rely on the shared location logic");
assert(!appJs.includes("function formatCategory("), "app.js should rely on the shared category formatter");
assert(appJs.includes("nav-drawer__close"), "app.js should render a close button in the mobile drawer");
assert(appJs.includes('event.key !== "Tab"'), "app.js should trap focus inside the mobile drawer");
assert(appJs.includes("ensureNavigationMarkup"), "app.js should bootstrap shared navigation");
assert(appJs.includes("markActiveNavLink"), "app.js should mark the active nav link");
assert(appJs.includes("skip-link"), "app.js should inject a skip link for accessibility");
assert(styles.includes(".skip-link"), "styles.css should style the skip link");
assert(styles.includes(".nav-drawer__close"), "styles.css should style the drawer close button");
assert(styles.includes("@media (prefers-reduced-motion: reduce)"), "styles.css should support reduced motion");
assert(sourceBundle.includes("Challenge vertical"), "Calculator page should surface a challenge vertical persona");
assert(sourceBundle.includes("personaSelect"), "Calculator page should include a persona selector");
assert(scannedFiles.includes("engine.mjs"), "Project should include a shared pure engine module");
assert(sourceBundle.includes("export function getPersonaProfile"), "engine.mjs should export the persona lookup helper");
assert(scannedFiles.includes("tests/engine.test.mjs"), "Project should include the new unit tests");
assert(sourceBundle.includes("node --test tests/engine.test.mjs"), "package.json should run unit tests");
assert(sourceBundle.includes("No third-party stock photos"), "README should document that assets are self-contained");
assert(!(hasRemoteAssetAttr.test(sourceBundle) || hasRemoteAssetUrl.test(sourceBundle)), "Project files should not reference external media/CDN assets");
assert(!/[©]|shutterstock|getty|unsplash|pexels/i.test(sourceBundle), "Project files should avoid stock or media risk references");

for (const page of htmlPages) {
  const html = read(page);
  assert(/<meta name="viewport"[^>]*>/i.test(html), `${page} should include a viewport meta tag`);
  assert(html.includes('rel="stylesheet" href="styles.css"'), `${page} should load the shared stylesheet`);
  assert(html.includes('type="module" src="app.js"'), `${page} should load the shared app script`);
  assert(html.includes('<main class="app"'), `${page} should include the main content region`);
  assert(html.includes('class="topnav"'), `${page} should include the primary navigation`);
  assert(html.includes('id="toast"'), `${page} should include the toast region`);
  assert(html.includes('id="saveSnapshot"'), `${page} should include the snapshot action`);
  assert(requiredLinks.every((link) => html.includes(`href="${link}"`)), `${page} should link to every section page`);
}

assert(read("dashboard.html").includes('role="img"'), "dashboard.html should expose the trend chart as an image");
assert(read("dashboard.html").includes('aria-labelledby="trendChartTitle trendChartDesc"'), "dashboard.html should label the trend chart");
assert(read("learn.html").includes('role="group" aria-label="Climate quiz answers"'), "learn.html should label the quiz group");
assert(read("learn.html").includes('aria-live="polite" aria-atomic="true"'), "learn.html should announce quiz feedback");
assert(read("calculator.html").includes('id="personaSelect"'), "calculator.html should include the persona selector");
assert(read("calculator.html").includes('id="personaTitle"'), "calculator.html should include the persona title");
assert(read("calculator.html").includes('id="personaFocusList"'), "calculator.html should include the persona focus list");

console.log("Verification passed: pages, persona, navigation, accessibility, and asset checks are in place.");
