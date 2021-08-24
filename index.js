require('dotenv').config();
const init = require('./src/init');
const utils = require('./src/utils');
const params = utils.params(process.argv);

const pamUrls = [
  '/roed-konto/mine-oplysninger#/',
  '/roed-konto/mine-oplysninger#/password',
  '/roed-konto/mine-oplysninger#/email',
  '/roed-konto/mine-oplysninger#/phone',
  '/roed-konto/mine-oplysninger#/cards',
  '/roed-konto/mine-oplysninger#/account',
];

const loggedOutUrls = [
  '',
  '/alt-eller-intet',
  '/alt-eller-intet/vaelg-selv',
  '/alt-eller-intet/saadan-spiller-du',
  '/bingo',
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
  '/spil-sammen',
  '/vikinglotto',
  '/virtuel',
];

const loggedInUrls = [...pamUrls];

const compare = {
  logIn: params.loggedIn,
  el: params.el,
  base: { env: params.baseEnv, date: params.baseDate },
  shoot: { env: params.shootEnv, date: params.shootDate },
  desktopWidth: 1600,
  devices: ['Desktop', 'iPhone 7', 'iPad', 'iPad landscape', 'iPad Pro', 'iPad Pro landscape'],
  urls: params.loggedIn ? [...loggedInUrls] : [...loggedOutUrls],
};

init.init(compare);
