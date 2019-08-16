import types from './types';
import { default as commonTypes } from '../../../app/ducks/types';

const initialState = {
    page: "form"
}

const createJobReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.CHANGE_CREATEJOB_PAGE:{
        return {
            page: action.page
        }
    }
    case commonTypes.RESET_DATA:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default createJobReducer;