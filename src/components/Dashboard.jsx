import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import BarChart from './chart/MonthlyChart';
import ExpenseChart from './chart/ExpenseChart'
import Expenses from './Expenses'
import Logo from "/home/ganthan/Documents/projects/expense-tracker/src/assets/Expense_Metre.png" 

const MonthlyCard=({budgets})=>{
    let date=new Date();
    let month=date.getMonth();

    return(
        <div className='MonthlyCard'>
            <h1>Monthly expense</h1>
            <h1>Rs.{budgets[month]}</h1>
        </div>
    )
}

const TotalExpenses=({expenses})=>{
    let total=0;
    expenses.forEach(element => {
        total+=Number(element.amount);
    });

    return(
        <div className='TotalExpenses'>
            <h1>Total Expenses</h1>
            <h1>Rs.{total}</h1>
        </div>
    )
}
const YearlyCard=({budgets})=>{
    let total=0;
    budgets.forEach(element => {
        total+=element;
    });

    return(
        <div className='YearlyCard'>
            <h1>Yearly Budget</h1>
            <h1>Rs.{total}</h1>
        </div>
    )
}

function Dashboard() {
    const location = useLocation();
    const navigate=useNavigate()
    const serverData = location.state?.data;
    if(serverData==undefined){
        serverData={ data: { budgets: [], expenses: [] } }
    }
    
    const navigateToBudget=()=>{
        navigate('/budgets',{state:{id:serverData.data.user_id}})
    }
    return (
        <div className='dashboard'>
            <div className="dashboard-body">
                <div className='dashboard-header'>
                    <img src={Logo} width={'160px'}/>
                    <button onClick={navigateToBudget}>Create budget</button>
                </div>
                <h1>Welcome {serverData.data.user_name}</h1>
                <div className="cards">
                    <MonthlyCard budgets={serverData.data.budget}/>
                    <YearlyCard budgets={serverData.data.budget}/>
                    <TotalExpenses expenses={serverData.data.expenses}/>
                </div>
                <div className="dashboard-chart">
                    <div className='monthly-chart'>
                        <h2>Budget Report</h2>
                        <BarChart budget={serverData.data.budget}/>
                    </div>
                    <div className='expense-chart'>
                        <h2>Expense Report</h2>
                        <ExpenseChart expenses={serverData.data.expenses}/>
                    </div>
                </div>
                <Expenses data={serverData.data}/>
            </div>
        </div>
    )
}

export default Dashboard;