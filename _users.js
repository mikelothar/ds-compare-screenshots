const CONFIG = require('./config.json')

const prod = {
  username: CONFIG.users.prod.username,
  password: CONFIG.users.prod.password
}

const town21 = {
  username: CONFIG.users.town21.username,
  password: CONFIG.users.town21.password
}

const develop = {
  username: CONFIG.users.develop.username,
  password: CONFIG.users.develop.password
}

module.exports = {
  prod,
  town21,
  develop
}