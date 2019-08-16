import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import classNames from 'classnames';
import XRegExp from 'xregexp';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';

import UploadImage from './UploadImage';
import InputText from './InputText';
import InputName from './InputName';

import back from '../../../../../assets/back.svg'
import next from '../../../../../assets/next.svg'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    subtitleSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center",
        marginTop: "24px",
        marginBottom: "16px",
        "&$subtitleSectionStart": {
            justifyContent: "start",
        }
    },
    subtitleSectionStart: {},
    subtitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
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
    backIcon: {
        marginRight: "16px"
    },
    nextIcon: {
        marginLeft: "16px"
    },
    iconDisabled:{
        opacity: 0.26
    },
    imagePreview: {
        maxHeight: "100%",  
        maxWidth: "100%", 
        objectFit: "cover",
        width: "100%",
        height: "140px",
        position: "absolute",  
        top: 0, 
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0
    },
    imagePreviewContainer: {
        position: "relative",
        display: "table",
        width: "100%",
        height: "140px",
        borderRadius: "3px",
        backgroundColor: "white",
        border: "solid 2px #d8d8d8",
    },
    gridContainer: {
        marginRight: "-10px",
        marginLeft: "-10px",
        width: "unset"
    },
    gridItem: {
        paddingRight: "10px",
        paddingLeft: "10px",
    },
    gridItemPreview: {
        marginBottom: "24px"
    },
    clearUploadedImage: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        zIndex: 3,
        position: "absolute",
        cursor: "pointer",
        margin: "4px",
        top: 0,
        right: 0
    },
    editUploadedImage: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        zIndex: 3,
        position: "absolute",
        cursor: "pointer",
        margin: "4px",
        top: 0,
        right: 32
    },
    memberName: {
        marginTop: "12px",
        fontSize: "15px",
        fontWeight: 500,
        wordBreak: "break-word"
    },
    memberPosition: {
        fontSize: "15px",
        fontWeight: "normal",
        wordBreak: "break-word"
    },
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    addMemberButton: {
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

class TeamField extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            page:0,

            memberIndex:0,
            lastPage:0,

            avatar:"",
            avatarError: "",
            imageIsLoading: false,

            name:"",
            nameError:"",

            position:"",
            positionError:""
        }
    }

    nextPage = () => this.setState({page: this.state.page+1})
    previousPage = () => this.setState({page: this.state.page-1})

    setAvatarError = (value) => this.setState({avatarError: value})
    setImageLoading = (bool) => this.setState({imageIsLoading: bool})
    setAvatar = (value) => this.setState({avatar: value})

    addMember = (values) => () => {

        let { memberIndex, lastPage } = this.state
        let { addMember, formValues } = this.props;

        let newMember = _.get(formValues, "members", []);
        
        if(_.isEmpty(newMember)) {
            newMember = [];
        }
        
        newMember.splice(memberIndex, 0, values);

        addMember(newMember)

        this.setState({
            name:"",
            position:"",
            avatar:"",
            nameError:"",
            positionError:"",
            avatarError:"",
            memberIndex:0,
            lastPage:0, 
            page: (lastPage === 0) ? 0 :lastPage
        })
    }

    removeMember = (index) => () => {
        let { page } = this.state
        let { addMember, formValues } = this.props
        let newArray = _.reduce(_.get(formValues, "members", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])

        addMember(newArray)

        _.chunk(newArray, 4).length === page && page !== 0 && this.setState({page:page-1})
    }

    editMember = (index, name, position, avatar) => () => {

        let { page } = this.state
        let { addMember, formValues } = this.props

        let newArray = _.reduce(_.get(formValues, "members", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        
        addMember(newArray)
        
        this.setState({
            name: name, 
            position: position, 
            avatar:avatar,
            memberIndex:index, 
            lastPage:page, 
            page: (_.chunk(newArray, 4).length === page && page !== 0) ? page-1 : page
        });
    }

    validateNames = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-.,]*[\\p{L}]$");
        if(name === "name" && !reg.test(value)){
            this.setState({ nameError: 'Enter valid name' });
        } else {
            this.setState({ nameError: '' });
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "name"){
            let inputName = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({
                name: inputName
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
            page, 
            avatar, avatarError, imageIsLoading, 
            name, nameError, 
            position, positionError 
        } = this.state

        let { formValues, classes, token } = this.props

        const members = _.get(formValues, "members", []);

        return (
            <Fragment>
                <div className={classNames((!members|| !Array.isArray(members) || members.length === 0) && classes.subtitleSectionStart, classes.subtitleSection)}>
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Our Team
                    </Typography>
                    {!(!members|| !Array.isArray(members) || members.length === 0) && <div>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!members|| !Array.isArray(members) || _.chunk(members, 4).length === 1 || page === 0) ? true : false}
                            onClick={this.previousPage}
                        >
                            <img 
                                src={back} 
                                alt="back"
                                className={classNames(classes.backIcon, (!members|| !Array.isArray(members) || _.chunk(members, 4).length === 1 || page === 0) && classes.iconDisabled)}
                            />
                        </Button>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!members || !Array.isArray(members) || members.length === 0 || _.chunk(members, 4).length === 1 || page+1 === _.chunk(members, 4).length) ? true : false}
                            onClick={this.nextPage} 
                        >
                            <img 
                                src={next} 
                                alt="next"
                                className={classNames(classes.nextIcon, (!members || !Array.isArray(members) || members.length === 0 || _.chunk(members, 4).length === 1 || page+1 === _.chunk(members, 4).length) && classes.iconDisabled)}
                            />
                        </Button>
                    </div>}
                </div>
                <Grid 
                    container
                    direction="row"
                    className={classes.gridContainer}
                >
                    {members && Array.isArray(members) && _.chunk(members, 4)[page] &&
                        _.chunk(members, 4)[page].map((member, index) => {
                            return (
                                <Grid 
                                    item
                                    md={3}
                                    xs={12}
                                    className={classNames(classes.gridItem, classes.gridItemPreview)}
                                    key={index}
                                >
                                    <div className={classes.imagePreviewContainer}>
                                        <img className={classes.imagePreview} src={member.avatar} alt="response"/>
                                        <Clear onClick={this.removeMember(index+((page)*4))} color="secondary" className={classes.clearUploadedImage}/>
                                        <Edit onClick={this.editMember(index+((page)*4), member.name, member.position, member.avatar)} color="secondary" className={classes.editUploadedImage}/>
                                    </div>
                                    <Typography className={classes.memberName} color="primary">{member.name}</Typography>
                                    <Typography className={classes.memberPosition} color="secondary">{member.position}</Typography>
                                </Grid>
                            )})
                    }
                </Grid>
                <Grid 
                    container
                    direction="row"
                    className={classes.gridContainer}
                >  
                    <Grid 
                        item
                        md={3}
                        xs={12}
                        className={classes.gridItem}
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
                    <Grid 
                        item
                        md={6}
                        xs={12}
                        className={classes.gridItem}
                    >
                        <InputName
                            label="First and last name"
                            name="name"
                            value={name}
                            error={nameError}
                            validate={this.validateNames}
                            handleUserInput={this.handleUserInput}
                        />
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
                    disabled={(avatar && name && position && !nameError && !avatarError && !positionError ? false : true)} 
                    color="secondary" 
                    className={classes.addMemberButton} 
                    onClick={this.addMember({avatar:avatar, name:name, position:position})}
                >
                    <Add className={classes.addIcon} />
                    Add team member
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
    token: state.auth.token
})

export default connect(mapStateToProps,{})(withStyles(styles)(TeamField));