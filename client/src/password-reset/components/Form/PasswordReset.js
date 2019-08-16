import React, { Fragment } from 'react';
import { reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import validate from './validation';

import EmailField from './fields/Email';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        height: 50,
        marginTop: "24px",
        borderRadius: 3,
        border: 0,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "capitalize",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        }
    },
    title: {
        marginBottom: "4px",
        fontSize: "30px",
        fontWeight: "bold"
    }
});

const PasswordResetForm = ({ classes, handleSubmit, pristine, submitting, invalid }) => (
    <Fragment>
        <Typography 
            color="primary" 
            className={classes.title}
        >
            Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
            <EmailField 
                name="email" 
                label="Email" 
            />
            <Button 
                className={classes.button}
                type="submit"
                variant="contained" 
                color="primary"
                disabled={pristine || submitting || invalid}
            >
                Reset
            </Button>
        </form>
    </Fragment>
)

export default reduxForm({
    form: 'passwordResetForm',
    validate
})(withStyles(styles)(PasswordResetForm))