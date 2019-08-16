import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import validate from './validation';

import TextField from './fields/Text';
import EmailField from './fields/Email';
import PasswordField from './fields/Password';

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
    iHaveAcc: {
        fontSize: "16px",
        fontWeight: "500",
        paddingLeft: "8px",
        textDecoration: "underline",
        textAlign: "center",
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.primary.main,
        }
    }
});

const CompanySignUpForm = ({ classes, handleSubmit, pristine, submitting, invalid }) => (
    <Fragment>
        <Typography 
            color="primary" 
            className={classes.title}
        >
            Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField 
                name="firstname" 
                label="First Name" 
            />
            <TextField 
                name="lastname" 
                label="Last Name" 
            />
            <TextField 
                name="companyname" 
                label="Company Name" 
            />
            <EmailField 
                name="email" 
                label="Email" 
            />
            <PasswordField 
                name="password" 
                label="Password" 
            />
            <div className={classes.buttonsSection}>
                <Button 
                    className={classes.button}
                    type="submit"
                    variant="contained" 
                    color="primary"
                    disabled={pristine || submitting || invalid}
                >
                    Create account
                </Button>
                <Typography 
                    component={Link} 
                    to={{pathname: '/login', state: { type: "company" }}}
                    className={classes.iHaveAcc}
                >
                    I have account
                </Typography>
            </div>
        </form>
    </Fragment>
)

export default reduxForm({
    form: 'companySignUpForm',
    validate
})(withStyles(styles)(CompanySignUpForm))