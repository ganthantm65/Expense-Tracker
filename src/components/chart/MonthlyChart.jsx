import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components needed for a bar chart
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({budget}) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Budget',
        data: budget,
        backgroundColor: 'rgb(37, 129, 250)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Budget Data',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return(
    <div className='MonthlyChart'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
