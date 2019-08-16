import React from 'react';

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
    },
});

const InputName = ({ label, name, error, value, handleUserInput, validate, classes }) => (
    <TextField
        placeholder={label}
        label={label}
        type="text"
        name={name}
        value={value}
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField }}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: error && true}}
        helperText={error}
        autoComplete="off"
        classes={{ root: classes.formControl }}
        onBlur={(event) => validate(event)}
        onChange={(event) => handleUserInput(event)}
    />
)

export default withStyles(styles)(InputName);