import React from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginBottom: "8px"
    },
    inputField: {
        height: 50,
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    inputLabel: {
        zIndex: 1,
        color: theme.palette.secondary.main,
        padding: "9px 24px",
        transform: "translate(0, 24px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(-16px, -6px) scale(0.75)",
        transformOrigin: "top left"
    }
});

const renderField = ({ input, classes, label, meta: { touched, error }, ...custom }) => (
    <TextField
        placeholder={label}
        label={label}
        type="email"
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField }}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: touched && error && true}}
        helperText={touched && error}
        autoComplete="off"
        classes={{ root: classes.formControl }}
        {...input}
        {...custom}
    />
)

const EmailField = ({ name, label, classes }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes} 
        label={label}
    />
)

export default withStyles(styles)(EmailField);