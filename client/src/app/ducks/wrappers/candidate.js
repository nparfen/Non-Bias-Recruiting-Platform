import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { replace } from 'connected-react-router';
import { compose } from 'redux';

import { UserIsAuthenticated } from './authentication'

const locationHelper = locationHelperBuilder({});

const UserIsCandidate = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsCandidate',
    allowRedirectBack: false,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
    authenticatedSelector: state => state.user.role === "candidate",
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    },
});

const UserIsCandidateChain = compose(UserIsAuthenticated, UserIsCandidate)

const VisibleOnlyCandidate = connectedAuthWrapper({
    authenticatedSelector: state => state.user.id !== null && state.user.role === "candidate",
    wrapperDisplayName: 'VisibleOnlyCandidate'
})

export {
    UserIsCandidateChain,
    VisibleOnlyCandidate
}