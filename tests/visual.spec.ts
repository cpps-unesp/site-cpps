import { test, expect } from '@playwright/test';

test('verify news on home page', async ({ page }) => {
  await page.goto('http://localhost:4321/pt');
  // Wait for the news section to be visible
  await page.waitForSelector('text=Notícias Recentes');
  await page.screenshot({ path: 'home_page_news.png' });
});

test('verify news list page', async ({ page }) => {
  await page.goto('http://localhost:4321/pt/noticias');
  await page.waitForSelector('h1:has-text("NOTÍCIAS")');
  await page.screenshot({ path: 'news_list.png' });
});

test('verify news article page', async ({ page }) => {
  // We know this slug exists because we saw it in the content folder
  await page.goto(
    'http://localhost:4321/pt/noticias/experiencias-internacionais-university-of-sussex'
  );
  await page.waitForSelector('h1');
  await page.screenshot({ path: 'news_article.png' });
});
