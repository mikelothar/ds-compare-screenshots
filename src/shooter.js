const fs = require('fs');
const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors')
const utils = require('./utils');
const users = require('../_users');

let browser;
let page;

const shoot = compare => {
  const logIn = async function (env) {
    console.log('Logging in...');
    await page.emulate(puppeteer.devices['iPad']);
    const url = `https://${env}/lotto`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    let element = await page.waitForSelector('a.js-login-header.mobile-only', { visible: true });
    await element.click();

    let username = env === 'danskespil.dk' ? users.prod.username : users.town21.username;
    let password = env === 'danskespil.dk' ? users.prod.password : users.town21.password;

    if (env === `web.${process.env.LOCAL_TEST_ENV_NAME}.danskespil.dk`) {
      username = users.develop.username;
      password = users.develop.password;
    }

    await page.waitForSelector('#josso_username', { visible: true });
    await page.type('#josso_username', username, { delay: 25 });
    await page.type('#josso_password', password, { delay: 25 });
    await page.click('.dtUsernamePasswordLoginSubmitButton');

    await page.waitForTimeout(3000);
  };

  const startBrowser = async function (env) {
    console.log('Starting browser...');

    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    browser =
      process.platform === 'win32'
        ? await puppeteer.launch({
          executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
          ignoreHTTPSErrors: true,
          headless: true,
        })
        : await puppeteer.launch({
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          ignoreHTTPSErrors: true,
          headless: false,
        });

    page = await browser.newPage();

    // no need to load images
    await page.setRequestInterception(true);
    page.on('request', request => {
      // don't load images.
      // if (request.resourceType() === 'image') request.abort(); else

      // skip modal.
      if (request.url().endsWith('Bootstrap.js')) request.abort();
      else request.continue();
    });

    if (compare.logIn) await logIn(env);
  };

  const endBrowser = async function () {
    console.log('Ending browser...');
    await browser.close();
  };

  const asyncShoot = async function (urlAndDevice, i, env) {
    const outputFile = utils.outputShotsFile(env.env, env.date, urlAndDevice.device, urlAndDevice.url);

    if (fs.existsSync(outputFile)) {
      return;
    }

    const url = `https://${env.env}${urlAndDevice.url}`;

    console.log(`Creating (${i++}/${utils.urlsAndDevices(compare).length * 2})... \n  > ${outputFile} \n`);

    if (urlAndDevice.device === 'Desktop')
      await page.setViewport({
        width: Number(compare.desktopWidth),
        height: Number(0),
      });
    else await page.emulate(puppeteer.devices[urlAndDevice.device]);

    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(2000);

    try {
      await page.click('.seen_button.js-seen');
      await page.waitForTimeout(200);
    } catch (err) {
    }

    try {
      await page.click('#ensCloseBanner');
      await page.waitForTimeout(200);
    } catch (err) {
    }

    try {
      await page.click('.close-btn.notifications-item-close-button');
      await page.waitForTimeout(200);
    } catch (err) {
    }

    if (compare.el) {
      const e = await page.$(compare.el);
      if (e) {
        await e.screenshot({
          path: outputFile,
        });
      }
    } else {
      await page.screenshot({
        path: outputFile,
        fullPage: true,
      });
      // await page.emulateMedia('screen')
    }
  };

  return (async () => {
    let i = 1;
    await startBrowser(compare.base.env);
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncShoot(urlAndDevice, i++, compare.base);
    }
    await endBrowser();
    await startBrowser(compare.shoot.env);
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncShoot(urlAndDevice, i++, compare.shoot);
    }
    await endBrowser();
  })();
};

module.exports = {
  shoot,
};
