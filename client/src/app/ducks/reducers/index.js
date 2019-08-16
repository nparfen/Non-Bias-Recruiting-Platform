import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import assessmentReducer from '../../../assessment/ducks/reducers';
import profileReducer from '../../../profile/ducks/reducers';
import createJobReducer from '../../../jobs/create/ducks/reducers';
import candidatesReducer from '../../../candidates/ducks/reducers';
import shortlistReducer from '../../../shortlist/ducks/reducers';
import jobsReducer from '../../../jobs/ducks/reducers';
import userReducer from './user';
import authReducer from './auth';

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    assessment: assessmentReducer,
    profile: profileReducer,
    createJob: createJobReducer,
    candidates: candidatesReducer,
    shortlist: shortlistReducer,
    jobs: jobsReducer
})

export default reducers;