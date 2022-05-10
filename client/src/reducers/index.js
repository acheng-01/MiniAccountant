import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import budgetReducer from './budgetReducer';
import monthReducer from './monthReducer';
import yearReducer from './yearReducer';

export default combineReducers({
    auth: authReducer,
    expenses: expenseReducer,
    budget: budgetReducer,
    month: monthReducer,
    year: yearReducer
});