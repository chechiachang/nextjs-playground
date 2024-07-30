"use client"

import React, { useState } from 'react'
import { Chart } from 'react-google-charts'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"


export default function Page() {
  const now = new Date()
  const [startDate, setStartDate] = useState(now)
  const dateStr = startDate.toISOString().split('T')[0]

  function fetchCsv(dateStr, setData) {
    fetch("https://raw.githubusercontent.com/chechiachang/sc-stat-data/main/yilan/gym/" + dateStr  + ".csv")
      .then(res => res.text())
      .then(rowstr => rowstr.split('\n'))
      .then(row => row.map(row => {
          var columns = row.split(',')
          return [
            new Date(parseInt(Date.parse(columns[0]))), 
            parseInt(columns[2])
          ]
        }
      ))
      .then(setData)
  }

  // fetch csv data
  const [data, setData] = useState(null)
  fetchCsv(dateStr, setData)
  fetch("https://raw.githubusercontent.com/chechiachang/sc-stat-data/main/yilan/gym/2024-7-29.csv")
  //fetch("https://raw.githubusercontent.com/chechiachang/sc-stat-data/main/yilan/gym/" + dateStr + ".csv")
    .then(res => res.text())
    .then(rowstr => rowstr.split('\n'))
    .then(row => row.map(row => {
        var columns = row.split(',')
        return [
          new Date(parseInt(Date.parse(columns[0]))), 
          parseInt(columns[2])
        ]
      }
    ))
    .then(setData)
  //const csvText: string = res.text()

  //const title: string[][] = [["datetime", "name", "number", "capacity"]]
  //const title = [["datetime", "number"]]
  const title = [
    [
      { type: "date", label: "x" },
      { type: "number", label: "values" }
    ]
  ]

  //var rowstrs: string[] = csvText.split('\n')
  //rowstrs.pop() // pop last empty element

  //var data = rowstrs.map(row => {
  //    var columns = row.split(',')
  //    return [
  //      new Date(parseInt(Date.parse(columns[0]))), 
  //      parseInt(columns[2])
  //    ]
  //  }
  //)

  const odata = title.concat(data)

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: "none",
  };

  return (
    <main>
    <div style={{ padding: "16px", background: "#216ba5", color: "#fff",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' }}>
      <p></p>
      <DatePicker 
        showIcon
        toggleCalendarOnIconClick
        selected={startDate} 
        onChange={(date: Date) => {
            setStartDate(date)
            if (date.getDate() != startDate.getDate()) {
              fetchCsv(date.toISOString().split('T')[0])
            }
          } 
        }
        showTimeSelect
        dateFormat="yyyy-MM-dd"
      />
      <p></p>
    </div>
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={odata}
        options={options}
      />
    </div>
    </main>
  )
}
