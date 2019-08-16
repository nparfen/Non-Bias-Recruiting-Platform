import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FaLinkedinIn } from 'react-icons/fa';

import validate from './validation';

import TextField from './fields/Text';
import EmailField from './fields/Email';
import PasswordField from './fields/Password';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
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
    leftIcon: {
        marginRight: "12px",
        width: "24px",
        height: "24px",
        objectFit: "contain"
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
    alert: {
        marginTop: "16px",
        marginBottom: "16px",
        borderRadius: "2px",
        backgroundColor: "#fff9e0",
        padding: "12px",
        fontSize: "15px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    }
});

class CandidateSignUpForm extends Component {

    handleLinkedInAuth = () => {
        let { linkedInSignUp } = this.props;
        const opened = window.open(process.env.REACT_APP_LINKEDIN_WINDOW, 'linkedin', 'width=500,height=500');
        window.addEventListener('message', function(event) {
            try {
                let data = JSON.parse(event.data);
                opened.close();
                linkedInSignUp(data.authorization)
            } catch(e) {}
        }, false);
    }

    render() {

        let { classes, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <Fragment>
                <Typography className={classes.alert}>
                    Your personal information such as name, age, gender etc. will not be shared with companies. Your application will be considered without any bias, only based on your education, skills and experience
                </Typography>
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
                            to={{pathname: '/login', state: { type: "candidate" }}}
                            className={classes.iHaveAcc}
                        >
                            I have account
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
                    Sign Up with LinkedIn
                </Button>
            </Fragment>
        );
    }
};

export default reduxForm({
    form: 'candidateSignUpForm',
    validate
})(withStyles(styles)(CandidateSignUpForm))