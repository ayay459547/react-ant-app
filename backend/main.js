const express = require('express')
const socket = require('socket.io')
const app = express()
const ioApp = express()

function initApp (initList) {
  initList.forEach(callback => {
    callback(app)
  })
}

const initBodyParser = require('./lib/init/bodyParser')
const initCorsOptions = require('./lib/init/corsOptions')
const initCookieParser = require('./lib/init/cookieParser')

initApp([
  initBodyParser,
  initCorsOptions,
  initCookieParser,
])

const db = require('./lib/db')

const sendData = {
  data: 'empty',
  status: 'success',
  msg: '成功'
}

const errorData = {
  data: 'empty',
  status: 'error',
  msg: '失敗'
}

require('./routes')(app, db, sendData, errorData)

const port = 3030
require('http')
  .Server(app)
  .listen(port, ()=>{
    console.log( 'success run server on ' + port)
  })

const ioPort = 3050
const ioServer = require('http')
  .Server(ioApp)
  .listen(ioPort, ()=>{
    console.log( 'success io server on ' + ioPort)
  })

const io = socket(ioServer, {
    cors: { origin: '*' }
  }
)

const currentList = [
  { name: 'Admin', message: 'This is a message'}
]

io.on('connection', socket => {
  io.emit('newMessage', currentList)

  socket.on('sendMessage', data => {
    currentList.push({
      name: data.name,
      message: data.message
    })
    io.emit('newMessage', currentList)
  })
})
