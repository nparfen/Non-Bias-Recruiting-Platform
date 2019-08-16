import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layout: {
        width: 'auto',
        minHeight:'100vh'
    }
});

const EmptyLayout = ({ children, classes }) => (
    <Fragment>
        <main className={classes.layout}>
            {children}
        </main>
    </Fragment>
    
);

export default withStyles(styles)(EmptyLayout);