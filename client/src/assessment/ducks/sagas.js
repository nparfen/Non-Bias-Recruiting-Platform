import { call, select, put, take } from "redux-saga/effects";
import axios from "axios";

import { default as commonTypes } from '../../app/ducks/types';
import types from './types';

import { toast } from 'react-toastify';

const set = (token, assessment) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL+"/assessment",
        headers: {
            'authorization': token
        },
        data: {
            assessment
        }
    });
}

function* setAssessmentFlow(){
    while (true) {
        yield take(types.SAVE_ASSESSMENT_REQUEST);
        try {
            const state = yield select();
            let assessment = { 
                culture: state.assessment.culture, 
                personalities: state.assessment.personalities,
                values: state.assessment.values 
            }
            const assessmentResult = yield call(set, state.auth.token, assessment);
            yield put({
                type: commonTypes.GET_ME_SUCCESS,
                ...state.user,
                data: {
                    ...state.user.data,
                    assessment: {
                        ...state.user.data.assessment,
                        data: {
                            ...assessmentResult.data.data
                        }
                    }
                }
            })
            toast.success("🥳 Assessment is saved!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

function* clearAssessmentFlow(){
    while (true) {
        yield take(types.CLEAR_ASSESSMENT_REQUEST);
        try {
            const state = yield select();
            if(state.user.data.assessment) {    
                yield put({
                    type: types.CLEAR_ASSESSMENT,
                    culture: state.user.data.assessment.data.culture,
                    personalities: state.user.data.assessment.data.personalities,
                    values: state.user.data.assessment.data.values
                })
            } else {
                yield put({
                    type: types.CLEAR_ASSESSMENT,
                    culture: null,
                    personalities: null,
                    values: null
                })
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export {
    setAssessmentFlow,
    clearAssessmentFlow
};