const mkdirp = require('mkdirp')

const devicePath = device => {
  return device.replace(/ /g, '-').toLowerCase()
}

const fileName = url => {
  let u = url.replace(/\//g, '_').replace(/^_/, '')
  return u.length > 1 ? u : 'index'
}

const fileOutput = (path, timeStamp, urlAndDevice) => {
  const outputPath = `${path}/${timeStamp}/${devicePath(urlAndDevice.device)}`
  mkdirp(`${outputPath}`, function(err) {})
  return `${outputPath}/${fileName(urlAndDevice.url)}.png`
}

const pathOutput = (path, timeStamp, urlAndDevice) => {
  const outputPath = `${path}/${timeStamp}/${devicePath(urlAndDevice.device)}`
  mkdirp(`${outputPath}`, function(err) {})
  return outputPath
}

const urlsAndDevices = compare => {
  let arr = []
  compare.devices.forEach(device => compare.urls.forEach(url => arr.push({ device, url })))
  return arr
}

const outputShotsPath = (env, date, device) => {
  const p = `./output/shots/${env}/${date}/${devicePath(device)}`
  mkdirp(`${p}`, function(err) {})
  return p
}

const outputShotsFile = (env, date, device, url) => {
  return `${outputShotsPath(env, date, device)}/${fileName(url)}.png`
}

const outputDiffPath = (compare, device) => {
  const p = `./output/diffs/${compare.base.env}-${compare.shoot.env}/${compare.base.date}-${
    compare.shoot.date
  }/${devicePath(device)}`
  mkdirp(`${p}`, function(err) {})
  return p
}

const outputDiffFile = (compare, device, url) => {
  return `${outputDiffPath(compare, device)}/${fileName(url)}.png`
}

module.exports = {
  fileName,
  devicePath,
  fileOutput,
  pathOutput,
  urlsAndDevices,
  outputShotsPath,
  outputShotsFile,
  outputDiffPath,
  outputDiffFile,
}
