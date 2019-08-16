import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import validate from './validation'

import EmailField from './fields/Email'
import PasswordField from './fields/Password'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        marginTop: "24px",
        marginBottom: "4px",
        fontSize: "30px",
        fontWeight: "bold"
    },
    buttonsSection: {
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center"
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        }
    },
    createAcc: {
        fontSize: "16px",
        fontWeight: "500",
        paddingLeft: "8px",
        textDecoration: "underline",
        textAlign: "center",
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.primary.main,
        }
    },
    forgotPass: {
        fontSize: "12px",
        fontWeight: "normal",
        textAlign: "right",
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.secondary.dark,
        }
    },
});

const CompanyLoginForm = ({ classes, handleSubmit, pristine, submitting, invalid }) => (
    <Fragment>
        <Typography 
            color="primary" 
            className={classes.title}
        >
            Login
        </Typography>
        <form onSubmit={handleSubmit}>
            <EmailField 
                name="email" 
                label="Email" 
            />
            <PasswordField 
                name="password" 
                label="Password" 
            />
            <Typography 
                component={Link} 
                to="password-reset"
                color="secondary"
                className={classes.forgotPass}
            >
                Forgot password?
            </Typography>
            <div className={classes.buttonsSection}>
                <Button 
                    className={classes.button}
                    type="submit"
                    variant="contained" 
                    color="primary"
                    disabled={pristine || submitting || invalid}
                >
                    Log In
                </Button>
                <Typography 
                    component={Link} 
                    to={{pathname: '/signup', state: { type: "company" }}}
                    className={classes.createAcc}
                >
                    Create account
                </Typography>
            </div>
        </form>
    </Fragment>
)

export default reduxForm({
    form: 'companyLoginForm',
    validate
})(withStyles(styles)(CompanyLoginForm))