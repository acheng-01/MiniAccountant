import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import budgetReducer from './budgetReducer';

export default combineReducers({
    auth: authReducer,
    expenses: expenseReducer,
    budget: budgetReducer
});