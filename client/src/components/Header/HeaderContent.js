import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBudget, fetchExpenses } from '../../actions'
import { monthConvert, renderMonths, renderYears } from '../../helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

function HeaderContent(props) {
    const today = new Date();
    const currentMonth = monthConvert(today.getMonth());
    const currentYear = today.getFullYear();
    const [monthToView, setMonth] = useState(currentMonth);
    const [yearToView, setYear] = useState(currentYear);
    const location = useLocation()

    useEffect(() => {
        props.fetchBudget(monthToView, yearToView)
        props.fetchExpenses(monthToView, yearToView)
    }, [monthToView, yearToView])

    const altArea = () => {
        return (
            <div className="budget-change-container">
                <p>View another month's expenses</p>
                <form className="other-budget">
                    <select id="month" value={monthToView} onChange={e => setMonth(e.target.value)}>
                        {renderMonths()}
                    </select>
                    <select id="year" value={yearToView} onChange={e => setYear(e.target.value)}>
                        {renderYears()}
                    </select>
                </form>
                <Link to={`/editbudget/${props.budget.id}`} data-tip data-for="edit-budget">
                    <button className="edit-budget">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        <ReactTooltip place="bottom" id="edit-budget" effect="solid">Edit Budget</ReactTooltip>
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="right-container">
            <ul className="right">
                <li key="1" className="notification-goal">
                    <h2>{monthToView} goal:</h2>
                    <h3>${parseFloat(props.budget.goal_amount).toFixed(2)}</h3>
                </li>
                <li key="2" className="notification-actual">
                    <h2>{monthToView} actual expenses:</h2>
                    <h3>${(props.expenses.reduce((value, obj) => value + parseFloat(obj.cost), 0)).toFixed(2)}</h3>
                </li>
                <li key="3" className="logout-button">
                    <button>
                        <a href="/api/logout">
                            Log out
                        </a>
                    </button>
                </li>
            </ul>
            {location.pathname === '/dashboard' && altArea()}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        budget: state.budget,
        expenses: state.expenses
    };
};

export default connect(mapStateToProps, { fetchBudget, fetchExpenses })(HeaderContent);