import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginBottom: "8px"
    },
    inputField: {
        height: 40,
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
        transform: "translate(24px, 29px) scale(1)",
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
        height: 40,
        paddingLeft: "24px",
        paddingRight: "8px",
        paddingTop: "0px",
        paddingBottom: "0px",
        "&:focus": {
            background: "none"
        }
    }
});

class SelectField extends Component {

    handleChange = e => {
        const { handleSelectChange } = this.props
        handleSelectChange(e.target.value)
    }

    render() {

        const { name, label, classes, value, options } = this.props

        return (
            <TextField
                name={name}
                placeholder={label}
                label={label}
                select
                fullWidth={true}
                InputProps={{ disableUnderline: true, className: classes.inputField }}
                InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
                SelectProps={{
                    native: true,
                    classes:{select: classes.select}
                }}
                classes={{ root: classes.formControl }}
                value={value}
                onChange={this.handleChange}
            >
                <option value="" />
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TextField>
        )
    }
}

export default withStyles(styles)(SelectField);