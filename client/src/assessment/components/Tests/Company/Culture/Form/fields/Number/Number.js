import React from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    inputField: {
        width: 76,
        height: 40,
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    disabled: {
        backgroundColor: "#f9f9f9"
    }
});

const renderField = ({ input, classes, label, meta: { touched, error }, sumOfNowValues, sumOfFutureValues, ...custom }) => (
    <TextField
        placeholder={label}
        type="text"
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField, classes:{ disabled: classes.disabled }, inputProps: { ...input, onPaste: (event) => event.preventDefault(), onKeyPress: (event) => event.key && event.key !== "Backspace" && event.key !== "0" && event.key !== "1" && event.key !== "2" && event.key !== "3" && event.key !== "4" && event.key !== "5" && event.key !== "6" && event.key !== "7" && event.key !== "8" && event.key !== "9" && event.preventDefault() }}}
        InputLabelProps={{ shrink: false }}
        FormHelperTextProps={{error: touched && error && true}}
        helperText={touched && error}
        autoComplete="off"
        disabled={!input.value && (sumOfNowValues === 0 ? true : false || sumOfFutureValues === 0 ? true : false)}
        {...custom}
    />
)

const NumberField = ({ name, label, classes, ...props }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes} 
        label={label}
        {...props}
    />
)

export default withStyles(styles)(NumberField);