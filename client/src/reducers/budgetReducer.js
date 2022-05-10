import { FETCH_BUDGET } from '../actions/types';

const initialState = {
    goal_amount: 0
}

const budgetReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BUDGET:
            return action.payload || initialState;
        default:
            return state;
    }
};

export default budgetReducer;