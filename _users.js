const prod = {
  username: process.env.PROD_USERNAME,
  password: process.env.PROD_PASSWORD
}

const town21 = {
  username: process.env.TOWN21_USERNAME,
  password: process.env.TOWN21_PASSWORD
}

const develop = {
  username: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD
}

module.exports = {
  prod,
  town21,
  develop
}