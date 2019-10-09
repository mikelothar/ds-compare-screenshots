const fs = require('fs')
const mergeImg = require('merge-img')
const utils = require('./utils')

const merge = compare => {
  const asyncMerge = async function(urlAndDevice, i) {
    const oldFile = utils.fileOutput(`./shots/${compare.base.env}`, compare.base.date, urlAndDevice)
    const newFile = utils.fileOutput(`./shots/${compare.shoot.env}`, compare.shoot.date, urlAndDevice)
    const diffFile = utils.fileOutput(
      `./diff/${compare.shoot.env}-${compare.base.env}`,
      `${compare.shoot.date}-${compare.base.date}`,
      urlAndDevice
    )
    const mergeFile = utils.fileOutput(
      `./output/${compare.shoot.env}-${compare.base.env}`,
      `${compare.shoot.date}-${compare.base.date}`,
      urlAndDevice
    )

    if (!fs.existsSync(oldFile) || !fs.existsSync(newFile) || !fs.existsSync(diffFile) || fs.existsSync(mergeFile)) {
      return
    }

    console.log(
      `Merging (${i}/${utils.urlsAndDevices(compare).length})... \n  > ${oldFile} \n  > ${newFile} \n  > ${diffFile} \n`
    )

    try {
      await mergeImg([oldFile, newFile, diffFile]).then(img => {
        img.write(mergeFile)
      })
    } catch (err) {
      // just skip it..
      console.log(`  > Errored, skipping...\n`)
    }
  }

  return (async () => {
    let i = 1
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncMerge(urlAndDevice, i++)
    }
  })()
}

module.exports = {
  merge,
}
