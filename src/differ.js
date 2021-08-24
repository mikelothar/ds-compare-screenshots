const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const PNGCrop = require('png-crop');
const utils = require('./utils');

const diff = (compare) => {
  const asyncDiff = async function (urlAndDevice, i) {
    const oldFile = utils.outputShotsFile(
      compare.base.env,
      compare.base.date,
      urlAndDevice.device,
      utils.sanitizeUrl(urlAndDevice.url)
    );
    const newFile = utils.outputShotsFile(
      compare.shoot.env,
      compare.shoot.date,
      urlAndDevice.device,
      utils.sanitizeUrl(urlAndDevice.url)
    );
    const diffFile = utils.outputDiffFile(compare, urlAndDevice.device, utils.sanitizeUrl(urlAndDevice.url));

    if (!fs.existsSync(oldFile) || !fs.existsSync(newFile) || fs.existsSync(diffFile)) {
      return;
    }

    console.log(`Diffing (${i}/${utils.urlsAndDevices(compare).length})... \n  > ${oldFile} \n  > ${newFile} \n`);

    let oldImg;
    let newImg;

    await new Promise((resolve, reject) => {
      oldImg = fs.createReadStream(oldFile).pipe(new PNG());
      oldImg.on('parsed', () => resolve(oldImg));
    });

    await new Promise((resolve, reject) => {
      newImg = fs.createReadStream(newFile).pipe(new PNG());
      newImg.on('parsed', () => resolve(newImg));
    });

    const minHeight = Math.min(oldImg.height, newImg.height);
    const minWidth = Math.min(oldImg.width, newImg.width);

    if (oldImg.height !== newImg.height || oldImg.width !== newImg.width) {
      const oldImgHighest = oldImg.height > newImg.height;
      const config = { width: minWidth, height: minHeight, top: 0, left: 0 };
      const tallestImg = oldImgHighest ? oldFile : newFile;

      // crop the tallest image
      await new Promise((resolve, reject) => {
        const croppedImg = PNGCrop.crop(tallestImg, tallestImg, config, function (err) {
          if (err) throw err;
          resolve(croppedImg);
        });
      });

      // reload image data
      await new Promise((resolve, reject) => {
        oldImg = fs.createReadStream(oldFile).pipe(new PNG());
        oldImg.on('parsed', () => resolve(oldImg));
      });

      await new Promise((resolve, reject) => {
        newImg = fs.createReadStream(newFile).pipe(new PNG());
        newImg.on('parsed', () => resolve(newImg));
      });
    }

    var diff = new PNG({
      width: minWidth,
      height: minHeight,
    });

    pixelmatch(oldImg.data, newImg.data, diff.data, minWidth, minHeight, {
      threshold: 0.1,
    });

    await new Promise((resolve, reject) => {
      const diffed = diff.pack().pipe(fs.createWriteStream(diffFile));
      diffed.on('close', () => resolve(diffed));
    });
  };

  return (async () => {
    let i = 1;
    for (const urlAndDevice of utils.urlsAndDevices(compare)) {
      await asyncDiff(urlAndDevice, i++);
    }
  })();
};

module.exports = {
  diff,
};
