import React from 'react';
import { Field } from 'redux-form';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

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

const trim = value => (value && value.replace(/\s\s+/g, ' ').replace(/^\s+/,''));

const renderField = ({ input, classes, label, meta: { touched, error }, ...custom }) => (
    <FormControl 
        className={classes.formControl}
        fullWidth={true}
    >
        <InputLabel 
            FormLabelClasses={{ focused: classes.formLabelFocused }}
            className={classes.inputLabel}
            classes={{ shrink: classes.inputLabelShrink }}
        >
            {label}
        </InputLabel>
        <Input
            type="text"
            className={classes.inputField}
            placeholder={label}
            autoComplete="off"
            disableUnderline={true}
            {...input}
            {...custom}
            endAdornment={
                <InputAdornment position="end">
                    <Tooltip title="This position will be shown in the title of your profile." placement="right">
                        <IconButton disableRipple>
                            <InfoOutlined />
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            }
        />
        {touched && error && 
            <FormHelperText 
                error={touched && error && true}
            >
                {touched && error}
            </FormHelperText>
        }
    </FormControl>
)

const PositionField = ({ name, label, classes }) => (
    <Field 
        name={name} 
        component={renderField} 
        classes={classes} 
        label={label}
        normalize={trim}
    />
)

export default withStyles(styles)(PositionField);