import React, { useState } from 'react';
import { EditableText, Button, Toaster } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import '/home/ganthan/Documents/projects/expense-tracker/src/App.css';

const toaster = Toaster.create();

function Expenses({ data }) {
  const [dailyExpenses, setExpenses] = useState(data.expenses);
  const [expenseID, setExpenseID] = useState(0);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setExpenseID('');
    setDate('');
    setDescription('');
  };

  const onAdd = (userId) => {
    if(expenseID!=0 && category!='' && amount!=0 && date!='' && description!=''){
      const newExpense = { id: expenseID, amount: amount, category: category, description: description, date: date };
      setExpenses([...dailyExpenses, newExpense]);
      addExpense(newExpense, userId);
      resetForm();
    }else{
      toaster.show({
        message:'give valid data',
        intent:'warning'
      })
    }
  };

  const onUpdate = (id, field, value) => {
    const updatedExpenses = dailyExpenses.map((expense) =>
      expense.id === id ? { ...expense, [field]: value } : expense
    );
    setExpenses(updatedExpenses);
  };

  const onDelete = (id,userId) => {
    const updatedExpenses = dailyExpenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);  
    deleteExpense(updatedExpenses,userId)
  };

  const addExpense = async (expense, userId) => {
    try {
      const uri = `http://localhost/expense/${userId}`;
      const options = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'add',
          data: JSON.stringify(expense),
        }),
      };

      const response = await fetch(uri, options);
      if (!response.ok) throw new Error('Error in server');

      const data = await response.json();
      toaster.show({ message: data.message, intent: 'success' });
    } catch (error) {
      
    }
  };

  const updateExpense = async (updatedExpenses, userId) => {
    try {
      const uri = `http://localhost/expense/${userId}`;
      const options = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'update',
          data: updatedExpenses,
        }),
      };
  
      const response = await fetch(uri, options);
      if (!response.ok) throw new Error('Error in server');
  
      const data = await response.json();
      toaster.show({ message: data.message, intent: 'success' });
    } catch (error) {
      toaster.show({ message: error.message || "An error occurred", intent: 'danger' });
    }
  };  

  const deleteExpense = async (expenses, userId) => {
    try {
      const uri = `http://localhost/expense/${userId}`;
      const options = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'delete',
          data: expenses,
        }),
      };

      const response = await fetch(uri, options);
      if (!response.ok) throw new Error('Error in server');

      toaster.show({ message: 'Deleted successfully', intent: 'danger' });
    } catch (error) {
      toaster.show({ message: error.message || "An error occurred", intent: 'danger' });
    }
  };

  return (
    <div className="Expenses">
      <h1>Your Expenses</h1>
      <table id="expense_table" className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Categories</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dailyExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.category}</td>
              <td>
                <EditableText
                  value={expense.amount.toString()}
                  onChange={(value) => onUpdate(expense.id, 'amount', Number(value))}
                />
              </td>
              <td>
                <EditableText
                  value={expense.description}
                  onChange={(value) => onUpdate(expense.id, 'description', value)}
                />
              </td>
              <td>
                <EditableText
                  value={expense.date}
                  onChange={(value) => onUpdate(expense.id, 'date', value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={() => updateExpense(dailyExpenses, data.user_id)}>Update</Button>
                <Button intent="danger" onClick={() => {
                  onDelete(expense.id,data.user_id);
                }}>
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="number"
                value={expenseID}
                id="expense-form-id"
                placeholder="Enter expense id"
                onChange={(event) => setExpenseID(Number(event.target.value))}
              />
            </td>
            <td>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="">--Select-category--</option>
                <option>Food</option>
                <option>Medicine</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Transport</option>
                <option>Others</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                value={amount}
                id="expense-form-amount"
                placeholder="Enter the amount you have spent"
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </td>
            <td>
              <input
                type="text"
                value={description}
                id="expense-form-description"
                placeholder="Enter description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                value={date}
                id="expense-form-date"
                onChange={(event) => setDate(event.target.value)}
              />
            </td>
            <td>
              <Button intent="primary" onClick={() => onAdd(data.user_id)}>Add</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
