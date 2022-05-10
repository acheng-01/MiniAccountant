import axios from 'axios';
import { FETCH_USER, FETCH_EXPENSES, FETCH_BUDGET, ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBudget = (month, year) => async dispatch => {
    const res = await axios.get(`/api/budget/${month}-${year}`)

    dispatch({ type: FETCH_BUDGET, payload: res.data })
}

export const submitBudget = (values, history) => async dispatch => {
    const res = await axios.post('/api/budget', values);
    
    history('/dashboard');
    dispatch({ type: FETCH_BUDGET, payload: res.data });
}

export const updateBudget = (id, history, newData) => async dispatch => {
    const res = await axios.patch(`/api/budget/${id}`, newData);

    history('/dashboard')
    dispatch({ type: FETCH_BUDGET, payload: res.data });
}

export const fetchExpenses = (month, year) => async dispatch => {
    const res = await axios.get(`/api/expenses/${month}-${year}`)

    dispatch({ type: FETCH_EXPENSES, payload: res.data });
}

export const submitExpense = (values, history) => async dispatch => {
    const res = await axios.post('/api/expenses', values);

    history('/dashboard')
    dispatch({ type: ADD_EXPENSE, payload: res.data });
};

export const updateExpense = (id, history, newData) => async dispatch => {
    const res = await axios.patch(`/api/expenses/${id}`, newData);

    history('/dashboard')
    dispatch({ type: UPDATE_EXPENSE, payload: res.data });
}

export const deleteExpense = (id) => async dispatch => {
    await axios.delete(`/api/expenses/${id}`);

    dispatch({ type: DELETE_EXPENSE, payload: id });
}