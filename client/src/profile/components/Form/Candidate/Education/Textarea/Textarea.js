import React from 'react';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginBottom: "24px"
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

const TextareaField = ({ label, name, error, value, handleUserInput, classes }) => (
    <TextField
        placeholder={label}
        label={label}
        name={name}
        value={value}
        multiline
        rows="5"
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField }}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: error && true}}
        helperText={error}
        autoComplete="off"
        classes={{ root: classes.formControl }}
        onChange={(event) => handleUserInput(event)}
    />
)

export default withStyles(styles)(TextareaField);