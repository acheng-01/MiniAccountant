import { SET_YEAR } from '../actions/types';

const yearReducer = (state = '', action) => {
    switch (action.type) {
        case (SET_YEAR):
            return action.payload;
        default:
            return state;
    }
}

export default yearReducer;