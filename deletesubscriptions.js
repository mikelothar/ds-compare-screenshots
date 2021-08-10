const puppeteer = require('puppeteer-core')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    executablePath: 'C:/Users/ekmlpe/AppData/Local/Google/Chrome SxS/Application/chrome.exe',
  })
  console.log('xxx1')
  const page = await browser.newPage()
  console.log('xxx2')
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('https://dr.dk')
  await page.evaluate(() => console.log(`url is ${location.href}`));
  await page.screenshot({ path: 'example.png' })

  await browser.close()
})()

// let browser
// let page

// const logIn = async function() {
//   console.log('Logging in...')
//   // await page.emulate(devices['iPad'])
//   const url = `https://town21.danskespil.dk/lotto`
//   await page.goto(url, { waitUntil: 'networkidle2' })

//   let element = await page.waitForSelector('a.js-login-header.mobile-only', { visible: true })
//   await element.click()

//   const username = 'mlpe1234'
//   const password = 'Abc@1234'

//   await page.waitForSelector('#josso_username', { visible: true })
//   await page.type('#josso_username', username, { delay: 25 })
//   await page.type('#josso_password', password, { delay: 25 })
//   await page.click('.dtUsernamePasswordLoginSubmitButton')

//   await page.waitFor(Number(3000))
// }

// const startBrowser = async function() {
//   console.log('Starting browser...')

//   // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
//   browser = await puppeteer.launch({
//     executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
//     ignoreHTTPSErrors: true,
//     headless: false,
//   })

//   page = await browser.newPage()

//   await logIn()
// }

// ;(async () => {
//   await startBrowser()
// })()
