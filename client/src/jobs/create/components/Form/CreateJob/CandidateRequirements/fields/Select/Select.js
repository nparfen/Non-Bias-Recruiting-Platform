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

const renderFieldSelect = ({ input, classes, label, meta: { touched, error }, children, ...custom }) => (
    <TextField
        placeholder={label}
        label={label}
        select
        fullWidth={true}
        InputProps={{ disableUnderline: true, className: classes.inputField }}
        InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
        FormHelperTextProps={{error: touched && error && true}}
        helperText={touched && error}
        SelectProps={{
            native: true,
            classes:{select: classes.select}
        }}
        classes={{ root: classes.formControl }}
        {...input}
        {...custom}
    >
        {children}
    </TextField>
)

const SelectField = ({ name, label, classes, options }) => (
    <Field 
        name={name} 
        component={renderFieldSelect} 
        classes={classes} 
        label={label}
    >
        <option value="" />
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </Field>
)

export default withStyles(styles)(SelectField);