import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { renderCategories, monthConvert } from '../../helpers';
import { cancelButton, submitButton } from '../../helpers/buttons';
import { submitExpense } from '../../actions';
import './ExpenseForm.css';

function ExpenseForm(props) {
    const today = new Date().toISOString().split('T')[0];
    const [name, setName] = useState(null);
    const [cost, setCost] = useState(null);
    const [category, setCategory] = useState(null);
    const [date, setDate] = useState(today);
    const data = {
        item_name: name,
        cost,
        date_added: date,
        category,
        budget_month: monthConvert(Number.parseInt(date.slice(5, 7)) - 1),
        budget_year: date.slice(0,4)
    }
    const history = useNavigate();

    const validateDate = (date) => {
        if (parseFloat(date.split('-')[0]) !== props.year) {
            return false;
        }
        if (monthConvert(parseFloat(date.split('-')[1]) - 1) !== props.month) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateDate(data.date_added)) {
            props.submitExpense(data, history);
        } else {
            alert('Please choose a date for the current budget month and year.');
        }
    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    return (
        <div className="expense-form-container">
            <div className="expense-greeting">
                <h2>Let's add an expense!</h2>
                <h3>Please enter the name, cost, category, and date of the expense</h3>
            </div>
            <form
                className="expense-form"
                onSubmit={e => handleSubmit(e)}
                onKeyPress={e => handleKeyPress(e)}
            >
                <div className="expense-name">
                    <label>Expense Name</label>
                    <input type="text" onChange={e => setName(e.target.value)} required />
                </div>
                <div className="cost">
                    <label>Cost</label>
                    <input type="number" step="0.01" min="0.01" onChange={e => setCost(e.target.value)} required />
                </div>
                <div className="category">
                    <label>Category</label>
                    <select onChange={e => setCategory(e.target.value)} required>
                        <option></option>
                        {renderCategories()}
                    </select>
                </div>
                <div className="date">
                    <label>Date of Expense</label>
                    <input
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="buttons">
                    {cancelButton()} 
                    {submitButton('Add Expense')}
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

export default connect(mapStateToProps, { submitExpense })(ExpenseForm);