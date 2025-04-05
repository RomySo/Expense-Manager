import "./components.css";
import React from "react";
import { categoryList, monthsName, colors } from "../constants";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper } from "@mui/material";

function ChartView({ data }) {
  // Prepare data for the PieChart
  const pieData = categoryList.map((category, index) => ({
    id: index,
    label: category,
    value: data
      .filter((item) => Number(item.category) === index)
      .reduce((total, item) => total + Number(item.cost), 0),
    color: colors[index],
  }));

  // Prepare data for the BarChart
  const monthlyData = data.reduce((acc, item) => {
    const month = new Date(item.date).getMonth();
    if (!acc[month]) {
      acc[month] = { month: month + 1, cost: 0 };
    }
    acc[month].cost += Number(item.cost);
    return acc;
  }, []);

  const monthlyCostList = Object.values(monthlyData);

  return (
    <Paper sx={{ height: "100%", width: "100%", maxWidth: 650 }}>
      <h1 className="chartTitle">Expenses by categories</h1>
      {/* Render PieChart with prepared data */}
      <PieChart series={[{ data: pieData }]} height={300} />
      <h1 className="chartTitle">Expenses over categories</h1>
      {/* Render BarChart with prepared data */}
      <BarChart
        series={[{ data: monthlyCostList.map((item) => item.cost) }]}
        height={300}
        xAxis={[
          {
            data: monthlyCostList.map((item) => monthsName[item.month - 1]),
            scaleType: "band",
          },
        ]}
      />
    </Paper>
  );
}

export default ChartView;
