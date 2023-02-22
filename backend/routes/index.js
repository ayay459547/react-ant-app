const test = require('./test')

const routerList = []

const isLogin = true

module.exports = function (app, db, sendData, errorData) {
  // 測試用
  // http://localhost:3030/test
  // http://192.168.1.XXX:3030/test
  test(app, db, sendData, errorData)

  app.use(function (req, res, next) {
    if (isLogin) {
      next()
    } else {

      errorData.data = 'not login'
      res.send(errorData)
    }
  })

  routerList.forEach(route => {
    route(app, db, sendData, errorData)
  })

  app.use(function (req, res, next) {
    errorData.data = `cann't find router`
    res.status(404).send(errorData)
  })
}