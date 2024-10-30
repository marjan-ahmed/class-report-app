"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState();

  useEffect(() => {
    setTheme('light')
  })
  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          {/* <MonthSelection selectedMonth={setSelectedMonth} /> */}

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
