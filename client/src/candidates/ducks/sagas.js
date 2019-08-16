import { call, select, put, take } from "redux-saga/effects";
import axios from "axios";

import types from './types';

import { toast } from 'react-toastify';

const get = (token, page) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL+"/candidates/"+page,
        headers: {
            'authorization': token
        }
    });
}

function* getCandidatesFlow(){
    while (true) {
        let { page } = yield take(types.GET_CANDIDATES_REQUEST);
        yield put({type: types.GET_CANDIDATES_LOADING});
        try {
            const state = yield select();
            const data = yield call(get, state.auth.token, page);
            yield put({type: types.GET_CANDIDATES_SUCCESS, data: data.data });
        } catch (error) {
            toast.error(error.response.data.message);
            yield put({type: types.GET_CANDIDATES_FAILURE, error: error.response.data.message});
        }
    }
}

export {
    getCandidatesFlow
};