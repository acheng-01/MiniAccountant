import { ADD_EXPENSE, DELETE_EXPENSE, FETCH_EXPENSES, UPDATE_EXPENSE } from "../actions/types";

const expenseReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_EXPENSES:
            return action.payload;
        case ADD_EXPENSE:
            return [...state, action.payload];
        case DELETE_EXPENSE:
            return state.filter(item => item.id !== action.payload);
        case UPDATE_EXPENSE:
            const index = state.findIndex(element => element.id === action.payload.id)
            state[index] = action.payload;
            return [...state]
        default:
            return state;
    }
};

export default expenseReducer;