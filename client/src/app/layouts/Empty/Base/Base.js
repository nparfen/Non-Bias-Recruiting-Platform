import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Header from '../../Header';
import Footer from '../../Footer'; 

const styles = theme => ({
    layout: {
        width: 'auto',
        minHeight:'100vh',
    }
});

const EmptyBaseLayout = ({ children, classes }) => (
    <Fragment >
        <Header />
        <main className={classes.layout}>
            {children}
        </main>
        <Footer />
    </Fragment>
);

export default withStyles(styles)(EmptyBaseLayout);