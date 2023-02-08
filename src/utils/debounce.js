/**
 * 防抖函數 debounce
 * @param {*} callback 回調函數
 * @param {*} delay 延遲
 * @returns 
 */
export default (callback, delay = 0) => {
  // let now = null
  let timeoutId

  // const scopeData = {}

  return new Proxy(() => {}, {
    // set (obj, key, value) {
    //   if (scopeData.hasOwnProperty(key)) {
    //     scopeData[key] = value
    //     return true
    //   }
    // },
    // get (obj, key) {
    //   if (scopeData.hasOwnProperty(key)) {
    //     return scopeData[key]
    //   }
    //   return obj[key]
    // },
    apply (obj, thisArg, params) {
      // now = +new Date()

      if (timeoutId) { clearInterval(timeoutId) }

      timeoutId = setTimeout(() => {
        callback.call(thisArg, ...params)
      }, delay)
    }
  })
}