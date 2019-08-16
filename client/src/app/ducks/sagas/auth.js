import { put, take } from "redux-saga/effects";

import { default as commonTypes } from '../types';

import { toast } from 'react-toastify';

function* authFlow(){
    while (true) {
        const { token } = yield take(commonTypes.AUTH_REQUEST);
        try {
            yield put({type: commonTypes.AUTH_SUCCESS, token: token})
            localStorage.setItem('token', token);
            yield put({type: commonTypes.GET_ME_REQUEST})
        } catch (error) {
            toast.error(error.response.data.message);
            yield put({type: commonTypes.AUTH_FAILURE})
        }
    }
}

export {
    authFlow
};