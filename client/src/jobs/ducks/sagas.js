import { call, select, put, take } from "redux-saga/effects";
import axios from "axios";

import types from './types';

import { toast } from 'react-toastify';

const get = (token, page, status) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL+"/jobs/"+status+"/"+page,
        headers: {
            'authorization': token
        }
    });
}

function* getJobsFlow(){
    while (true) {
        let { page, status } = yield take(types.GET_JOBS_REQUEST);
        yield put({type: types.GET_JOBS_LOADING});
        try {
            const state = yield select();
            const data = yield call(get, state.auth.token, page, status);
            yield put({type: types.GET_JOBS_SUCCESS, data: data.data });
        } catch (error) {
            toast.error(error.response.data.message);
            yield put({type: types.GET_JOBS_FAILURE, error: error.response.data.message});
        }
    }
}

export {
    getJobsFlow
};