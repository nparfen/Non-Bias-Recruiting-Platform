import types from '../types';

const initialState = {
    id: null,
    role: null,
    data: null,
    isLoading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.GET_ME_LOADING:{
        return {
            ...state,
            isLoading: true
        }
    }
    case types.GET_ME_SUCCESS:{
        return {
            role: action.role,
            id: action.id,
            data: action.data,
            isLoading: false
        }
    }
    case types.GET_ME_FAILURE:{
        return {
            ...state,
            isLoading: false
        }
    }
    case types.RESET_DATA:{
        return {
            id: null,
            role: null,
            data: null,
            isLoading: false
        };
    }
    default:
        return state;
    }
}
    
export default userReducer