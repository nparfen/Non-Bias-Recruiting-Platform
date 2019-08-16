import { all } from "redux-saga/effects";

import { loginFlow, loginLinkedinFlow } from '../../../login/ducks/sagas';

import { registerFlow, signUpLinkedinFlow } from '../../../signup/ducks/sagas';

// import { passwordResetFlow } from '../../../password-reset/ducks/sagas';

import { getMeFlow, setProfileFlow } from '../../../profile/ducks/sagas';

// import { changeSettingsFlow } from '../../../settings/ducks/sagas';

import { createJobFlow } from '../../../jobs/create/ducks/sagas';

import { getJobsFlow } from '../../../jobs/ducks/sagas';

import { getCandidatesFlow } from '../../../candidates/ducks/sagas';

import { setAssessmentFlow, clearAssessmentFlow } from '../../../assessment/ducks/sagas';

import { logoutFlow } from './logout';

import { authFlow } from './auth';

export function* rootSaga() {
    yield all([
        authFlow(),
        loginFlow(),
        loginLinkedinFlow(),
        registerFlow(),
        signUpLinkedinFlow(),
        // passwordResetFlow(),
        logoutFlow(),
        // changeSettingsFlow(),
        getMeFlow(),
        setProfileFlow(),
        createJobFlow(),
        getJobsFlow(),
        getCandidatesFlow(),
        setAssessmentFlow(),
        clearAssessmentFlow()
    ])
}