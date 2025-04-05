import "./components.css";
import React, { useEffect, useState } from "react";
import { categoryList, monthsName, colors } from "../constants";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from "@mui/material";

function UserPrefChart({ data }) {
  const [year, setYear] = useState(null); // State to store the selected year
  const [month, setMonth] = useState(null); // State to store the selected month
  const [pieDataSelect, setPieDataSelect] = useState([]); // State to store the pie chart data

  useEffect(() => {
    if (data.length > 0 && year && month) {
      // Filter data by selected year and month
      const filteredData = data.filter((item) => {
        const itemYear = new Date(item.date).getFullYear();
        const itemMonth = new Date(item.date).getMonth();
        return itemYear === year && itemMonth === month - 1;
      });

      // Calculate the total cost per category
      const totalsSelect = categoryList.map((_, index) => {
        return filteredData
          .filter((item) => Number(item.category) === index)
          .reduce((total, item) => total + Number(item.cost), 0);
      });

      // Build the pie chart data
      setPieDataSelect(
        categoryList.map((category, index) => ({
          id: index,
          label: category,
          value: totalsSelect[index],
          color: colors[index], // Attach the corresponding color
        }))
      );
    } else {
      setPieDataSelect([]); // Clear the pie chart data if conditions are not met
    }
  }, [data, year, month]); // Re-run the effect when data, year, or month changes

  // Determine available months based on the selected year
  const availableMonths = year
    ? [
        ...new Set(
          data
            .filter((item) => new Date(item.date).getFullYear() === year)
            .map((item) => new Date(item.date).getMonth() + 1)
        ),
      ]
    : [];

  return (
    <Paper sx={{ height: "100%", maxWidth: 650 }}>
      <FormControl fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={year || ""}
          label="Year"
          onChange={(e) => {
            setYear(e.target.value); // Update the selected year
            setMonth(null); // Reset the selected month
          }}
        >
          {[
            ...new Set(data.map((item) => new Date(item.date).getFullYear())),
          ].map((uniqueYear) => (
            <MenuItem key={uniqueYear} value={uniqueYear}>
              {uniqueYear}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={month || ""}
          label="Month"
          onChange={(e) => setMonth(e.target.value)} // Update the selected month
          disabled={!year} // Disable the month selection if no year is selected
        >
          {availableMonths.map((uniqueMonth) => (
            <MenuItem key={uniqueMonth} value={uniqueMonth}>
              {monthsName[uniqueMonth - 1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="pieChart">
        <PieChart
          series={[{ data: pieDataSelect }]} // Pass the pie chart data
          height={300}
          width={500}
          seriesType="pie"
        />
      </div>
    </Paper>
  );
}

export default UserPrefChart;
