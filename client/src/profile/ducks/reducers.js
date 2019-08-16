import types from './types';
import { default as commonTypes } from '../../app/ducks/types';

const initialState = {
    page: "form"
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.CHANGE_PROFILE_PAGE:{
        return {
            ...state,
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
    
export default profileReducer;