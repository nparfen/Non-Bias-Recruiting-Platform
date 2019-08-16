import React from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginBottom: "8px"
    },
    inputField: {
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "15px 24px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    inputLabel: {
        zIndex: 1,
        color: theme.palette.secondary.main,
        transform: "translate(24px, 33px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(0px, 0px) scale(0.75)",
        transformOrigin: "top left"
    },
});

const trim = value => (value && value.replace(/^\s+/,''));

const renderField = ({ input, classes, label, placeholder, meta: { touched, error }, ...custom }) => (
    <TextField
        placeholder={placeholder}
        label={label}
        multiline
        rows="5"
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

const TextareaField = ({ name, label, placeholder, classes }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes} 
        label={label}
        placeholder={placeholder}
        normalize={trim}
    />
)

export default withStyles(styles)(TextareaField);