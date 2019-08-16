import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        marginBottom: "100px",
        boxShadow: "0 1px 7px 0 rgba(6, 30, 58, 0.1)",
        padding: "50px",
        width: "100%",
    },
    textSection: {
        paddingRight: "0px",
        [theme.breakpoints.up("sm")]: {
            paddingRight: "15px",
        },
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "8px"
    },
    subtitle: {
        fontSize: "20px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    },
    button: {
        height: 60,
        margin: "15px 0",
        borderRadius: 3,
        padding: "0 44px",
        fontSize: "20px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:hover':{
            color: "white",
        }
    },
});

const ActionSection = ({ classes }) => (
    <Paper 
        square={true} 
        className={classes.paper}
    >
        <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-between"
        >
            <Grid 
                sm
                item
                className={classes.textSection}
            >
                <Typography 
                    color="primary" 
                    className={classes.title}
                >
                    Are you ready for change?
                </Typography>
                <Typography className={classes.subtitle}>
                    Create company account and find the perfect matching
                </Typography>
            </Grid>
            <Button 
                className={classes.button}
                variant="contained" 
                color="primary"
                component={Link} 
                to={{pathname: '/signup', state: { type: "company" }}}
            >
                Create account
            </Button>
        </Grid>
    </Paper>
)

export default withStyles(styles)(ActionSection);