import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Header from '../Header';
import Footer from '../Footer'; 

const styles = theme => ({
    layout: {
        width: 'auto',
        minHeight:'100vh',
        marginLeft: '24px',
        marginRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});

const BaseLayout = ({ children, classes }) => (
    <Fragment >
        <Header />
        <main className={classes.layout}>
            {children}
        </main>
        <Footer />
    </Fragment>
);

export default withStyles(styles)(BaseLayout);