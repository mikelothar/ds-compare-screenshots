const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const getEnv = (env) => {
  let output = env.split('.')[0];
  output = output === 'danskespil' ? 'prod' : output;
  return output;
};

const exporter = (compare) => {
  const asyncMakeHtmls = async function (compare) {
    const outputPath = `./export/${getEnv(compare.base.env)}`;
    rimraf.sync(outputPath);
    mkdirp.sync(outputPath);

    let copyFrom = `./output/diffs/${compare.base.env}-${compare.shoot.env}/${compare.base.date}-${compare.shoot.date}`;
    let copyTo = `${outputPath}/diffs/${compare.base.env}-${compare.shoot.env}/${compare.base.date}-${compare.shoot.date}`;
    fs.copy(copyFrom, copyTo);

    copyFrom = `./output/shots/${compare.base.env}/${compare.base.date}`;
    copyTo = `${outputPath}/shots/${compare.base.env}/${compare.base.date}`;
    fs.copy(copyFrom, copyTo);

    copyFrom = `./output/shots/${compare.shoot.env}/${compare.shoot.date}`;
    copyTo = `${outputPath}/shots/${compare.shoot.env}/${compare.shoot.date}`;
    fs.copy(copyFrom, copyTo);

    const htmlFilesToCopy = ['index', 'desktop', 'ipad', 'iphone-7', 'ipad-landscape', 'ipad-pro-landscape', 'ipad', 'ipad-pro'];

    htmlFilesToCopy.forEach((file) => fs.copy(`./output/${file}.html`, `${outputPath}/${file}.html`, (err) => {}));
  };

  return (async () => {
    await asyncMakeHtmls(compare);
  })();
};

module.exports = {
  exporter,
};
