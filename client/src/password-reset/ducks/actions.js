import types from './types.js';

const resetPassword = (email, formId) => ({ 
    type: types.RESET_PASSWORD_REQUEST, 
    email: email, 
    formId: formId 
});

export {
    resetPassword
}