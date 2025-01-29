import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function ExpenseChart({ expenses }) {
  const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
  const dates = sortedExpenses.map(expense => expense.date);
  const amounts = sortedExpenses.map(expense => parseFloat(expense.amount));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Expenses',
        data: amounts,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Amount (₹)' }, beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
}

export default ExpenseChart;
