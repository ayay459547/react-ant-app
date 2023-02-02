/**
 * 節流函數
 * @param {Function} callback 回調函數
 * @param {Number} delay 延遲
 * @param {Object} options 選用設定
 *                 noLeading: 是否不執行第一次回調函數
 *                 noTrailing: 是否不執行setTimeout的回調函數
 * @returns {Object} 包含回調函數的Proxy
 */
export const throttle = (callback, delay, options = {}) => {
  let now
  let timeoutId
  let lastTime

  const defaultOptions = {
    noLeading: false,
    noTrailing: false,
    ...options
  }
  let { noLeading } = defaultOptions
  const { noTrailing } = defaultOptions
  

  return new Proxy(() => {}, {
    apply (obj, thisArg, params) {
      now = +new Date()

      // 如果不是第一次執行 && 現在時間 < 上次執行時先 + 延遲時間
      if (lastTime && now < lastTime + delay) {
        if (noTrailing) return

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          lastTime = now
          callback.call(thisArg, ...params)
        }, delay)
      } else {
        if (noLeading) { 
          noLeading = false
        } else {
          lastTime = now
          callback.call(thisArg, ...params)
        }
      }
    }
  })
}
