import React, { useState } from "react";
import "/home/ganthan/Documents/projects/expense-tracker/src/App.css";
import { useLocation } from "react-router-dom";
import { Position, Toaster } from "@blueprintjs/core";

let toaster=Toaster.create({
  position:Position.TOP
})
const MonthlyBudget = () => {
  const [budgets, setBudgets] = useState(new Array(12).fill(0));

  const location=useLocation()
  const id=location.state.id;

  const handleBudgetChange = (e, index) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index] = parseInt(e.target.value) || 0;
    setBudgets(updatedBudgets);
  };
  console.log(id);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response=await fetch('http://localhost/expense/budget',{
          method:'POST',
          header:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id:id,
            budget:budgets
          })
      })

      const data=await response.json()

      if(data.success){
          toaster.show({
              message:data.message,
              intent:'success'
          })
      }else{
          toaster.show({
              message:data.message,
              intent:'danger'
          })
      }
  } catch (error) {
      toaster.show({
          message:error,
          intent:'danger'
      })
  }
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="budget-container">
      <h2 className="title">Monthly Budget Tracker</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        {months.map((month, index) => (
          <div key={index} className="input-group">
            <label htmlFor={`month-${index}`}>
              {month}:
            </label>
            <input
              type="number"
              id={`month-${index}`}
              value={budgets[index]}
              onChange={(e) => handleBudgetChange(e, index)}
              placeholder={`Enter budget for ${month}`}
            />
          </div>
        ))}
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit Budgets
        </button>
      </form>
    </div>
  );
};

export default MonthlyBudget;
