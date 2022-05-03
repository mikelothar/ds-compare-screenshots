const blinkDiff = require('blink-diff');
const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const wait = (page = puppeteer.Page, interval = 200, timeout = 5000, fullPage = true) => {
  const doIt = async function () {
    const t0 = new Date().getTime();
    let previousBuffer;
    while (new Date().getTime() - t0 < timeout) {
      await sleep(interval);

      const currentBuffer = Buffer.from(
        await page.screenshot({
          encoding: 'base64',
          fullPage,
        }),
        'base64'
      );

      if (!previousBuffer) {
        previousBuffer = currentBuffer;
        continue;
      }

      const diff = new blinkDiff({ imageA: previousBuffer, imageB: currentBuffer });
      const result = await diff.runWithPromise();

      if (result.differences === 0) {
        return true;
      }

      previousBuffer = currentBuffer;
    }

    // throw new Error("Timeouted!!");
  };

  return (async () => {
    await doIt();
  })();
};

module.exports = {
  wait,
};
