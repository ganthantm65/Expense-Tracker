import React from 'react'
import Login from '/home/ganthan/Documents/projects/expense-tracker/src/components/Login.jsx';
import { Route,Routes } from 'react-router-dom';
import Dashboard from '/home/ganthan/Documents/projects/expense-tracker/src/components/Dashboard.jsx';
import Budgets from '../components/Budgets';
import Register from '../components/Register';

function Link_Router() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/budgets' element={<Budgets/>}></Route>
          <Route path='/signup' element={<Register/>}></Route>
        </Routes>
      </div>
  )
}

export default Link_Router