const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Start the server
  const { spawn } = require('child_process');
  const server = spawn('npm', ['run', 'preview']);

  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for server to start

  try {
    // Check Home page
    await page.goto('http://localhost:4321/pt/');
    await page.screenshot({ path: 'verify_home_github.png', fullPage: true });
    console.log('Home page screenshot taken');

    // Check a Doc page
    await page.goto('http://localhost:4321/docs/guia-edicao/');
    await page.screenshot({ path: 'verify_docs_github.png', fullPage: true });
    console.log('Docs page screenshot taken');

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
    server.kill();
  }
})();
