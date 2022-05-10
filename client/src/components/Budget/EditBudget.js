import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelButton, submitButton } from '../../helpers/buttons';
import { validate } from '../../helpers';
import { updateBudget } from '../../actions'

function EditBudget(props) {
    const { id, goal_month, goal_year, goal_amount } = props.budget;
    const [amount, setAmount] = useState(goal_amount);
    const newData = {
        month: goal_month,
        year: goal_year,
        amount
    }
    const history = useNavigate();

    const handleUpdate = e => {
        e.preventDefault();
        props.updateBudget(id, history, newData)
    }

    return (
        <div className="new-budget-container">
            <div className="budget-greeting">
                <h2>Let's make some changes...</h2>
            </div>
            <form className="budget-form" onSubmit={e => handleUpdate(e)}>
                <div className="months-field">
                    <label>Month:</label>
                    <select disabled>
                        <option>{goal_month}</option>
                    </select>
                </div>
                <div className="years-field">
                    <label>Year:</label>
                    <select disabled>
                        <option>{goal_year}</option>
                    </select>
                </div>
                <div className="amount-field">
                    <label>Goal amount:</label>
                    <input type="number" step="0.01" min="0" onChange={e => setAmount(e.target.value)} value={amount} required />
                </div>
                <div className="buttons">
                    {cancelButton()}
                    {submitButton('Update Budget')}
                </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        budget: state.budget
    }
}

export default connect(mapStateToProps, { updateBudget })(EditBudget);

