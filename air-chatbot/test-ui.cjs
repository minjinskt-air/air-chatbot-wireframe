const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 420, height: 820 });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'C:/Users/SKTelecom/AppData/Local/Temp/v2_check.png', fullPage: false });
  await browser.close();
  console.log('done');
})();
