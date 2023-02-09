/**
 * 防抖函數
 * @param {*} callback 回調函數
 * @param {*} delay 延遲
 * @returns 
 */
export const debounce = (callback, delay = 0) => {
  let timeoutId
  return new Proxy(function () {}, {
    apply (_, thisArg, params) {
      if (timeoutId) { clearInterval(timeoutId) }

      timeoutId = setTimeout(() => {
        callback.call(thisArg, ...params)
      }, delay)
    }
  })
}
