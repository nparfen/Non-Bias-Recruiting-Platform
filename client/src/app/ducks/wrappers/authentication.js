import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { replace } from 'connected-react-router';

import Loader from '../../components/Loader';

const locationHelper = locationHelperBuilder({});

const UserIsAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false,
    AuthenticatingComponent: Loader,
    authenticatingSelector: state => state.user.isLoading,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
    authenticatedSelector: state => (state.auth.isAuthenticated || state.user.id !== null) && !state.user.isLoading,
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    }
});

const UserIsNotAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    allowRedirectBack: false,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
    authenticatedSelector: state => (!state.auth.isAuthenticated || state.user.id === null) && !state.user.isLoading,
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    },
});

const VisibleOnlyAuth = connectedAuthWrapper({
    authenticatedSelector: state => (state.auth.isAuthenticated || state.user.id !== null) && !state.user.isLoading,
    wrapperDisplayName: 'VisibleOnlyAuth'
})

const HiddenOnlyAuth = connectedAuthWrapper({
    authenticatedSelector: state => (!state.auth.isAuthenticated || state.user.id === null) && !state.user.isLoading,
    wrapperDisplayName: 'HiddenOnlyAuth'
})

export {
    UserIsAuthenticated,
    UserIsNotAuthenticated,
    VisibleOnlyAuth,
    HiddenOnlyAuth
}