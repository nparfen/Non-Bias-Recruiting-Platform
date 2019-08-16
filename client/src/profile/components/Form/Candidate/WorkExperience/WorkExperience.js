import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import format from 'date-fns/format';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import InputText from './InputText';
import LocationField from './Location';
import DateField from './Date';
import CheckboxField from './Checkbox';
import TextareaField from './Textarea';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "16px"
    },
    subtitle:{
        marginTop: "16px",
        marginBottom: "8px",
        fontSize: "16px",
        fontWeight: "bold"
    },
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    addButton: {
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
    },
    claimButton: {
        position: "absolute",
        top: "unset",
        bottom: 0,
        width: "100%",
        right: 0,
        height: 36,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 0,
        border: 0,
        padding: "0 12px",
        fontSize: "14px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        color: "white",
        [theme.breakpoints.up('sm')]: {
            top: "20px",
            width: "auto",
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 3
        },
    },
    mainBlock: {
        marginBottom: "8px",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "0px"
        }
    },
    button: {
        height: 40,
        borderRadius: 2,
        border: 0,
        padding: "0 16px",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        color: "white",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
    outlinedButton: {
        height: 40,
        borderRadius: 2,
        padding: "0 16px",
        fontSize: "15px",
        marginLeft: "0px",
        marginTop: "16px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: "24px",
            marginTop: "0px",
        },
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    buttonsSection: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
        },
    },
    block: {
        position: "relative",
        borderRadius: "3px",
        backgroundColor: "#f9f9f9",
        padding: "16px",
        marginBottom: "16px",
        paddingBottom: "36px",
        wordBreak: "break-word",
        [theme.breakpoints.up('sm')]: {
            paddingBottom: "16px"
        }
    },
    blockTitleSection: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        marginBottom: "6px"
    },
    blockTitle: {
        fontSize: "16px",
        fontWeight: "bold"
    },
    editBlockButton:{
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginLeft: "16px",
        cursor: "pointer"
    },
    deleteBlockButton:{
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginLeft: "8px",
        cursor: "pointer"
    },
    dot: {
        height: "4px",
        width: "4px",
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: "50%",
        marginLeft: "10px",
        marginRight: "10px",
        verticalAlign: "middle",
        display: "inline-block"
    },
    blockSubtitle: {
        color: theme.palette.secondary.dark,
        fontSize: "16px",
        fontWeight: "500"
    },
    blockDate: {
        fontSize: "12px",
        fontWeight: "normal"
    },
    blockDescription: {
        fontSize: "15px",
        fontWeight: "normal",
        marginTop: "10px"
    }
});

const state = {
    view: "main",

    experienceIndex: 0,
    position: "",
    companyName: "",
    location: {
        address: "",
        coords: ""
    },
    fromDate: null,
    toDate: null,
    currently: false,
    description: "",
    currentlyDisabled: false,

    locationError: "",
    descriptionError: "",
    fromDateError: "",
    toDateError: ""
}

class WorkExperienceSection extends Component {

    state={
        ...state
    }

    changeView = value => this.setState({...state, view: value})

    setLocationCoords = value => this.setState({location: { ...this.state.location, coords: value }, locationError: ""})
    setLocationAddress = value => {
        if(value){
            this.setState({location: { address: value, coords: "" }, locationError: 'Choose the address from the list'})
        } else {
            this.setState({location: { address: value, coords: "" }, locationError: ''})
        }
    }

    setFromDate = value => {
        let { toDate } = this.state;
        if(value !== null && toDate !== null && Date.parse(format(value, 'dd MMM yyyy')) >Date.parse(format(Date.parse(toDate), 'dd MMM yyyy'))){
            this.setState({ fromDate: value.toString(), fromDateError: "To date should be bigger than from" })
        } else {
            this.setState({fromDate: value === null ? null : value.toString(), toDateError:'', fromDateError: ''})
        }
    }

    setToDate = value => {
        let { fromDate } = this.state;
        if(value !== null && fromDate !== null && Date.parse(format(value, 'dd MMM yyyy')) < Date.parse(format(Date.parse(fromDate), 'dd MMM yyyy'))){
            this.setState({ toDate: value.toString(), toDateError: "To date should be bigger than from" })
        } else {
            this.setState({toDate: value === null ? null : value.toString(), fromDateError:'', toDateError: '', currentlyDisabled: true})
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "position"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({position: inputValue});
        }
        if (name === "companyname"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({companyName: inputValue});
        }
        if (name === "currently"){
            this.setState({currently: !this.state.currently});
        }
        if (name === "description"){
            let inputValue = value.replace(/^\s+/,'')
            this.setState({description: inputValue});
        }
    }

    addUserExperience = () => () => {

        let { 
            experienceIndex,
            position,
            companyName,
            location,
            fromDate,
            toDate,
            currently,
            description
        } = this.state;
        let { addExperience, formValues } = this.props;

        let newExperience = _.get(formValues, "experience", []);
        
        if(_.isEmpty(newExperience)) {
            newExperience = [];
        }
        
        newExperience.splice(experienceIndex, 0, { position, companyName, location, fromDate, toDate, currently, description });

        addExperience(newExperience)

        this.setState({...state})
    }

    removeExperience = (index) => () => {
        let { addExperience, formValues } = this.props
        let newExperience = _.reduce(_.get(formValues, "experience", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        addExperience(newExperience);
    }

    editExperience = (index, experience) => () => {

        let {
            position,
            companyName,
            location,
            fromDate,
            toDate,
            currently,
            description
        } = experience;

        let { addExperience, formValues } = this.props

        let newExperience = _.reduce(_.get(formValues, "experience", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        
        addExperience(newExperience)
        
        this.setState({
            view: "new",
            experienceIndex: index,
            position: position,
            companyName: companyName,
            location: location,
            fromDate: fromDate,
            toDate: toDate,
            currently: currently,
            description: description
        });
    }

    render (){

        let { view, position, companyName, location, fromDate, toDate, currently, description,
            locationError, fromDateError, toDateError, descriptionError
        } = this.state;

        let { classes, formValues } = this.props;

        const experiences = _.get(formValues, "experience", []);

        return (
            <Paper 
                id="work-experience" 
                className={classes.paper}
            >
                <Typography 
                    className={classes.title}
                    color="primary"
                >
                    Work Experience
                </Typography>
                {
                    view === "main" ?
                        <Fragment>
                            {
                                experiences.map((experience, index) => 
                                    <div className={classes.block} key={index}>
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            className={classes.claimButton}
                                        >
                                            Make a claim
                                        </Button>
                                        <div className={classes.blockTitleSection}>
                                            <Typography 
                                                className={classes.blockTitle}
                                                color="primary"
                                            >
                                                {experience.position}
                                            </Typography>
                                            <EditOutlined 
                                                color="secondary"
                                                className={classes.editBlockButton}
                                                onClick={this.editExperience(index, experience)}
                                            />
                                            <DeleteOutline 
                                                color="secondary"
                                                className={classes.deleteBlockButton} 
                                                onClick={this.removeExperience(index)}
                                            />
                                        </div>
                                        <div className={classes.mainBlock}>
                                            <Typography className={classes.blockSubtitle}>
                                                {experience.companyName} {experience.location.coords && <Fragment><span className={classes.dot}/>{experience.location.address}</Fragment> }
                                            </Typography>
                                            <Typography 
                                                color="secondary"
                                                className={classes.blockDate}
                                            >
                                                {format(Date.parse(experience.fromDate), 'dd MMM yyyy')} - {experience.currently ? "Present" : format(Date.parse(experience.toDate), 'dd MMM yyyy')}
                                            </Typography>
                                            {
                                                experience.description && <Typography 
                                                    color="secondary"
                                                    className={classes.blockDescription}
                                                >
                                                    {experience.description}
                                                </Typography>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            <Button
                                color="secondary" 
                                className={classes.addButton} 
                                onClick={() => this.changeView("new")}
                            >
                                <Add className={classes.addIcon} />
                                Add work experience
                            </Button>
                        </Fragment>
                        :
                        <Fragment>
                            <Grid 
                                container
                                direction="row"
                            >  
                                <Grid 
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.leftContainer}
                                >  
                                    <InputText 
                                        label="Position"
                                        name="position"
                                        value={position}
                                        handleUserInput={this.handleUserInput}
                                    />            
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.rightContainer}
                                >  
                                    <InputText 
                                        label="Company name"
                                        name="companyname"
                                        value={companyName}
                                        handleUserInput={this.handleUserInput}
                                    />  
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.leftContainer}
                                >  
                                    <LocationField 
                                        label="Location"
                                        name="location"
                                        value={location.address}
                                        error={locationError}
                                        setLocationAddress={this.setLocationAddress}
                                        setLocationCoords={this.setLocationCoords}
                                    />            
                                </Grid>
                            </Grid>
                            <Grid 
                                container
                                direction="row"
                            >  
                                <Grid 
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.leftContainer}
                                >  
                                    <Typography 
                                        className={classes.subtitle}
                                        color="primary"
                                    >
                                        From
                                    </Typography> 
                                    <DateField
                                        value={fromDate} 
                                        setDate={this.setFromDate}
                                        label="Start date"
                                        disabled={false}
                                        error={fromDateError}
                                    />         
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.rightContainer}
                                >  
                                    <Typography 
                                        className={classes.subtitle}
                                        color="primary"
                                    >
                                        To
                                    </Typography>
                                    <DateField 
                                        value={toDate} 
                                        disabled={currently}
                                        setDate={this.setToDate}
                                        label="Present"
                                        error={toDateError}
                                    /> 
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                >
                                    <CheckboxField 
                                        name="currently"
                                        label="I currently work here"
                                        disabled={toDate !== null}
                                        value={currently}
                                        handleUserInput={this.handleUserInput}
                                    />
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                >
                                    <TextareaField 
                                        name="description"
                                        label="Description (optional)"
                                        value={description}
                                        error={descriptionError}
                                        handleUserInput={this.handleUserInput}
                                    />
                                </Grid>
                            </Grid>
                            <div className={classes.buttonsSection}>
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    disabled={Boolean(fromDateError || toDateError || descriptionError) || !Boolean(position && companyName && fromDate && (toDate || currently))}
                                    onClick={this.addUserExperience()}
                                >
                                    Add to profile
                                </Button>
                                <Button 
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.outlinedButton}
                                    onClick={() => this.changeView("main")}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Fragment>       
                }
            </Paper>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(WorkExperienceSection));