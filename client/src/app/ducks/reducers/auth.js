import types from '../types';

const initialState = {
    token: null,
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.AUTH_SUCCESS:{
        return {
            token: action.token,
            isAuthenticated: true
        }
    }
    case types.AUTH_FAILURE:{
        return {
            token: null,
            isAuthenticated: false
        }
    }
    case types.RESET_DATA:{
        return {
            token: null,
            isAuthenticated: false
        };
    }
    default:
        return state;
    }
}
    
export default authReducer