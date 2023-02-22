module.exports = function (app, db, sendData, errorData) {
  app.get('/test', async (req, res) => {
    sendData.data = {
      test: 'test',
      status: 'success'
    }
    res.send(sendData)
  })
}