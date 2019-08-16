import React from 'react';
import { Field } from 'redux-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginTop: "16px",
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "8px",
        [theme.breakpoints.up('sm')]: {
            marginTop: "28px",
            marginBottom: "0px",
        },
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

const renderField = ({ input, classes, label, ...custom }) => (
    <FormControlLabel
        classes={{root: classes.formControl, label: classes.label}}
        control={
            <Checkbox
                checked={input.value}
                color="primary"
                className={classes.checkbox}
                inputProps={{...input}}
                {...custom}
            />
        }
        label={label}
    />
)

const RelocationField = ({ name, label, classes }) => (
    <Field 
        name={name} 
        component={renderField} 
        label={label}
        classes={classes}
    />
)

export default withStyles(styles)(RelocationField);