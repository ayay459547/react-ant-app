// const moment = require('moment')
export const cookieParser = require('cookie-parser')

/**
 * 設置 cookie
 * @param {*} res 
 * @param {String} sKey 
 * @param {String} sValue 
 * @param {Object} options
 *  options 說明:
 *  expires(秒), ex: new Date(Date.now() + 900000)
 *  maxAge(毫秒), ex: 900000
 *  secrue(true時 只在HTTPS有效), 
 *  path(路徑 要匹配到才有用),
 *  domin(路徑)
 *  httpOnly(防XSS 無法通過js腳本 applet等取得cookie 訊息)
 *  signed(true時 為簽名cookie 需用res.signedCookies使用 被竄改時會被服務器拒絕 且重置cookie)
 *  sameSite(若為true則cookie在前端會被限制為僅有在前端第一方網域發出的 request才能附帶對應的cookie，第三方網域發出的request無法附帶我們第一方的cookie)
 */
function setCookie (res, sKey, sValue, options = {
  path: '/',
  sameSite: true,
  secrue: false,
  httpOnly: true,
  signed: true,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  // expires: moment.utc(moment().add(1, 'days').format('YYYY-MM-DD 00:00:00'))
}) {
  res.cookie(sKey, sValue, options)
}

/**
 * 取的 cookie
 * @param {*} req 
 * @param {String} sKey 
 * @param {Boolean} signed
 * @returns 
 */
function getCookie (req, sKey, signed = true) {
  if (signed) {
    return req.signedCookies[sKey]
  } else {
    return req.cookies[sKey]
  }
}

/**
 * 清除 cookie
 * @param {*} res 
 * @param {String} sKey
 * @param {Object} options
 * @returns 
 */
function clearCookie (res, sKey, options = {
  path: '/',
  sameSite: true,
  secrue: false,
  httpOnly: true,
  signed: true,
  maxAge: 0
}) {
  res.clearCookie(sKey)
}

module.exports = {
  setCookie,
  getCookie,
  clearCookie
}