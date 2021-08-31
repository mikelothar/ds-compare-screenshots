const program = require('commander');
const mkdirp = require('mkdirp');
const { readdirSync, statSync, existsSync } = require('fs');
const { join } = require('path');

const params = (args) => {
  const output = {};
  const timeNow = new Date().toISOString().split('T')[0].replace(/-/g, '');

  program
    .option('--base-env, [baseEnv]')
    .option('--base-date, [baseDate]')
    .option('--shoot-env, [shootEnv]')
    .option('--shoot-date, [shootDate]')
    .option('--el, [el]')
    .option('--loggedin, [loggedIn]')
    .parse(args);

  output.loggedIn = program.opts().loggedin || false;
  output.baseEnv = program.opts().baseEnv || 'danskespil.dk';
  output.baseDate = program.opts().baseDate || 'latest';
  output.shootEnv = program.opts().shootEnv || 'danskespil.dk';
  output.shootDate = program.opts().shootDate || timeNow;
  output.el = program.opts().el || 'body';

  if (output.shootDate === 'now') output.shootDate = timeNow;
  if (output.el === 'body') output.el = null;

  const dirs = (p) => readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());

  const dateDirPath = `./output/shots/${output.baseEnv}`;

  if (!existsSync(dateDirPath)) {
    output.baseDate = timeNow;
    return output;
  }

  if (output.baseDate === 'latest') {
    const dateDirs = dirs(dateDirPath);
    if (dateDirs.length === 0) {
      output.baseDate = timeNow;
      return output;
    }
    dateDirs.sort();
    let newest = dateDirs.pop();
    if (newest === timeNow) {
      if (dateDirs.length > 0) {
        newest = dateDirs.pop();
      } else {
        output.baseDate = timeNow;
        return output;
      }
    }
    output.baseDate = newest;
  }

  return output;
};

const devicePath = (device) => {
  return device.replace(/ /g, '-').toLowerCase();
};

const fileName = (url) => {
  let u = url.replace(/\//g, '_').replace(/^_/, '');
  return u.length > 1 ? u : 'index';
};

const fileOutput = (path, timeStamp, urlAndDevice) => {
  const outputPath = `${path}/${timeStamp}/${devicePath(urlAndDevice.device)}`;
  mkdirp(`${outputPath}`, function (err) {});
  return `${outputPath}/${fileName(urlAndDevice.url)}.png`;
};

const pathOutput = (path, timeStamp, urlAndDevice) => {
  const outputPath = `${path}/${timeStamp}/${devicePath(urlAndDevice.device)}`;
  mkdirp(`${outputPath}`, function (err) {});
  return outputPath;
};

const urlsAndDevices = (compare) => {
  let arr = [];
  compare.devices.forEach((device) => compare.urls.forEach((url) => arr.push({ device, url })));
  return arr;
};

const outputShotsPath = (env, date, device) => {
  const path = `./output/shots/${env}/${date}/${devicePath(device)}`;
  mkdirp.sync(path);
  return path;
};

const sanitizeUrl = (url) =>
  url.replace(/\?/g, '_').replace(/\#/g, '_').replace(/\//g, '_').replace(/\=/g, '_').replace(/___/g, '_').replace(/__/g, '_');

const outputShotsFile = (env, date, device, url) => {
  return `${outputShotsPath(env, date, device)}/${fileName(sanitizeUrl(url))}.png`;
};

const outputDiffPath = (compare, device) => {
  const path = `./output/diffs/${compare.base.env}-${compare.shoot.env}/${compare.base.date}-${compare.shoot.date}/${devicePath(
    device
  )}`;
  mkdirp.sync(path);
  return path;
};

const outputDiffFile = (compare, device, url) => {
  return `${outputDiffPath(compare, device)}/${fileName(url)}.png`;
};

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
  params,
  sanitizeUrl,
};
