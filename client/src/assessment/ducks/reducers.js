import types from './types';
import { default as commonTypes } from '../../app/ducks/types';

const initialState = {
    pages: {
        culture: 0,
        personalities: 0,
        values: 0
    },
    culture: null,
    personalities: null,
    values: null
}

const assessmentReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.SET_CULTURE_ASSESSMENT:{
        return {
            ...state,
            culture: action.culture
        }
    }
    case types.SET_PERSONALITIES_ASSESSMENT:{
        return {
            ...state,
            personalities: action.personalities
        }
    }
    case types.SET_VALUES_ASSESSMENT:{
        return {
            ...state,
            values: action.values
        }
    }
    case types.CHANGE_CULTURE_ASSESSMENT_PAGE:{
        return {
            ...state,
            pages: {
                ...state.pages,
                culture: action.page
            }
        }
    }
    case types.CHANGE_PERSONALITIES_ASSESSMENT_PAGE:{
        return {
            ...state,
            pages: {
                ...state.pages,
                personalities: action.page
            }
        }
    }
    case types.CHANGE_VALUES_ASSESSMENT_PAGE:{
        return {
            ...state,
            pages: {
                ...state.pages,
                values: action.page
            }
        }
    }
    case types.CLEAR_CULTURE_ASSESSMENT:{
        return {
            ...state,
            pages: {
                ...state.pages,
                culture:0
            },
            culture: initialState.culture
        }
    }
    case types.CLEAR_PERSONALITIES_ASSESSMENT:{
        return {
            ...state,
            pages: {
                ...state.pages,
                personalities:0
            },
            personalities: initialState.personalities
        }
    }
    case types.CLEAR_VALUES_ASSESSMENT:{
        return {
            ...state,
            pages: {
                ...state.pages,
                values:0
            },
            values: initialState.values
        }
    }
    case types.CLEAR_ASSESSMENT:{
        return {
            culture: action.culture,
            personalities: action.personalities,
            values: action.values,
            pages: {
                culture: 0,
                personalities: 0,
                values: 0
            },
        }
    }
    case commonTypes.RESET_DATA:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default assessmentReducer