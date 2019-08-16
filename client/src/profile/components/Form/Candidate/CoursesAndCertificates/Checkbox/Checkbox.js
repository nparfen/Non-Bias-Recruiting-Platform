import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginTop: "16px",
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "16px",
    },
    formControlMB24: {
        marginTop: "16px",
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "24px",
    },
    label: {
        color: theme.palette.secondary.dark,
        fontSize: "15px",
        fontWeight: "normal"
    },
    checkbox: {
        padding: "0px",
        paddingRight: "12px"
    }
});

const CheckboxField = ({ name, mb24, disabled, value, handleUserInput, label, classes }) => (
    <FormControlLabel
        classes={{root: mb24 ? classes.formControlMB24 : classes.formControl, label: classes.label}}
        control={
            <Checkbox
                name={name}
                checked={value}
                disabled={disabled}
                color="primary"
                className={classes.checkbox}
                onChange={(event) => handleUserInput(event)}
            />
        }
        label={label}
    />
)

export default withStyles(styles)(CheckboxField);