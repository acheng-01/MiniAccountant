import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelButton, submitButton } from '../../helpers/buttons';
import { submitBudget } from '../../actions';
import { connect } from 'react-redux';
import '../styling/BudgetForm.css';

function BudgetForm(props) {
    const [amount, setAmount] = useState(null);
    const data = {
        month: props.month,
        year: props.year,
        amount
    };
    
    const history = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        props.submitBudget(data, history);
    }

    return (
        <div className="new-budget-container">
            <div className="budget-greeting">
                <h2>Let's create a budget!</h2>
                <h3>Please enter the month, year, and amount this budget is for</h3>
            </div>
            <form className="budget-form" onSubmit={e => handleSubmit(e)}>
                <div className="months-field">
                    <h4>Month:</h4>
                    <h4>{props.month}</h4>
                </div>
                <div className="years-field">
                    <h4>Year:</h4>
                    <h4>{props.year}</h4>
                </div>
                <div className="amount-field">
                    <label>Enter goal amount:</label>
                    <input type="number" step="0.01" min="0.01" onChange={e => setAmount(e.target.value)} required />
                </div>
                <div className="buttons">
                    {cancelButton()}
                    {submitButton('Submit')}
                </div>
            </form>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        month: state.month,
        year: state.year
    }
}

export default connect(mapStateToProps, { submitBudget })(BudgetForm);