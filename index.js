const init = require('./src/init')

const timeNow = new Date()
  .toISOString()
  .split('T')[0]
  .replace(/-/g, '')

const el = {
  fullpage: null,
  header: 'header.header',
}

const base = {
  prod: {
    env: 'danskespil.dk',
    date: '20191009',
  },
  town21: {
    env: 'town21.danskespil.dk',
    date: '20191009',
  },
  develop: {
    env: 'web.develop.danskespil.dk',
    date: '20191008',
  },
}

const shoot = {
  prod: {
    env: 'danskespil.dk',
    date: timeNow,
  },
  town21: {
    env: 'town21.danskespil.dk',
    date: timeNow,
  },
  develop: {
    env: 'web.develop.danskespil.dk',
    date: timeNow,
  },
}

const compare = {
  el: el.fullpage,
  base: base.town21,
  shoot: shoot.town21,
  desktopWidth: 1600,
  devices: ['Desktop', 'iPhone 7', 'iPad', 'iPad landscape', 'iPad Pro', 'iPad Pro landscape'],
  urls: [
    '',
    '/alt-eller-intet',
    '/alt-eller-intet/vaelg-selv',
    '/alt-eller-intet/saadan-spiller-du',
    '/bingo',
    '/casino/kampagner/cirque-du-casino',
    '/dantoto/tips-og-nyhedsside',
    '/dantoto/tips-og-nyhedsside/f2a3-dantoto-kunde-tager-hele-puljen-i-v5',
    '/eurojackpot',
    '/keno',
    '/livecasino',
    '/livecasino/kampagner/velkomsttilbud',
    '/lotto',
    '/oddset/app-guide',
    '/om',
    '/plus-abonnement/plus-vaelg-spil',
    '/quick',
    '/spillehjoernet',
    '/vikinglotto',
  ],
}

init.init(compare)
