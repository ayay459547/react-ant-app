import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useMount = (callback: () => void = () => {}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      callback()
    }
  }, [mounted, callback])
}

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}

export const useArray = <T>(value: T[]) => {
  const [tempValue, setTempValue] = useState(value)

  return {
    list: tempValue,
    setList: setTempValue,
    clear() {
      setTempValue([])
    },
    remove(index?: number) {
      const temp = [...tempValue]

      if (typeof index === 'number') {
        temp.splice(index, 1)
      } else {
        temp.pop()
      }
      setTempValue(temp)
    },
    change(data: T, index: number) {
      const temp = [...tempValue]
      temp.splice(index, 1, data)
      setTempValue(temp)
    },
    add(data: T, index?: number) {
      const temp = [...tempValue]

      if (typeof index === 'number') {
        temp.splice(index, 0, data)
      } else {
        temp.push(data)
      }
      setTempValue(temp)
    },
    addList(data: T[]) {
      const temp = [...tempValue]
      temp.push(...data)
      setTempValue(temp)
    }
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context) {
    return context
  } else {
    throw new Error('使用 useAuth 需在 AuthProvider 中')
  }
}
