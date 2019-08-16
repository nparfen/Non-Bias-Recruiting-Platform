import { call, select, put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { replace } from 'connected-react-router';
import axios from "axios";

import types from './types';

import { toast } from 'react-toastify';

const create = (token, status, data) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL+"/jobs/create",
        headers: {
            'authorization': token
        },
        data: {
            status,
            data: {
                ...data
            }
        }
    });
}

function* createJobFlow(){
    while (true) {
        let { status, data: { ...data}, formId } = yield take(types.CREATE_JOB_REQUEST);
        yield put(startSubmit(formId));
        try {
            const state = yield select();
            yield call(create, state.auth.token, status, data);
            yield put(reset(formId))
            yield put(stopSubmit(formId));
            yield put(replace("/jobs"))
        } catch (error) {
            toast.error(error.response.data.message);
            yield put(stopSubmit(formId));
        }
    }
}

export {
    createJobFlow
};