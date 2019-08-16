import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fullScreen: {
        minHeight: "100vh"
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        marginTop: "-200px",
        zIndex: "-1"
    },
});

const NotFoundPage = ({ classes }) => (
    <Grid 
        container
        className={classes.fullScreen}
        alignItems="center"
        direction="row"
        justify="center"
    >
        <Typography 
            color="primary" 
            className={classes.title}
        >
            Whooops! Page couldn't be found...
        </Typography>
    </Grid>
)

export default withStyles(styles)(NotFoundPage);