import React, { useRef, useEffect, useState } from 'react' 
import { 
  PieChart, 
  Pie,
  Cell,
} from 'recharts' 

const colors = ['#FF4444', '#0099CC', '#9933CC', '#669900', '#FFBB33', '#FF4444', '#CC0000']

const data = [
  {
    name: "TS",
    color: "#000000",
    value: 75.3
  },
  {
    name: "SCSS",
    color: "#000000",
    value: 16.5
  },
  {
    name: "JS",
    color: "#000000",
    value: 6.1
  },
  {
    name: "HTML",
    color: "#000000",
    value: 2.0
  },
  {
    name: "Shell",
    color: "#000000",
    value: 0.1
  }
]
const DemoPie: React.FC = ( ) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(700)
  const [chartHeight, setChartHeight] = useState(250)

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = (param: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, payload } = param
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    const { color, name, value } = payload
  
    return (
      <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name}-${value}%`}
      </text>
    )
  }

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
      <PieChart width={chartWidth} height={chartHeight}>
        <Pie
          data={data} 
          cx="50%" 
          cy="50%"
          dataKey="value"
          innerRadius={0}
          outerRadius={100}
          paddingAngle={5}
          labelLine={false}
          label={renderCustomizedLabel}
        >
        	{
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Pie>
      </PieChart>
    </div>
  )
}
export default DemoPie