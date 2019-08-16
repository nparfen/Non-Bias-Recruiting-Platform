import types from './types.js';

const register = (email, password, role, formId, ...other) => ({ 
    type: types.REGISTER_REQUEST, 
    email: email, 
    password: password, 
    role: role, 
    formId: formId,
    other: other
});

const linkedInSignUp = (token, formId) => ({ 
    type: types.LINKEDIN_SIGNUP_REQUEST, 
    token: token,
    formId: formId 
});

export {
    register,
    linkedInSignUp
}