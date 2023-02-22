const bodyParser = require('body-parser')

module.exports = function initBodyParser(app) {
  app.use(bodyParser.urlencoded({ extended : true }))
  app.use(bodyParser.json())
}