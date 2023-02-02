import { useState, useEffect } from "react"

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
    value: tempValue,
    setValue: setTempValue,
    clear() {
      setTempValue([])
    },
    removeIndex(index: number) {
      const temp = [...tempValue]
      temp.splice(index, 1)
      setTempValue(temp)
    },
    add(data: T) {
      setTempValue([...tempValue, data])
    }
  }
}
