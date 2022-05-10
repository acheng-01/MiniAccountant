import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BudgetForm from './Budget';
import EditBudget from './Budget/EditBudget';
import ExpenseForm from './expenses/ExpenseForm';
import ExpenseEditForm from './expenses/ExpenseEditForm';

function App(props) {
    useEffect(() => {
        props.fetchUser();
    }, []);

    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/newbudget" element={<BudgetForm />} />
                    <Route path="/editbudget/:budgetId" element={<EditBudget />} />
                    <Route path="/newexpense" element={<ExpenseForm />} />
                    <Route path="/editexpense/:expenseId" element={<ExpenseEditForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default connect(null, actions)(App);