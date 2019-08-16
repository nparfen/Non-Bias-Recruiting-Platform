import types from './types.js';

const setProfile = (data, formId) => ({
    type: types.SET_PROFILE_REQUEST, 
    data: data, 
    formId: formId 
});

const changeProfilePage = (page) => ({
    type:types.CHANGE_PROFILE_PAGE, 
    page:page
})

export {
    setProfile,
    changeProfilePage
}