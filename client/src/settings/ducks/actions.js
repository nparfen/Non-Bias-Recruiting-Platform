import types from './types.js';

const changeSettings = (formId) => ({ 
    type: types.CHANGE_SETTINGS_REQUEST, 
    formId: formId 
});

export {
    changeSettings
}