import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { replace } from 'connected-react-router';
import { compose } from 'redux';

import { UserIsAuthenticated } from './authentication'

const locationHelper = locationHelperBuilder({});

const UserIsAdmin = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAdmin',
    allowRedirectBack: false,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
    authenticatedSelector: state => state.user.role === "admin",
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    },
});

const UserIsAdminChain = compose(UserIsAuthenticated, UserIsAdmin)

const VisibleOnlyAdmin = connectedAuthWrapper({
    authenticatedSelector: state => state.user.id !== null && state.user.role === "admin",
    wrapperDisplayName: 'VisibleOnlyAdmin'
})

export {
    UserIsAdminChain,
    VisibleOnlyAdmin
}