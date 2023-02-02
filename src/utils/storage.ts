const rm = (key: string) => {
  localStorage.removeItem(key)
}
const get = (key: string): string | null => {
  return localStorage.getItem(key)
}
const set = (key: string, value: string) => {
  return localStorage.setItem(key, value)
}
const clear = () => {
  return localStorage.clear()
}

export { rm, get, set, clear }