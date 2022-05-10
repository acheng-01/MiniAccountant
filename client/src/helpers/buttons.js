import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './buttons.css'

export const cancelButton = () => {
    return (
        <Link to="/dashboard" className="return-button">
            <button>
                Cancel
            </button>
        </Link>
    )
}

export const submitButton = (label) => {
    return (
        <button className="add-button" type="submit">
            {label}
        </button>
    )
}

export const newExpenseButton = () => {
    return (
        <Link to="/newexpense" className="add-expense-btn">
            <button>
                <span><FontAwesomeIcon icon={faPlus} /></span>
                Add New Expense 
            </button>
        </Link> 
    )
}