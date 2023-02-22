const CryptoJS = require("crypto-js")
// const MD5 = require('crypto-js/md5')
// const AES = require('crypto-js/aes')
// const SHA256 = require('crypto-js/sha256')
// const hmacSHA512 = require('crypto-js/hmac-sha512')

const key = 'cryptoKey'

module.exports = {
  setAES (msg) {
    return CryptoJS.AES.encrypt(msg, key).toString()
  },
  getAES (msg) {
    return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8)
  },
  setBase64 (msg) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(msg))
  },
  getBase64 (msg) {
    return CryptoJS.enc.Base64.parse(msg).toString(CryptoJS.enc.Utf8)
  },
  setSHA256 (msg) {
    return CryptoJS.SHA256(msg).toString()
  }
}