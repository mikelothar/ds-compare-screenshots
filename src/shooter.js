const fs = require('fs')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const utils = require('./utils')

const shoot = compare => {
  const asyncShoot = async function(urlAndDevice, i, env) {
    const outputFile = utils.outputShotsFile(env.env, env.date, urlAndDevice.device, urlAndDevice.url)

    if (fs.existsSync(outputFile)) {
      return
    }

    const url = `https://${env.env}${urlAndDevice.url}`

    console.log(`Creating (${i++}/${utils.urlsAndDevices(compare).length * 2})... \n  > ${outputFile} \n`)

    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    const browser =
      process.platform === 'win32'
        ? await puppeteer.launch({
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            ignoreHTTPSErrors: true,
          })
        : await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            ignoreHTTPSErrors: true,
          })

    const page = await browser.newPage()

    if (urlAndDevice.device === 'Desktop')
      await page.setViewport({
        width: Number(compare.desktopWidth),
        height: Number(0),
      })
    else await page.emulate(devices[urlAndDevice.device])

    await page.goto(url)
    // await page.waitFor(Number(500))

    let cssSelector = '.seen_button.js-seen'
    if (await page.$(cssSelector)) {
      await page.click(cssSelector)
      await page.waitFor(Number(200))
    }

    cssSelector = '#ensCloseBanner'
    if (await page.$(cssSelector)) {
      await page.click(cssSelector)
      await page.waitFor(Number(200))
    }

    cssSelector = '.close-btn.notifications-item-close-button'
    if (await page.$(cssSelector)) {
      await page.click(cssSelector)
      await page.waitFor(Number(200))
    }

    if (compare.el) {
      const e = await page.$(compare.el)
      if (e) {
        await e.screenshot({
          path: outputFile,
        })
      }
    } else {
      await page.screenshot({
        path: outputFile,
        fullPage: true,
      })
      await page.emulateMedia('screen')
    }

    await browser.close()
  }

  return (async () => {
    let i = 1
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncShoot(urlAndDevice, i++, compare.base)
    }
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncShoot(urlAndDevice, i++, compare.shoot)
    }
  })()
}

module.exports = {
  shoot,
}
