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
        transform: "translate(24px, 33px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(0px, 0px) scale(0.75)",
        transformOrigin: "top left"
    }
});

const renderField = ({ input, classes, label, meta: { touched, error }, ...custom }) => (
    <TextField
        placeholder={label}
        label={label}
        type="text"
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField, inputProps: { onPaste: (event) => event.preventDefault(), onKeyPress: (event) => event.key && event.key !== "Backspace" && event.key !== "0" && event.key !== "1" && event.key !== "2" && event.key !== "3" && event.key !== "4" && event.key !== "5" && event.key !== "6" && event.key !== "7" && event.key !== "8" && event.key !== "9" && event.preventDefault() }}}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: touched && error && true}}
        helperText={touched && error}
        autoComplete="off"
        classes={{ root: classes.formControl }}
        {...input}
        {...custom}
    />
)

const SalaryField = ({ name, label, classes }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes} 
        label={label}
    />
)

export default withStyles(styles)(SalaryField);