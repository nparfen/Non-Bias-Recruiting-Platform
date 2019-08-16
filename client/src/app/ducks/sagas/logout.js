import { put, take } from "redux-saga/effects";
import { replace } from 'connected-react-router';

import types from '../types';

function* logoutFlow() {
    while (true) {

        yield take(types.LOGOUT_REQUEST)

        yield put({type: types.RESET_DATA})

        yield put(replace("/login"))

        localStorage.clear();
    }
}

export {
    logoutFlow
}