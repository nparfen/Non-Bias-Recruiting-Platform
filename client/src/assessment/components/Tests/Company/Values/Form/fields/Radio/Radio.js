import React from 'react';
import { Field } from 'redux-form';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    group: {
        flexWrap: "initial",
        flexDirection: "row"
    },
    label: {
        fontSize: "15px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    },
    radioMarginRight: {
        marginRight: "70px"
    }
});

const renderField = ({ input, classes, label, ...custom }) => (
    <FormControl component="fieldset">
        <RadioGroup
            className={classes.group}
            {...input}
            {...custom}
        >
            <FormControlLabel 
                value="yes" 
                className={classes.radioMarginRight}
                classes={{ label: classes.label }}
                control={<Radio color="primary" />} 
                label="Yes" 
            />
            <FormControlLabel 
                value="no" 
                classes={{ label: classes.label }}
                control={<Radio color="primary" />} 
                label="No" 
            />
        </RadioGroup>
    </FormControl>
)

const RadioField = ({ name, label, classes, ...props }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes}
        {...props}
    />
)

export default withStyles(styles)(RadioField);