import { call, put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';
import axios from "axios";

import { default as commonTypes } from '../../app/ducks/types';
import types from './types.js';

import { toast } from 'react-toastify';

const login = (email, password, role) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL+"/login",
        data: {
            email: email,
            pwd: password,
            role: role
        }
    });
}

function* loginFlow() {
    while (true) {
        let { formId, email, password, role } = yield take(types.LOGIN_REQUEST)
        yield put(startSubmit(formId))
        try {
            const loginResult = yield call(login, email, password, role);
            const token = loginResult.headers.authorization;
            yield put({type: commonTypes.AUTH_REQUEST, token: token})
            yield put(reset(formId))
            yield put(stopSubmit(formId))
        } catch (error) {
            toast.error(error.response.data.message);
            yield put(stopSubmit(formId)) 
        }
    }
}


function* loginLinkedinFlow() {
    while (true) {
        let { token, formId } = yield take(types.LINKEDIN_LOGIN_REQUEST)
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
    loginFlow,
    loginLinkedinFlow
}