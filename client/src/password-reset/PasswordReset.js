import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { resetPassword } from './ducks/actions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PasswordResetForm from './components/Form';

import { withStyles } from '@material-ui/core/styles';

import aspireLogo from '../app/assets/aspire-logo.svg';

const styles = theme => ({
    header: {
        width: "auto",
        display: "flex",
        justifyContent: "center"
    },
    logo: {
        marginTop: "60px",
        marginBottom: "40px",
        width: "70px",
        height: "70px",
        objectFit: "contain"
    },
    paper: {
        maxWidth: "450px",
        padding: "40px",
        marginLeft: '24px',
        marginRight: '24px',
        borderRadius: "3px",
        marginBottom: "290px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    }
});

class PasswordResetPage extends Component {

    componentDidMount() {
        toast.warn("😔 Unfortunately, the password reset function is currently not available.", { autoClose: 10000 })
    }

    render() {

        const { classes, resetPassword } = this.props

        return (
            <Grid 
                container
                alignItems="center"
                direction="row"
                justify="center"
            >
                <Grid 
                    item 
                    xs={12}
                    className={classes.header}
                >
                    <Link to="/">
                        <img 
                            src={aspireLogo} 
                            className={classes.logo} 
                            alt="logo"
                        />
                    </Link>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <PasswordResetForm onSubmit={(values) => resetPassword(values.email, "passwordResetForm")} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default connect(
    null,
    {
        resetPassword
    }
)(withStyles(styles)(PasswordResetPage));