import types from './types.js';

const setCulture = (culture) => ({
    type: types.SET_CULTURE_ASSESSMENT, 
    culture: culture
});

const setPersonalities = (personalities) => ({
    type: types.SET_PERSONALITIES_ASSESSMENT, 
    personalities: personalities
});

const setValues = (values) => ({
    type: types.SET_VALUES_ASSESSMENT, 
    values: values
});

const changeCulturePage = (page) => ({
    type: types.CHANGE_CULTURE_ASSESSMENT_PAGE, 
    page: page
});

const changePersonalitiesPage = (page) => ({
    type: types.CHANGE_PERSONALITIES_ASSESSMENT_PAGE, 
    page: page
});

const changeValuesPage = (page) => ({
    type: types.CHANGE_VALUES_ASSESSMENT_PAGE, 
    page: page
});

const clearCulture = () => ({
    type: types.CLEAR_CULTURE_ASSESSMENT
});

const clearPersonalities = () => ({
    type: types.CLEAR_PERSONALITIES_ASSESSMENT
});

const clearValues = () => ({
    type: types.CLEAR_VALUES_ASSESSMENT
});

const clearAssessment = () => ({
    type: types.CLEAR_ASSESSMENT_REQUEST
});

const saveAssessment = () => ({
    type: types.SAVE_ASSESSMENT_REQUEST
});

export {
    setCulture,
    setPersonalities,
    setValues,
    changeCulturePage,
    changePersonalitiesPage,
    changeValuesPage,
    clearCulture,
    clearPersonalities,
    clearValues,
    clearAssessment,
    saveAssessment
}