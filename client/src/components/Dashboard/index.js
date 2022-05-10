import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newExpenseButton } from '../../helpers/buttons';
import { fetchExpenses } from '../../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ExpenseList from '../expenses/ExpenseList';
import DataChart from '../expenses/DataChart';

import './Dashboard.css';

function Dashboard(props) {
    const renderContent = () => {
        if (props.budget.goal_amount) {
            if (props.expenses.length !== 0) {
                return (
                    <div className="expense-display">
                        <div className="sub-greeting">
                            <h3>Here are your expenses for {props.budget.goal_month} {props.budget.goal_year}</h3>
                        </div>
                        <ul className="expense-labels">
                            <li>Item</li>
                            <li>Cost</li>
                            <li>Category</li>
                            <li>Date of Expense</li>
                            <li className="placeholder"></li>
                        </ul>
                        <ExpenseList />
                        <div className='add-expense'>
                            {newExpenseButton()}
                        </div>
                        <div className="chart-container">
                            <DataChart />
                        </div>
                    </div>
                )
            }
            return (
                <div className="expense-display">
                    <div className="sub-greeting">
                        <h3>You don't seem to have any expenses for this month yet...</h3>
                    </div>
                    <div className="add-expense">
                        {newExpenseButton()}
                    </div>
                </div>
            )
        }

        return (
            <div className="expense-display">
                <div className="sub-greeting">
                    <h3>There isn't a budget goal created for this month yet...</h3>
                </div>
                <div className="add-budget">
                    <Link to="/newbudget">
                        <button>
                            <span><FontAwesomeIcon icon={faPlus} /></span>
                            Create A Budget
                        </button>
                    </Link> 
                </div>
            </div>
        )
    }

    return(
        <div className="expenses-container">
            <div className="greeting">
                <h2>Hello {props.auth?.first_name}!</h2>
            </div>
            {renderContent()}
        </div>
    )
};

function mapStateToProps({ auth, expenses, budget }) {
    return { auth, expenses, budget };
}

export default connect(mapStateToProps, { fetchExpenses })(Dashboard);