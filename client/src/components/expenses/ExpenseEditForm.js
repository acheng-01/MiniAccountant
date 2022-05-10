import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateExpense } from '../../actions';
import { renderCategories, monthConvert } from '../../helpers';
import { cancelButton, submitButton } from '../../helpers/buttons';

function ExpenseEditForm(props) {
    const { expenseId } = useParams()
    const { item_name, cost, date_added, category } = props.expenses.filter(expense => expense.id === parseFloat(expenseId))[0];
    const [item, setItem] = useState(item_name);
    const [oldCost, setCost] = useState(cost);
    const [oldCategory, setCategory] = useState(category);
    const [date, setDate] = useState(date_added.split('T')[0]);
    const fixedDate = date;

    const data = {
        item_name: item,
        cost: oldCost,
        date_added: date,
        category: oldCategory,
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

    const handleUpdate = (e) => {
        e.preventDefault();
        if (validateDate(data.date_added)) {
            props.updateExpense(expenseId, history, data);
        } else {
            alert('Please choose a date for the current budget month and year.')
        }
    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleUpdate(e);
        }
    }

    return (
        <div className="expense-form-container">
            <div className="expense-greeting">
                <h2>Let's make some changes for your expense on {fixedDate}</h2>
            </div>
            <form
                className="expense-form"
                onSubmit={e => handleUpdate(e)}
                onKeyPress={e => handleKeyPress(e)}
            >
                <div className="expense-name">
                    <label>Expense Name</label>
                    <input
                        type="text"
                        onChange={e => setItem(e.target.value)}
                        value={item}
                        required
                    />
                </div>
                <div className="cost">
                    <label>Cost</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        onChange={e => setCost(e.target.value)}
                        value={oldCost}
                        required
                    />
                </div>
                <div className="category">
                    <label>Category</label>
                    <select
                        onChange={e => setCategory(e.target.value)}
                        value={oldCategory}
                        required
                    >
                        <option></option>
                        {renderCategories()}
                    </select>
                </div>
                <div className="date">
                    <label>Date of Expense</label>
                    <input
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        value={date}
                        required
                    />
                </div>
                <div className="buttons">
                    {cancelButton()}
                    {submitButton('Update')}
                </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps, { updateExpense })(ExpenseEditForm)