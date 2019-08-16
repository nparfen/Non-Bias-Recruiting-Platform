import React, { Fragment } from 'react';
import { Field } from 'redux-form';

import className from 'classnames';

import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        width: "176px",
        height: "198px",
        padding: "24px",
        borderRadius: "3px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paperChecked: {
        backgroundColor: theme.palette.secondary.main,  
    },
    paperDisabled: {
        backgroundColor: "#f9f9f9",
        cursor: "default"
    },
    text: {
        fontSize: "17px",
        fontWeight: "normal",
        color: "#8a8a8f",
    },
    textChecked: {
        color: "#ffffff"
    },
    textDisabled: {
        color: theme.palette.secondary.main
    },
    checkbox: {
        padding: "0px",
        margin: "12px"
    }
});

const Icon = ({ classes, options, checked, disabled }) => (
    <Paper className={className(classes.paper, checked && classes.paperChecked, disabled && classes.paperDisabled)}>
        <Typography className={className(classes.text, checked && classes.textChecked, disabled && classes.textDisabled)}>
            {options.values.map((value, index) => 
                <Fragment key={value}>
                    {value}
                    <br/>
                </Fragment>)
            }
        </Typography>
    </Paper>
)

const renderField = ({ input, classes, options, amountOfSelected, ...custom }) => (
    <Checkbox
        icon={
            <Icon 
                classes={classes} 
                options={options} 
                disabled={!input.value && amountOfSelected === 7 ? true : false}
            />
        }
        checkedIcon={
            <Icon 
                classes={classes} 
                options={options}
                checked
            />
        }
        className={classes.checkbox}
        disableRipple={true}
        disabled={!input.value && amountOfSelected === 7 ? true : false} 
        checked={input.value}
        inputProps={{...input}}
        {...custom}
    />
)

const CheckPaperField = ({ name, classes, ...props }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes}
        {...props}
    />
)

export default withStyles(styles)(CheckPaperField);