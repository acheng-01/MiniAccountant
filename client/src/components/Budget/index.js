import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { renderMonths, renderYears, validate } from '../../helpers';
import { cancelButton, submitButton } from '../../helpers/buttons';
import { submitBudget } from '../../actions';
import { connect } from 'react-redux';
import './BudgetForm.css';

function BudgetForm(props) {
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [amount, setAmount] = useState(null);
    const data = { month, year, amount };
    
    const history = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (validate(data.amount)) {
            data.amount = Math.round(parseFloat(data.amount) * 100) / 100;
            props.submitBudget(data, history);
        }
    }

    return (
        <div className="new-budget-container">
            <div className="budget-greeting">
                <h2>Let's create a budget!</h2>
                <h3>Please enter the month, year, and amount this budget is for</h3>
            </div>
            <form className="budget-form" onSubmit={e => handleSubmit(e)}>
                <div className="months-field">
                    <label>Select Month:</label>
                    <select onChange={e => setMonth(e.target.value)} required>
                        <option></option>
                        {renderMonths()}
                    </select>
                </div>
                <div className="years-field">
                    <label>Select Year:</label>
                    <select onChange={e => setYear(e.target.value)} required>
                        <option></option>
                        {renderYears()}
                    </select>
                </div>
                <div className="amount-field">
                    <label>Enter goal amount:</label>
                    <input type="text" onChange={e => setAmount(e.target.value)} required />
                </div>
                <div className="buttons">
                    {cancelButton()}
                    {submitButton('Submit')}
                </div>
            </form>
        </div>
    )
};

export default connect(null, { submitBudget })(BudgetForm);