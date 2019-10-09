const init = require('./src/init')

const timeNow = new Date()
  .toISOString()
  .split('T')[0]
  .replace(/-/g, '')

const compare = {
  // el: 'header.header',
  el: null,
  base: {
    env: 'danskespil.dk',
    date: '20191008',
  },
  shoot: {
    // env: 'web.develop.danskespil.dk',
    // env: 'danskespil.dk',
    env: 'town21.danskespil.dk',
    date: timeNow,
  },
  desktopWidth: 1600,
  devices: [
    'Desktop',
    'iPhone 7',
    'iPad',
    'iPad landscape',
    'iPad Pro',
    'iPad Pro landscape'
  ],
  urls: [
    '',
    '/alt-eller-intet',
    '/alt-eller-intet/vaelg-selv',
    '/alt-eller-intet/saadan-spiller-du',
    '/bingo',
    '/casino/kampagner/cirque-du-casino',
    '/dantoto',
    '/dantoto/tips-og-nyhedsside',
    '/dantoto/tips-og-nyhedsside/f2a3-dantoto-kunde-tager-hele-puljen-i-v5',
    '/eurojackpot',
    '/keno',
    '/livecasino',
    '/livecasino/kampagner/velkomsttilbud',
    '/lotto',
    '/om',
    '/plus-abonnement/plus-vaelg-spil',
    '/quick',
    '/spillehjoernet',
    '/vikinglotto',
  ],
}

init.init(compare)
