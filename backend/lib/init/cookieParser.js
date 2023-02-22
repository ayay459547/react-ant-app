const cookieParser = require('cookie-parser')

const key = 'cookieKey'

module.exports = function initCookieParser(app) {
  app.use(cookieParser(key))
}