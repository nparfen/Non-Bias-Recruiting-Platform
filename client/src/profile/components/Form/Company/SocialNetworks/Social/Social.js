import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
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
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: "normal",
        "&$linked":{
            background: "#f9f9f9"
        }
    },
    linked:{},
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
    button: {
        height: 50,
        borderRadius: 2,
        border: 0,
        marginLeft: "16px",
        marginBottom: "8px",
        padding: "0 36px",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        color: "white",
        '&:disabled':{
            color: "#f9f9f9"
        },
    }
});

class SocialField extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            value: _.get(props.formValues, props.name, ""),
            error:""
        }
    }

    onChange = (event) => this.setState({value: event.target.value, error:""});

    validate = (event) => {
        let { label } = this.props;
        let value = event.target.value;
        if(value && !this.isDomain(value)){
            this.setState({ error: `Enter ${label} url` });
        }
    }

    isDomain = (url) => {
        let { name } = this.props;
        if(name === "linkedin") {
            return /^https:\/\/www.linkedin.com\/\b.*$/i.test(url)
        }
        if(name === "facebook") {
            return /^https:\/\/www.facebook.com\/\b.*$/i.test(url)
        }
        if(name === "twitter") {
            return /^https:\/\/twitter.com\/\b.*$/i.test(url)
        }
        if(name === "pinterest") {
            return /^https:\/\/www.pinterest.com\/\b.*$/i.test(url)
        }
        if(name === "youtube") {
            return /^https:\/\/www.youtube.com\/\b.*$/i.test(url)
        }
        if(name === "instagram") {
            return /^https:\/\/www.instagram.com\/\b.*$/i.test(url)
        }
        if(name === "telegram") {
            return /^https:\/\/t.me\/\b.*$/i.test(url)
        }
        if(name === "angel") {
            return /^https:\/\/angel.co\/\b.*$/i.test(url)
        }
        if(name === "glassdoor") {
            return /^https:\/\/www.glassdoor.com\/\b.*$/i.test(url)
        }
    }

    render() {

        let { value, error } = this.state;
        let { label, formValues, addSocial, name, classes } = this.props;

        const link = _.get(formValues, name, "");

        return(
            <Fragment>
                <TextField
                    placeholder={label}
                    label={label}
                    type="text"
                    fullWidth={true}
                    InputProps={{ disableUnderline: true, className: classNames(classes.inputField, link && classes.linked) }}
                    InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
                    FormHelperTextProps={{error: error && true}}
                    helperText={error}
                    autoComplete="off"
                    classes={{ root: classes.formControl }}
                    disabled={link ? true : false}
                    onBlur={this.validate}
                    value={value}
                    onChange={this.onChange}
                />
                <Button 
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={value && !error && this.isDomain(value) ? false : true}
                    onClick={link ? () => addSocial(name, "") : () => addSocial(name, value)}
                >
                    {link ? "Unlink" : "Link"}
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(SocialField));