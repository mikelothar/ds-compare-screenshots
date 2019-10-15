const fs = require('fs')
const utils = require('./utils')
const style = require('./style')

const head = title => {
  return `
  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${title}</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>${style.css}</style>
      <link rel="shortcut icon" href="https://danskespil.dk/favicon.ico">
    </head>
    <body class="markdown-body">
  `
}

const baseHtml = (imgArr, compare, urlAndDevice) => {
  const base = `${compare.base.date} (${compare.base.env})`
  const shot = `${compare.shoot.date} (${compare.shoot.env})`
  return `
    ${head('Compare')}
      <h1>Compare ${urlAndDevice.device}</h1>
      <table>
      <tr>
      <th>${base}</td>
      <th>${shot}</td>
      <th>Difference</td>
      </tr>
      ${trHtml(imgArr, compare, urlAndDevice)}
      </table>
    </body>
    </html>`.replace(/,/g, '')
}

const trHtml = (imgArr, compare, urlAndDevice) => {
  const tdEls = imgArr.map(file => {
    const baseFile = `${utils.outputShotsPath(compare.base.env, compare.base.date, urlAndDevice.device).replace('/output', '')}/${file}`
    const shotFile = `${utils.outputShotsPath(compare.shoot.env, compare.shoot.date, urlAndDevice.device).replace('/output', '')}/${file}`
    const diffFile = `${utils.outputDiffPath(compare, urlAndDevice.device).replace('/output', '')}/${file}`

    let tds = `<td><img src="${baseFile}" title="${file}"></td>`
    tds += `<td><img src="${shotFile}" title="${file}"></td>`
    tds += `<td><img src="${diffFile}" title="${file}"></td>`
    return `<tr>${tds}</tr>`
  })
  return tdEls
}

const indexHtml = compare => {
  const title1 = `${compare.base.date} (${compare.base.env})`
  const title2 = `${compare.shoot.date} (${compare.shoot.env})`

  const pages = utils.urlsAndDevices(compare).map(urlAndDevice => {
    const url = urlAndDevice.url
    return `<li><a href="https://${compare.base.env}${url}" target="_top">https://${compare.base.env}${url}</a></li>`
  })

  const links = utils.urlsAndDevices(compare).map(urlAndDevice => {
    const href = `./${utils.devicePath(urlAndDevice.device)}.html`

    return `<li><a href="${href}" target="_top">${urlAndDevice.device}</a></li>`
  })

  const uniqueLinks = '<ul>' + links.filter((v, i, a) => a.indexOf(v) === i) + '</ul>'
  const uniquePages = '<ul>' + pages.filter((v, i, a) => a.indexOf(v) === i) + '<ul>'

  return `
    ${head('Compare')}
      <h1>Compare</h1>
      <h3>${title1} > ${title2}</h3>
      <h3>Compare screenshots</h3>
      ${uniqueLinks.replace(/,/g, '')}
      <h3>Pages in screenshots</h3>
      ${uniquePages.replace(/,/g, '')}
    </body>
    </html>`
}

const makeHtmls = compare => {
  console.log(`Making htmls... \n`)

  const asyncMakeHtmls = async function(urlAndDevice) {
    let resultPath = `./output`

    if (!fs.existsSync(resultPath)) return

    let imgArr = []

    await new Promise((resolve, reject) => {
      const promise = fs.writeFile(`${resultPath}/index.html`, indexHtml(compare), err => {
        // if (err) throw err
        resolve(promise)
      })
    })

    await new Promise((resolve, reject) => {
      const imgPath = utils.outputDiffPath(compare, urlAndDevice.device)

      const promise = fs.readdir(imgPath, function(err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err)
        }
        files.forEach(file => imgArr.push(file))

        fs.writeFile(
          `./output/${utils.devicePath(urlAndDevice.device)}.html`,
          baseHtml(imgArr, compare, urlAndDevice),
          err => {
            // if (err) throw err
            resolve(promise)
          }
        )
      })
    })
  }

  return (async () => {
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncMakeHtmls(urlAndDevice)
    }
  })()
}

module.exports = {
  makeHtmls,
}
