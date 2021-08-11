const init = require('./src/init')
const utils = require('./src/utils')

const params = utils.params(process.argv)
const pamUrls = [
  '/blaa-konto/mine-oplysninger#/',
  '/blaa-konto/mine-oplysninger#/password',
  '/blaa-konto/mine-oplysninger#/email',
  '/blaa-konto/mine-oplysninger#/phone',
  '/blaa-konto/mine-oplysninger#/cards',
  '/blaa-konto/mine-oplysninger#/account',
]
const compare = {
  logIn: true,
  el: params.el,
  base: { env: params.baseEnv, date: params.baseDate },
  shoot: { env: params.shootEnv, date: params.shootDate },
  desktopWidth: 1600,
  devices: [
    // 'Desktop', 
    // 'iPhone 7', 
    // 'iPad', 
    'iPad landscape', 
    // 'iPad Pro', 
    // 'iPad Pro landscape'
  ],
  urls: [
    // '',
    // '/alt-eller-intet',
    // '/alt-eller-intet/vaelg-selv',
    // '/alt-eller-intet/saadan-spiller-du',
    // '/bingo',
    // '/eurojackpot',
    // '/keno',
    // '/livecasino',
    // '/livecasino/kampagner/velkomsttilbud',
    // '/lotto',
    // '/oddset/app-guide',
    // '/om',
    // '/plus-abonnement/plus-vaelg-spil',
    // '/plus-abonnement/plus-vaelg-spil#/dialog-flow',
    // '/plus-abonnement/plus-vaelg-spil#/vikinglotto',
    // '/quick',
    // '/spillehjoernet',
    // '/vikinglotto',
    ...pamUrls
  ],

}

init.init(compare)
