import { /*call, */put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';

import types from './types';

import { toast } from 'react-toastify';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* changeSettingsFlow(){
    while (true) {

        let { formId } = yield take(types.CHANGE_SETTINGS_REQUEST)

        yield put(startSubmit(formId))

        try {

            yield delay(2000)
            yield put(reset(formId))

            toast.success("Settings were changed");
            yield put(stopSubmit(formId))
        } catch (error) {
            toast.error(error.message);
            yield put(stopSubmit(formId))
        }
    }
}

export {
    changeSettingsFlow
}