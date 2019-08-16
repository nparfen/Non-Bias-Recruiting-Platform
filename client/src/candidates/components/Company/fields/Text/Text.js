import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { default as MuiTextField } from '@material-ui/core/TextField';

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
        padding: "0 24px",
        paddingRight: "16px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    iconSearch: {
        minWidth: "fit-content",
        objectFit: "contain",
        padding: "0",
        "&:hover": {
            backgroundColor : "transparent"
        }
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
});

class TextField extends Component {

    handleChange = e => {
        const { handleSearchClick } = this.props
        handleSearchClick(e.target.value)
    }

    render() {

        const { name, label, classes, text, handleSearchClick, keyPress } = this.props

        return (
            <MuiTextField
                name={name}
                placeholder={label}
                label={label}
                type="text"
                fullWidth={true}
                InputProps={{ 
                    disableUnderline: true, className: classes.inputField, endAdornment: <InputAdornment position="end">
                        <IconButton
                            className={classes.iconSearch}
                            disableRipple
                            aria-label="Search"
                            onClick={() => handleSearchClick(text)}
                        >
                            {<SearchIcon />}
                        </IconButton>
                    </InputAdornment>,
                    onKeyDown: keyPress 
                }}
                InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
                autoComplete="off"
                classes={{ root: classes.formControl }}
                value={text}
                onChange={this.handleChange}
            />
        )
    }
}

export default withStyles(styles)(TextField);