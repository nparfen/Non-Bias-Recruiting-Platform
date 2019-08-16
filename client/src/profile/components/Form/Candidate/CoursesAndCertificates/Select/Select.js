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
    select: {
        height: 50,
        paddingLeft: "24px",
        paddingRight: "8px",
        paddingTop: "0px",
        paddingBottom: "0px",
        "&:focus": {
            background: "none"
        }
    }
});

const SelectField = ({ name, label, value, handleUserInput, error, classes, options }) => (
    <TextField
        name={name}
        placeholder={label}
        label={label}
        value={value}
        select
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField }}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: error && true}}
        helperText={error}
        SelectProps={{
            native: true,
            classes:{select: classes.select}
        }}
        classes={{ root: classes.formControl }}
        onChange={(event) => handleUserInput(event)}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </TextField>
)

export default withStyles(styles)(SelectField);