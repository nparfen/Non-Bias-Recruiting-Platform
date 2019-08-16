import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        marginTop: "12px",
        marginLeft: "0px",
        marginRight: "0px"
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

class CheckboxField extends Component {

    handleChange = e => {
        const { index, name, handleCheckboxChange } = this.props
        handleCheckboxChange(index, name, e.target.checked)
    }

    render() {

        const { name, label, classes, value } = this.props
        return (
            <FormControlLabel
                classes={{root: classes.formControl, label: classes.label}}
                control={
                    <Checkbox
                        name={name}
                        checked={value}
                        color="primary"
                        className={classes.checkbox}
                        onChange={this.handleChange}
                    />
                }
                label={label}
            />
        )
    }
}

export default withStyles(styles)(CheckboxField);