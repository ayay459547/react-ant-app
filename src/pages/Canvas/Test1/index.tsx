import React, { useRef, useEffect, useState } from 'react'
import './s_dashboard.scss'
import type { digitItemType } from './digit'
import { digit } from './digit'

// ζιηΈι
interface TimeType {
  hours: number
  minutes: number
  seconds: number
}
const getCurrentSeconds = () => {
  const date = new Date()

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return hours * 3600 + minutes * 60 + seconds
}
const renderDigit = (context: CanvasRenderingContext2D, options: {
  x: number, 
  y: number, 
  text: number | string,
  radius?: number
}) => {
  const {x, y, text, radius = 0} = options
  const temp = `${text}`

  context.fillStyle = '#005588'
  
  digit[temp as digitItemType].forEach((list, listIndex) => {
    list.forEach((item, itemIndex) => {
      if (item === 1) {
        context.beginPath()
        context.arc(
          x + itemIndex * 2 * (radius + 1) + (radius + 1), 
          y + listIndex * 2 * (radius + 1) + (radius + 1), 
          radius,
          0,
          2 * Math.PI
        )

        context.fill()
      }
    })
  })
}
const renderTime = (context: CanvasRenderingContext2D, time: TimeType, options: {
  top: number,
  left: number,
  radius: number
}) => {
  const { top, left, radius } = options
  const { hours, minutes, seconds } = time
  // hours
  renderDigit(context, {
    x: left, 
    y: top,
    text: Math.floor(hours / 10),
    radius
  })
  renderDigit(context, {
    x: left + 15 * (radius + 1), 
    y: top,
    text: hours % 10,
    radius
  })
  // colon
  renderDigit(context, {
    x: left + 30 * (radius + 1), 
    y: top,
    text: ':',
    radius
  })
  // minutes
  renderDigit(context, {
    x: left + 39 * (radius + 1), 
    y: top,
    text: Math.floor(minutes / 10),
    radius
  })
  renderDigit(context, {
    x: left + 54 * (radius + 1), 
    y: top,
    text: minutes % 10,
    radius
  })
  // colon
  renderDigit(context, {
    x: left + 69 * (radius + 1), 
    y: top,
    text: ':',
    radius
  })
  // seconds
  renderDigit(context, {
    x: left + 78 * (radius + 1), 
    y: top,
    text: Math.floor(seconds / 10),
    radius
  })
  renderDigit(context, {
    x: left + 93 * (radius + 1), 
    y: top,
    text: seconds % 10,
    radius
  })
}

// η ε½θ·³ ηΈι
interface BallType {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}
const ballColorList = ['#33B5E5', '#0099CC', '#9933CC', '#669900', '#FFBB33', '#FF4444', '#CC0000']
const renderBall = (context: CanvasRenderingContext2D, ballList: BallType[], radius: number) => {
  ballList.forEach(ballItem => {
    context.fillStyle = ballItem.color

    context.beginPath()
    context.arc(ballItem.x, ballItem.y, radius, 0, 2 * Math.PI, true)
    context.closePath()
    context.fill()
  })
}

const Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [width, setWidth] = useState(768)
  const [height, setHeight] = useState(768)
  const [radius, setRadius] = useState(5)
  const top = 10
  const left = 10
  const g = 2
  const colorLength = ballColorList.length

  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [renderCount, setRenderCount] = useState(0)
  const [time, setTime] = useState<TimeType>({ hours: 0, minutes: 0, seconds: 0 })

  const [ballList, setBallList] = useState<BallType[]>([])

  const addBall = (x: number, y: number, number: number) => {
    const temp = `${number}`
    const tempList: BallType[] = []
    digit[temp as digitItemType].forEach((list, listIndex) => {
      list.forEach((item, itemIndex) => {
        if (item === 1) {
          tempList.push({
            x: x + itemIndex * 2 * (radius + 1) + (radius + 1),
            y: y + listIndex * 2 * (radius + 1) + (radius + 1), 
            vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,
            vy: -5,
            color: ballColorList[Math.floor(Math.random()*colorLength)]
          })
        }
      })
    })
    setBallList(oddValue => {
      return [...oddValue, ...tempList]
    })
  }
  // εε§ε
  useEffect(() => {
    if (containerRef !== null) {
      const container = containerRef.current
      const tempWidth = container?.offsetWidth ?? 0
      setWidth(Math.max(768, tempWidth))
      setHeight(Math.max(300, container?.offsetHeight ?? 0))

      if (tempWidth > 1400) {
        setRadius(10)
      } else if (tempWidth > 1200) {
        setRadius(8)
      } else if (tempWidth > 992){
        setRadius(7)
      } else if (tempWidth > 768){
        setRadius(6)
      } else if (tempWidth > 576){
        setRadius(5)
      } else {
        setRadius(4)
      }
    }
    // εεΎζιη§ζΈ
    const tempSeconds = getCurrentSeconds()
    setCurrentSeconds(tempSeconds)
    // ζ΄ζ°ζιη§ζΈ
    const timeoutID  = setInterval(() => {
      setCurrentSeconds(oddValue => {
        return oddValue + 1
      })
    }, 1000)
    // η ζΈ²ζζ¬‘ζΈ
    const ballRenderID = setInterval(() => {
      setRenderCount(oddValue => {
        return oddValue + 1
      })
    }, 50)
    return () => {
      clearInterval(timeoutID)
      clearInterval(ballRenderID)
    }
  }, [])

  // ζιζΉθ?
  useEffect(() => {
    setTime(oddTime => {
      const { hours: oddHours, minutes: oddMinutes, seconds: oddSeconds } = oddTime

      const newHours = Math.floor(currentSeconds / 3600)
      const newMinutes = Math.floor((currentSeconds - newHours * 3600) / 60)
      const newSeconds = currentSeconds % 60

      // hours
      if (Math.floor(oddHours / 10) !== Math.floor(newHours / 10)) {
        addBall(
          top, 
          left, 
          Math.floor(newHours / 10)
        )
      }
      if (oddHours % 10 !== newHours % 10) {
        addBall(
          left + 15 * (radius + 1), 
          top,
          newHours % 10
        )
      }
      // minutes
      if (Math.floor(oddMinutes / 10) !== Math.floor(newMinutes / 10)) {
        addBall(
          left + 39 * (radius + 1), 
          top,
          Math.floor(newMinutes / 10)
        )
      }
      if (oddMinutes % 10 !== newMinutes % 10) {
        addBall(
          left + 54 * (radius + 1), 
          top,
          newMinutes % 10
        )
      }
      // seconds
      if (Math.floor(oddSeconds / 10) !== Math.floor(newSeconds / 10)) {
        addBall(
          left + 78 * (radius + 1), 
          top,
          Math.floor(newSeconds / 10)
        )
      }
      if (oddSeconds % 10 !== newSeconds % 10) {
        addBall(
          left + 93 * (radius + 1), 
          top,
          newSeconds % 10
        )
      }
      return { 
        hours: newHours, 
        minutes: newMinutes, 
        seconds: newSeconds
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeconds])

  const updateBallList = () => {
    const newBallList: BallType[] = []
    ballList.forEach(ballItem => {
      let x = ballItem.x + ballItem.vx
      let y = ballItem.y + ballItem.vy
      let vy = ballItem.vy + g
      // η’°ε°ιη·£ εε½
      if (ballItem.y >= height - radius) {
        y = height - radius - 1
        vy = ballItem.vy * (-1) * 0.6
      }
      // εͺδΏε­ ζε­ε¨η«εΈδΈ­ηη
      if (ballItem.x + radius > 0 && ballItem.x - radius < width) {
        newBallList.push({...ballItem, x, y, vy })
      }
    })
    setBallList(newBallList)
  }
  // ζι η ζΈ²ζ
  useEffect(() => {
    updateBallList()
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        context.clearRect(0, 0, width, height)
        renderTime(context, time, { top, left, radius })
        renderBall(context, ballList, radius)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCount])

  return (
    <div ref={containerRef} className='dashboard-container'>
      <canvas ref={canvasRef} height={height} width={width} className="dashboard-canvas">
        ηΆεηθ¦½ε¨δΈζ―ζ΄ canvas
      </canvas>
    </div>
  )
}

export default Dashboard
