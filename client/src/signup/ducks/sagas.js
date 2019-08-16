import { call, put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { replace } from 'connected-react-router';
import axios from "axios";

import { default as commonTypes } from '../../app/ducks/types';
import types from './types';

import { toast } from 'react-toastify';

const register = (email, password, role, other) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL+"/register",
        data: {
            email: email,
            pwd: password,
            role: role,
            data: {
                ...other
            }
        }
    });
}

function* registerFlow() {
    while (true) {
        let { email, password, role, formId, other } = yield take(types.REGISTER_REQUEST)
        yield put(startSubmit(formId))
        try {
            const registerResult = yield call(register, email, password, role, ...other);
            const token = registerResult.headers.authorization;
            yield put({type: commonTypes.AUTH_REQUEST, token })
            yield put(reset(formId))
            yield put(stopSubmit(formId))
            yield put(replace("/assessment"))
        } catch (error) {
            toast.error(error.response.data.message);
            yield put(stopSubmit(formId)) 
        }
    }
}

function* signUpLinkedinFlow() {
    while (true) {
        let { token, formId } = yield take(types.LINKEDIN_SIGNUP_REQUEST)
        yield put(startSubmit(formId))
        try {
            yield put({type: commonTypes.AUTH_REQUEST, token: token})
            yield put(reset(formId))
            yield put(stopSubmit(formId))
        } catch (error) {
            toast.error(error.response.data.message);
            yield put(stopSubmit(formId)) 
        }
    }
}

export {
    registerFlow,
    signUpLinkedinFlow
}