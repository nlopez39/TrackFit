import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

const DonutChart = ({ consumedCalories, remainingCalories }) => {

  const exceededCalories = Math.max(0, consumedCalories - 2000);
  // Calculate the actual remaining calories considering the maximum limit
  const actualRemainingCalories = Math.min(2000, remainingCalories + exceededCalories);
  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        label:"Calorie Chart",
        data: [actualRemainingCalories,consumedCalories],
        backgroundColor: ["#06b6d4", "#343A40"],
        hoverBackgroundColor: ["#0B4F6C", "#D5A021"],
      },
    ],
  };

  
  const options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Avg interest by month (days)",
        padding: {
          bottom: 30
        },
        weight: "bold",
        color: "#00325c",
        font: {
          size: 50
        },
        align: "start"
      },
      datalabels: {
        display: true,
        color: "white",
        fontSize: 25,
      }
    }
  };
     


  return <Doughnut data={data} plugins={[ChartDataLabels]} options={options} />;
};

export default DonutChart;