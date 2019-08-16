import types from './types.js';

const login = (email, password, role, formId) => ({ 
    type: types.LOGIN_REQUEST, 
    email: email, 
    password: password, 
    role: role,
    formId: formId 
});

const linkedInLogin = (token, formId) => ({ 
    type: types.LINKEDIN_LOGIN_REQUEST,
    token: token,
    formId: formId 
});

export {
    login,
    linkedInLogin
}