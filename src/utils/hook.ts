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
      console.log(index)
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
    }
  }
}
