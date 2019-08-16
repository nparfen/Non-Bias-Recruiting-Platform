import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { replace } from 'connected-react-router';
import { compose } from 'redux';

import { UserIsAuthenticated } from './authentication';

const locationHelper = locationHelperBuilder({});

const UserIsCompany = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsCompany',
    allowRedirectBack: false,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
    authenticatedSelector: state => state.user.role === "company",
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    },
});

const UserIsCompanyChain = compose(UserIsAuthenticated, UserIsCompany)

const VisibleOnlyCompany = connectedAuthWrapper({
    authenticatedSelector: state => state.user.id !== null && state.user.role === "company",
    wrapperDisplayName: 'VisibleOnlyCompany'
})

export {
    UserIsCompanyChain,
    VisibleOnlyCompany
}