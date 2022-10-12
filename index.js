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
  '/om',
  '/plus-abonnement/plus-vaelg-spil',
  '/plus-abonnement/plus-vaelg-spil#/dialog-flow',
  '/plus-abonnement/plus-vaelg-spil#/vikinglotto',
  '/quick',
  '/spillehjoernet',
  '/spil-sammen',
  '/vikinglotto',
  '/virtuel',
  '/regler_og_vilkaar/vilkaar/ansvarlighed',
  '/regler_og_vilkaar/regler/regler_index',
  '/regler_og_vilkaar/vilkaar/vilkaar-dli',
  '/regler_og_vilkaar/vilkaar/vilkaar-dlo',
];

const loggedInUrls = [...pamUrls];

const tcUrls = [
  '/',
  '/alle-spil#/alle-spil',
  '/tivoli-wild#/',
  '/kampagner#/',
];

const getUrls = () => {
  if (params.baseEnv === 'tivolicasino.dk') return tcUrls;
  if (params.baseEnv.includes('danskespil.dk') && params.loggedIn) return loggedInUrls;
  if (params.baseEnv.includes('danskespil.dk') && !params.loggedIn) return loggedOutUrls;
};

const compare = {
  logIn: params.loggedIn,
  el: params.el,
  base: { env: params.baseEnv, date: params.baseDate },
  shoot: { env: params.shootEnv, date: params.shootDate },
  desktopWidth: 1600,
  devices: ['Desktop', 'iPhone 7', 'iPad', 'iPad landscape'],
  urls: getUrls(),
};

init.init(compare);
