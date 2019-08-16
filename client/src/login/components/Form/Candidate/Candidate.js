import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FaLinkedinIn } from 'react-icons/fa';

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
    leftIcon: {
        marginRight: "12px",
        width: "24px",
        height: "24px",
        objectFit: "contain"
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
    dividerSection: {
        display: "flex",
        alignItems:"center",
        margin: "32px 0",
        justifyContent: "center"
    },
    dividerContainer: {
        width: "100%"
    },
    dividerText: {
        fontSize: "16px",
        fontWeight: 500,
        margin: "0 24px",
        color: theme.palette.secondary.dark
    },
    divider: {
        margin: "0 0",
        color: theme.palette.secondary.light
    },
});

class CandidateLoginForm extends Component {
      
    handleLinkedInAuth = () => {
        let { linkedInLogin } = this.props;
        const opened = window.open(process.env.REACT_APP_LINKEDIN_WINDOW, 'linkedin', 'width=500,height=500');
        window.addEventListener('message', function(event) {
            try {
                let data = JSON.parse(event.data);
                opened.close();
                linkedInLogin(data.authorization)
            } catch(e) {}
        }, false);
    }

    render() {

        let { classes, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
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
                            to={{pathname: '/signup', state: { type: "candidate" }}}
                            className={classes.createAcc}
                        >
                            Create account
                        </Typography>
                    </div>
                </form>
                <div className={classes.dividerSection}>
                    <div className={classes.dividerContainer}>
                        <Divider className={classes.divider}/>
                    </div>
                    <Typography className={classes.dividerText}>
                        or
                    </Typography>
                    <div className={classes.dividerContainer}>
                        <Divider className={classes.divider}/>
                    </div>
                </div>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    fullWidth
                    disabled={submitting}
                    onClick={this.handleLinkedInAuth}
                >
                    <FaLinkedinIn className={classes.leftIcon}/>
                    Log In with LinkedIn
                </Button>
            </Fragment>
        );
    }
};

export default reduxForm({
    form: 'candidateLoginForm',
    validate
})(withStyles(styles)(CandidateLoginForm))