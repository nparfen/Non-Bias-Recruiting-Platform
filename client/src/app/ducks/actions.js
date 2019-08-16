import types from './types.js';

const logout = () => ({ 
    type: types.LOGOUT_REQUEST 
});

export {
    logout
}