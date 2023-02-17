import React, { useRef, useEffect, useState } from 'react' 
import { 
  BarChart, 
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'
import { getHtml } from '../../api/dashboard/pie'

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]
const DemoBar: React.FC = ( ) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(700)
  const [chartHeight, setChartHeight] = useState(250)

  useEffect(() => {
    getHtml()
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect
        setChartWidth(width)
        setChartHeight(height)

        // observer.unobserve(entry.target)
      })
    })
    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef])

  return (
    <div ref={chartRef} className='dashboard-line-container'>
      <BarChart width={chartWidth} height={chartHeight} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}
export default DemoBar