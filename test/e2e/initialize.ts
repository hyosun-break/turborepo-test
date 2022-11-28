import puppeteer from 'puppeteer';
const HOST_BASE_URL = 'http://localhost:3001/';

const initializeTest = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
  });

  const response: any = await page.goto(HOST_BASE_URL);
  expect(response.status()).toBe(200);

  await page.waitForSelector('#__next');

  return {
    page,
    async cleanUp() {
      await page.close();
      await browser.close();
    },
  };
};

export default initializeTest;
