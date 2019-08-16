import React, { Component } from 'react';
import { Field } from 'redux-form';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
        padding: "9px 24px",
        transform: "translate(0, 24px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(-16px, -6px) scale(0.75)",
        transformOrigin: "top left"
    }
});

const renderField = ({ input, password, showPassword, handleChange, handleClickShowPassword, classes, label, meta: { touched, error }, ...custom }) => (
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            className={classes.inputField}
            placeholder={label}
            autoComplete="off"
            disableUnderline={true}
            onChange={handleChange}
            {...input}
            {...custom}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
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

class PasswordField extends Component {

    state = {
        password: '',
        showPassword: false,
    };
    
    handleChange = event => {
        this.setState({ password: event.target.value });
    };
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {

        let { password, showPassword } = this.state;
        let { name, label, classes } = this.props;

        return (
            <Field 
                name={name} 
                component={renderField} 
                classes={classes} 
                label={label}
                password={password}
                showPassword={showPassword}
                handleChange={this.handleChange}
                handleClickShowPassword={this.handleClickShowPassword}
            />
        )
    }
}

export default withStyles(styles)(PasswordField);