import React from 'react';
import { Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import types from './ducks/types';
import store, { history } from './ducks/store';
// scroll
import ScrollToTop from './components/ScrollToTop';
// theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiTheme from './ducks/theme';
// wrappers
import { UserIsAuthenticated, UserIsNotAuthenticated } from './ducks/wrappers/authentication';
// layouts
import RouteLayout from './layouts/Route';
import BaseLayout from './layouts/Base';
import EmptyLayout from './layouts/Empty';
import EmptyBaseLayout from './layouts/Empty/Base';

// loading
import Loadable from 'react-loadable';
import Loader from './components/Loader';

// components
const NotFoundPageComponent = Loadable({ loader: () => import('./components/NotFound'), loading: Loader, });
const LandingPageComponent = Loadable({ loader: () => import('../landing'), loading: Loader });
const SignUpPageComponent = Loadable({ loader: () => import( '../signup'), loading: Loader });
const LoginPageComponent = Loadable({ loader: () => import( '../login'), loading: Loader});
const PasswordResetPageComponent = Loadable({ loader: () => import( '../password-reset'), loading: Loader});
const AssessmentPageComponent = Loadable({ loader: () => import( "../assessment"), loading: Loader});
const ProfilePageComponent = Loadable({ loader: () => import( "../profile"), loading: Loader});
const CreateJobPageComponent = Loadable({ loader: () => import( "../jobs/create"), loading: Loader});
const SettingsPageComponent = Loadable({ loader: () => import( "../settings"), loading: Loader});
const CandidatesPageComponent = Loadable({ loader: () => import( "../candidates"), loading: Loader});
const ShortlistPageComponent = Loadable({ loader: () => import( '../shortlist'), loading: Loader})
const JobsPageComponent = Loadable({loader: () => import( '../jobs'), loading: Loader});

const token = localStorage.getItem('token');
if(token) {
    store.dispatch({ type: types.AUTH_REQUEST, token: token });
}

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <MuiThemeProvider theme={MuiTheme}>
                    <CssBaseline />
                    <Switch>
                        <RouteLayout 
                            exact 
                            path="/" 
                            layout={EmptyLayout} 
                            component={LandingPageComponent}
                        />
                        <RouteLayout 
                            exact 
                            path="/signup" 
                            layout={EmptyLayout} 
                            component={UserIsNotAuthenticated(SignUpPageComponent)}
                        />
                        <RouteLayout 
                            exact 
                            path="/login" 
                            layout={EmptyLayout} 
                            component={UserIsNotAuthenticated(LoginPageComponent)}
                        />
                        <RouteLayout 
                            exact 
                            path="/password-reset" 
                            layout={EmptyLayout} 
                            component={UserIsNotAuthenticated(PasswordResetPageComponent)}
                        />
                        <RouteLayout 
                            exact 
                            path="/profile" 
                            layout={EmptyBaseLayout} 
                            component={UserIsAuthenticated(ProfilePageComponent)}
                        />
                        <RouteLayout 
                            exact 
                            path="/assessment" 
                            layout={BaseLayout} 
                            component={AssessmentPageComponent}
                        />
                        <RouteLayout 
                            exact 
                            path="/settings" 
                            layout={BaseLayout} 
                            component={SettingsPageComponent}
                        />
                        <RouteLayout
                            exact
                            path="/shortlist"
                            layout={BaseLayout}
                            component={ShortlistPageComponent}
                        />
                        <RouteLayout
                            exact
                            path="/jobs"
                            layout={BaseLayout}
                            component={JobsPageComponent}
                        />
                        <RouteLayout
                            exact
                            path="/jobs/create"
                            layout={EmptyBaseLayout}
                            component={CreateJobPageComponent}
                        />
                        <RouteLayout
                            exact
                            path="/candidates"
                            layout={BaseLayout}
                            component={CandidatesPageComponent}
                        />
                        <RouteLayout 
                            layout={BaseLayout} 
                            component={NotFoundPageComponent}
                        />
                    </Switch>
                </MuiThemeProvider>
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>
);

export default App;