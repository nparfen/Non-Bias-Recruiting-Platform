import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import _ from 'lodash';
import XRegExp from 'xregexp';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Add from '@material-ui/icons/Add';

import UploadImage from './UploadImage';
import InputText from './InputText'
import InputName from './InputName'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        border: 0,
        padding: 0,
        minWidth: 0,
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
        },
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('md')]: {
            paddingLeft: "12px",
        },
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('md')]: {
            paddingRight: "12px",
        },
    },
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    addRepresentativeButton: {
        border: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "8px",
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
        },
    }
});

class MemberField extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            avatar:_.get(props.formValues, "representative.avatar", ""),
            avatarError: "",
            imageIsLoading: false,

            firstname:_.get(props.formValues, "representative.firstname", ""),
            firstnameError:"",

            lastname:_.get(props.formValues, "representative.lastname", ""),
            lastnameError:"",

            position:_.get(props.formValues, "representative.position", ""),
            positionError:""
        }
    }

    setAvatarError = (value) => this.setState({avatarError: value})
    setImageLoading = (bool) => this.setState({imageIsLoading: bool})
    setAvatar = (value) => this.setState({avatar: value})

    addRepresentative = (values) => () => {

        let { addRepresentative } = this.props;

        addRepresentative(values)

        this.setState({
            firstnameError:"",
            lastnameError:"",
            positionError:"",
            avatarError:"",
        })
    }

    validateNames = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-.,]*[\\p{L}]$");
        if(name === "firstname" && !reg.test(value)){
            this.setState({ firstnameError: 'Enter valid name' });
        } else {
            this.setState({ firstnameError: '' });
        }
        if(name === "lastname" && !reg.test(value)){
            this.setState({ lastnameError: 'Enter valid name' });
        } else {
            this.setState({ lastnameError: '' });
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "firstname"){
            let inputName = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({
                firstname: inputName
            });
        }
        if (name === "lastname"){
            let inputName = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({
                lastname: inputName
            });
        }
        if (name === "position"){
            let inputPosition = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({
                position: inputPosition
            });
        }
    }

    render() {

        let {  
            avatar, avatarError, imageIsLoading, 
            firstname, firstnameError, 
            lastname, lastnameError,
            position, positionError 
        } = this.state

        let { formValues, classes, token } = this.props

        const newRepresentative = _.get(formValues, "representative.position", "") !== position ? true : _.get(formValues, "representative.avatar", "") !== avatar ? true : _.get(formValues, "representative.lastname", "") !== lastname ? true : _.get(formValues, "representative.firstname", "") !== firstname  ? true : false;
        const representative = _.get(formValues, "representative",{})

        return (
            <Fragment>
                <Grid 
                    container
                    direction="row"
                >  
                    <Grid 
                        item
                        md={3}
                        xs={12}
                    > 
                        <UploadImage 
                            avatar={avatar}
                            token={token}
                            avatarError={avatarError}
                            imageIsLoading={imageIsLoading}
                            setAvatar={this.setAvatar}
                            setAvatarError={this.setAvatarError}
                            setImageLoading={this.setImageLoading}
                        />
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="row"
                > 
                    <Grid 
                        item
                        md={6}
                        xs={12}
                        className={classes.leftContainer}
                    >
                        <InputName
                            label="First name"
                            name="firstname"
                            value={firstname}
                            error={firstnameError}
                            validate={this.validateNames}
                            handleUserInput={this.handleUserInput}
                        />
                    </Grid>
                    <Grid 
                        item
                        md={6}
                        xs={12}
                        className={classes.rightContainer}
                    >
                        <InputName 
                            label="Last name"
                            name="lastname"
                            value={lastname}
                            error={lastnameError}
                            validate={this.validateNames}
                            handleUserInput={this.handleUserInput}
                        />
                    </Grid>
                    <Grid 
                        item
                        xs={12}
                        md={6}
                        className={classes.leftContainer}
                    >
                        <InputText 
                            label="Position"
                            name="position"
                            value={position}
                            error={positionError}
                            handleUserInput={this.handleUserInput}
                        />
                    </Grid>
                </Grid>
                <Button 
                    disabled={(avatar && firstname && lastname && position && !firstnameError && !lastnameError && !avatarError && !positionError && newRepresentative ? false : true)} 
                    color="secondary" 
                    className={classes.addRepresentativeButton} 
                    onClick={this.addRepresentative({avatar:avatar, firstname:firstname, lastname:lastname, position:position})}
                >
                    <Add className={classes.addIcon} />
                    {!_.isEmpty(representative) && newRepresentative ? "Update representative" : "Add representative"}
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
    token: state.auth.token
})

export default connect(mapStateToProps,{})(withStyles(styles)(MemberField));