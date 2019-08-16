import types from './types.js';

const createJob = (status, data, formId) => ({
    type: types.CREATE_JOB_REQUEST, 
    status,
    data, 
    formId 
});

const changeCreateJobPage = (page) => ({
    type:types.CHANGE_CREATEJOB_PAGE, 
    page:page
})

export {
    createJob,
    changeCreateJobPage
}