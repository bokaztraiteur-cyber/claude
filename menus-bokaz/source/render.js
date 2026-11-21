// Rendu des affiches HTML -> PNG (A4, 300 dpi) avec Playwright.
// node render.js [fichier.html ...]  (par défaut : toutes les affiches)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const dir = __dirname;
  const out = process.env.OUT || path.join(dir, '..');
  const scale = Number(process.env.SCALE || 2);
  const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter(f => /^\d.*\.html$/.test(f));
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: scale });
  for (const f of files) {
    const page = await ctx.newPage();
    page.on('pageerror', e => console.error('ERREUR', f, e.message));
    await page.goto('file://' + path.join(dir, f));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const png = path.join(out, f.replace(/\.html$/, '.png'));
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 1240, height: 1754 } });
    console.log('ok', png);
    await page.close();
  }
  await browser.close();
})();
