const prettyMilliseconds = require('pretty-ms');
const del = require('delete');
const shooter = require('./shooter');
const differ = require('./differ');
const merger = require('./merger');
const markdowner = require('./markdowner');
const htmler = require('./htmler');
const exporter = require('./exporter');

const startedRunningAt = new Date();

const init = (compare) => {
  (async () => {
    // del.sync(`./${output}/markdown`)
    // del.sync(`./${output}/temp`)
    // del.sync(`./${output}/output`)
    // del.sync(`./${output}/shots/${timeNow}`)

    await shooter.shoot(compare);
    await differ.diff(compare);
    // await merger.merge(compare)
    await htmler.makeHtmls(compare);
    await exporter.exporter(compare);
    // await markdowner.makeMarkdowns(urlsAndDevices(urls, devices), output, timeNow, compareWithDate)

    console.log(
      `Done! It only took ${prettyMilliseconds(new Date() - startedRunningAt, {
        verbose: true,
      })}!`
    );
  })();
};

module.exports = {
  init,
};
