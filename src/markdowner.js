const fs = require('fs')
const mkdirp = require('mkdirp')
const utils = require('./utils')

const imgs = (imgs, timeNow) => {
  return imgs.map(img => {
    if (img.fileName === 'index.html') return
    const path = img.resultDir.replace('./', '')
    return `[![${timeNow}](https://raw.githubusercontent.com/mikelothar/ds-compare-screenshots/master/${path}/${img.fileName})](https://raw.githubusercontent.com/mikelothar/ds-compare-screenshots/master/${path}/${img.fileName})\n\n`
  })
}

const md = (timeNow, imgs, compareWith, device) => {
  return `# ${device}\n\n### ${compareWith} / ${timeNow} / Difference\n\n${imgs}`.replace(
    /,/g,
    ''
  )
}

const indexMd = (timeNow, compareWithDate, urlsAndDevices, output) => {
  const pages = urlsAndDevices.map(urlAndDevice => `* ${urlAndDevice.url}\n`)

  const links = urlsAndDevices.map(urlAndDevice => {
    return `* [${urlAndDevice.device}](./${output}/markdown/${timeNow}-${compareWithDate}/${utils.devicePath(
      urlAndDevice.device
    )}.md)\n`
  })

  const uniqueLinks = links.filter((v, i, a) => a.indexOf(v) === i)
  const uniquePages = pages.filter((v, i, a) => a.indexOf(v) === i)

  return `# ${compareWithDate} vs ${timeNow}\n\n## Compare screenshots\n${uniqueLinks}\n## Pages in screenshots\n${uniquePages}`.replace(
    /,/g,
    ''
  )
}

const makeMarkdowns = (urlsAndDevices, output, timeNow, compareWithDate) => {
  console.log(`Making markdowns... \n`)

  fs.writeFile(
    `./readme-${output}.md`,
    indexMd(timeNow, compareWithDate, urlsAndDevices, output),
    err => {
      if (err) throw err
    }
  )

  const asyncMakeMarkdown = async function(urlAndDevice, i) {
    const mergeFilePath = utils.pathOutput(`${output}/output`, `${timeNow}-${compareWithDate}`, urlAndDevice)

    let imgArr = []

    await fs.readdir(mergeFilePath, function(err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err)
      }
      files.forEach(file =>
        imgArr.push({
          fileName: file,
          resultDir: mergeFilePath,
        })
      )

      mkdirp(`${output}/markdown/${timeNow}-${compareWithDate}`, err => {
        fs.writeFile(
          `${output}/markdown/${timeNow}-${compareWithDate}/${utils.devicePath(
            urlAndDevice.device
          )}.md`,
          md(
            timeNow,
            imgs(imgArr, timeNow),
            compareWithDate,
            urlAndDevice.device
          ),
          err => {
            if (err) throw err
          }
        )
      })
    })
  }

  return (async () => {
    let i = 1
    for (const urlAndDevice of urlsAndDevices) {
      await asyncMakeMarkdown(urlAndDevice, i++)
    }
  })()
}

module.exports = {
  makeMarkdowns,
}
