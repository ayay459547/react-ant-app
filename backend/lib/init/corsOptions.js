const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:3000/',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}

module.exports = function initCorsOptions(app) {
  app.use(cors(corsOptions))
}