import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExpense } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../styling/ExpenseList.css';

function ExpenseList(props) {
    const handleClickDelete = (id, e) => {
        e.preventDefault();
        props.deleteExpense(id)
    }

    const renderContent = props.expenses.reverse().map(({ id, item_name, cost, category, date_added }) => {
        return (
            <div className="expense_item" key={id}>
                <ul className="expense_information">
                    <li>{item_name}</li>
                    <li>${parseFloat(cost).toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                    <li>{category}</li>
                    <li>{date_added.split('T')[0]}</li>
                </ul>
                <div className="expense-list-btns">
                    <Link to={`/editexpense/${id}`}>
                        <button className="edit-button" data-tip data-for="edit">
                            <FontAwesomeIcon icon={faFilePen} />
                            <ReactTooltip place="top" id="edit" effect="solid">Edit</ReactTooltip>
                        </button>
                    </Link>
                    <button
                        className="delete-button"
                        type="button"
                        onClick={(e) => handleClickDelete(id, e)}
                        data-tip
                        data-for="delete"
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <ReactTooltip place="top" id="delete" effect="solid">Delete</ReactTooltip>
                    </button>
                </div>
            </div>
        )
    });

    return (
        <div className="expense-items-container">
            {renderContent}
        </div>
    );
}

function mapStateToProps({ expenses }) {
    return { expenses };
}

export default connect(mapStateToProps, { deleteExpense })(ExpenseList);