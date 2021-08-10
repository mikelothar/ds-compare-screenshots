const init = require('./src/init')
const utils = require('./src/utils')

const params = utils.params(process.argv)

const compare = {
  logIn: false,
  el: params.el,
  base: { env: params.baseEnv, date: params.baseDate },
  shoot: { env: params.shootEnv, date: params.shootDate },
  desktopWidth: 1600,
  devices: ['Desktop', 'iPhone 7', 'iPad', 'iPad landscape', 'iPad Pro', 'iPad Pro landscape'],
  urls: [
    '',
    // '/ny_forside',
    '/alt-eller-intet',
    '/alt-eller-intet/vaelg-selv',
    '/alt-eller-intet/saadan-spiller-du',
    '/bingo',
    // '/casino/kampagner/cirque-du-casino',
    // '/dantoto/tips-og-nyhedsside',
    // '/dantoto/tips-og-nyhedsside/f2a3-dantoto-kunde-tager-hele-puljen-i-v5',
    '/eurojackpot',
    '/keno',
    '/livecasino',
    '/livecasino/kampagner/velkomsttilbud',
    '/lotto',
    '/oddset/app-guide',
    '/om',
    '/plus-abonnement/plus-vaelg-spil',
    '/plus-abonnement/plus-vaelg-spil#/dialog-flow',
    '/plus-abonnement/plus-vaelg-spil#/vikinglotto',
    '/quick',
    '/spillehjoernet',
    '/vikinglotto',
  ],
}

init.init(compare)
