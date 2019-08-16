import React from 'react';
import { Link } from 'react-router-dom';

import className from 'classnames';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fullScreen: {
        minHeight: "calc(100vh - 120px)",
        backgroundColor: theme.palette.secondary.light,
    },
    title: {
        fontSize: "35px",
        fontWeight: "bold",
        marginBottom: "16px"
    },
    subtitle: {
        fontSize: "22px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    },
    mainSection: {
        textAlign: "center"
    },
    buttonsSection: {
        marginTop: "45px",
    },
    button: {
        height: 60,
        margin: "15px",
        borderRadius: 3,
        padding: "0 44px",
        fontSize: "20px",
        fontWeight: 600,
        textTransform: "initial",
        whiteSpace: "nowrap",
        boxShadow: "none !important",
    },
    outlinedButton: {
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        }
    },
});

const MainSection = ({ classes }) => (
    <Grid 
        container
        className={classes.fullScreen}
        alignItems="center"
        direction="row"
        justify="center"
    >
        <div className={classes.mainSection}>
            <Typography 
                color="primary" 
                className={classes.title}
            >
                    Find Your Perfect Employee Match for Working
            </Typography>
            <Typography className={classes.subtitle}>
                    Let us inspire you
            </Typography>
            <div className={classes.buttonsSection}>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    component={Link} 
                    to={{pathname: '/signup', state: { type: "company" }}}
                >
                        Create account
                </Button>
                <Button 
                    className={className(classes.button, classes.outlinedButton)}
                    variant="outlined" 
                    color="secondary"
                    component={Link} 
                    to={{pathname: '/signup', state: { type: "candidate" }}}
                >
                        I’m candidate
                </Button>
            </div>
        </div>
    </Grid>
)

export default withStyles(styles)(MainSection);