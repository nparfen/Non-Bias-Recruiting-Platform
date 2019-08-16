import React from 'react';

import className from 'classnames';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "16px"
    },
    subtitle: {
        fontSize: "20px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    },
    image: {
        width: "100%",
        height: "400px",
        backgroundColor: theme.palette.secondary.light
    },
    textContainerPR: {
        paddingRight: "auto",
        [theme.breakpoints.up("md")]: {
            paddingRight: "126px" 
        },
    },
    textContainerPL: {
        paddingLeft: "auto",
        [theme.breakpoints.up("md")]: {
            paddingLeft: "126px" 
        },
    },
    section: {
        marginBottom: "100px"
    },
});

const DescriptionSection = ({ classes }) => (
    <Grid
        container
        className={classes.landingSection}
        alignItems="center"
        direction="row"
        justify="center"
    >
        <Grid 
            md={6} 
            xs={12}
            item 
            className={className(classes.textContainerPR, classes.section)}
        >
            <Typography 
                color="primary" 
                className={classes.title}
            >
                How It Works
            </Typography>
            <Typography className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
        </Grid>
        <Grid 
            className={classes.section}
            md={6} 
            xs={12}
            item
        >
            <div className={classes.image} />
        </Grid>
        <Grid 
            className={classes.section}
            md={6} 
            xs={12}
            item
        >
            <div className={classes.image} />
        </Grid>
        <Grid 
            md={6} 
            xs={12}
            item
            className={className(classes.textContainerPL, classes.section)}
        >
            <Typography 
                color="primary" 
                className={classes.title}
            >
                Perfect Matching Among
                1 200+ Verified Candidates
            </Typography>
            <Typography className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
        </Grid>
    </Grid>
)

export default withStyles(styles)(DescriptionSection);