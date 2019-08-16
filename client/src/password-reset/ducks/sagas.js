import { /*call, */put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';

import types from './types';

import { toast } from 'react-toastify';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* passwordResetFlow(){
    while (true) {

        let { email, formId } = yield take(types.RESET_PASSWORD_REQUEST)
        
        yield put(startSubmit(formId))

        try {

            yield delay(2000)
           
            yield put(reset(formId))
            
            toast.success(`Description with instructions was sent to ${email}`);
            yield put(stopSubmit(formId))
        } catch (error) {
            toast.error(error.message);
            yield put(stopSubmit(formId))
        }
    }
}

export {
    passwordResetFlow
}