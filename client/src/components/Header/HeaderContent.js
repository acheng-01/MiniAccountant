import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBudget, fetchExpenses, setMonth, setYear } from '../../actions'
import { monthConvert, renderMonths, renderYears } from '../../helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

function HeaderContent(props) {
    const today = new Date();
    const currentMonth = monthConvert(today.getMonth());
    const currentYear = today.getFullYear();
    const location = useLocation()

    useEffect(() => {
        if (props.month.length === 0 || props.year.length === 0) {
            props.setMonth(currentMonth);
            props.setYear(parseFloat(currentYear));
        }
        props.fetchBudget(props.month, props.year)
        props.fetchExpenses(props.month, props.year)
    }, [props.month, props.year])

    const altArea = () => {
        return (
            <div className="budget-change-container">
                <p>View another month's expenses</p>
                <form className="other-budget">
                    <select id="month" value={props.month} onChange={e => props.setMonth(e.target.value)}>
                        {renderMonths()}
                    </select>
                    <select id="year" value={props.year} onChange={e => props.setYear(e.target.value)}>
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
                    <h2>{props.month} goal:</h2>
                    <h3>${parseFloat(props.budget.goal_amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                </li>
                <li key="2" className="notification-actual">
                    <h2>{props.month} actual expenses:</h2>
                    <h3>${(props.expenses.reduce((value, obj) => value + parseFloat(obj.cost), 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
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
        expenses: state.expenses,
        month: state.month,
        year: state.year
    };
};

export default connect(mapStateToProps, { fetchBudget, fetchExpenses, setMonth, setYear })(HeaderContent);