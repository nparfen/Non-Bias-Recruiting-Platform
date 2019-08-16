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
import SelectField from './Select';
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

    educationIndex: 0,
    type: "",
    schoolName: "",
    studyField: "",
    degree: "",
    grade: "",
    fromYear: null,
    toYear: null,
    currently: false,
    description: "",
    currentlyDisabled: false,

    descriptionError: "",
    fromYearError: "",
    toYearError: ""
}

class EducationSection extends Component {

    state={
        ...state
    }

    changeView = value => this.setState({...state, view: value})

    setFromYear = value => {
        let { toYear } = this.state;
        if(value !== null && toYear !== null && Date.parse(format(value, 'dd MMM yyyy')) > Date.parse(format(Date.parse(toYear), 'dd MMM yyyy'))){
            this.setState({ fromYear: value.toString(), fromYearError: "To date should be bigger than from" })
        } else {
            this.setState({fromYear: value === null ? null : value.toString(), toYearError:'', fromYearError: ''})
        }
    }

    setToYear = value => {
        let { fromYear } = this.state;
        if(value !== null && fromYear !== null && Date.parse(format(value, 'dd MMM yyyy')) < Date.parse(format(Date.parse(fromYear), 'dd MMM yyyy'))){
            this.setState({ toYear: value.toString(), toYearError: "To date should be bigger than from" })
        } else {
            this.setState({toYear: value === null ? null : value.toString(), fromYearError:'', toYearError: '', currentlyDisabled: true})
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "type"){
            this.setState({
                ...state,
                educationIndex: this.state.educationIndex,
                view: this.state.view,
                type: value
            });
        }
        if (name === "schoolname"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({schoolName: inputValue});
        }
        if (name === "studyfield"){
            this.setState({studyField: value});
        }
        if (name === "degree"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({degree: inputValue});
        }
        if (name === "grade"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({grade: inputValue});
        }
        if (name === "currently"){
            this.setState({currently: !this.state.currently});
        }
        if (name === "description"){
            let inputValue = value.replace(/^\s+/,'')
            this.setState({description: inputValue});
        }
    }

    addUserEducation = () => () => {

        let { 
            educationIndex,
            type,
            schoolName,
            studyField,
            degree,
            grade,
            fromYear,
            toYear,
            currently,
            description
        } = this.state;
        let { addEducation, formValues } = this.props;

        let newEducation = _.get(formValues, "education", []);
        
        if(_.isEmpty(newEducation)) {
            newEducation = [];
        }
        
        newEducation.splice(educationIndex, 0, { type, schoolName, studyField, degree, grade, fromYear, toYear, currently, description });

        addEducation(newEducation)

        this.setState({...state})
    }

    removeEducation = (index) => () => {
        let { addEducation, formValues } = this.props
        let newEducation = _.reduce(_.get(formValues, "education", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        addEducation(newEducation);
    }

    editEducation = (index, education) => () => {

        let {
            type,
            schoolName,
            studyField,
            degree,
            grade,
            fromYear,
            toYear,
            currently,
            description
        } = education;

        let { addEducation, formValues } = this.props

        let newEducation = _.reduce(_.get(formValues, "education", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        
        addEducation(newEducation)
        
        this.setState({
            view: "new",
            educationIndex: index,
            type:type,
            schoolName:schoolName,
            studyField:studyField,
            degree:degree,
            grade:grade,
            fromYear:fromYear,
            toYear:toYear,
            currently:currently,
            description:description
        });
    }

    render (){

        let { view, type, schoolName, studyField, degree, grade, fromYear, toYear, currently, description,
            fromYearError, toYearError, descriptionError
        } = this.state;

        let { classes, formValues } = this.props;

        const educations = _.get(formValues, "education", []);

        return (
            <Paper 
                id="education" 
                className={classes.paper}
            >
                <Typography 
                    className={classes.title}
                    color="primary"
                >
                    Education
                </Typography>
                {
                    view === "main" ?
                        <Fragment>
                            {
                                educations.map((education, index) => 
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
                                                {education.schoolName}
                                            </Typography>
                                            <EditOutlined 
                                                color="secondary"
                                                className={classes.editBlockButton}
                                                onClick={this.editEducation(index, education)}
                                            />
                                            <DeleteOutline 
                                                color="secondary"
                                                className={classes.deleteBlockButton} 
                                                onClick={this.removeEducation(index)}
                                            />
                                        </div>
                                        <div className={classes.mainBlock}>
                                            <Typography className={classes.blockSubtitle}>
                                                {education.degree} <span className={classes.dot}/> {education.degree} in {education.studyField}
                                            </Typography>
                                            <Typography 
                                                color="secondary"
                                                className={classes.blockDate}
                                            >
                                                {format(Date.parse(education.fromYear), 'dd MMM yyyy')} - {education.currently ? "Present" : format(Date.parse(education.toYear), 'dd MMM yyyy')}
                                            </Typography>
                                            {
                                                education.description && <Typography 
                                                    color="secondary"
                                                    className={classes.blockDescription}
                                                >
                                                    {education.description}
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
                                Add education
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
                                    <SelectField 
                                        label="Type of education"
                                        name="type"
                                        options={[{value:"University", label:"University"}]}
                                        value={type}
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
                                        label="School name"
                                        name="schoolname"
                                        value={schoolName}
                                        handleUserInput={this.handleUserInput}
                                    />  
                                </Grid>
                                {
                                    type === "University" &&
                                    <Fragment>
                                        <Grid 
                                            item
                                            xs={12}
                                            sm={6}
                                            className={classes.leftContainer}
                                        >  
                                            <SelectField 
                                                label="Field of study"
                                                name="studyfield"
                                                options={[{value:"publishing", label:"Publishing"}]}
                                                value={studyField}
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
                                                label="Degree"
                                                name="degree"
                                                value={degree}
                                                handleUserInput={this.handleUserInput}
                                            />  
                                        </Grid>
                                        <Grid 
                                            item
                                            xs={12}
                                            sm={6}
                                            className={classes.leftContainer}
                                        >  
                                            <InputText 
                                                label="Grade"
                                                name="grade"
                                                value={grade}
                                                handleUserInput={this.handleUserInput}
                                            />            
                                        </Grid>
                                    </Fragment>
                                }
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
                                        value={fromYear} 
                                        setDate={this.setFromYear}
                                        label="Year"
                                        disabled={false}
                                        error={fromYearError}
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
                                        value={toYear} 
                                        disabled={currently}
                                        setDate={this.setToYear}
                                        label="Year"
                                        error={toYearError}
                                    /> 
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                >
                                    <CheckboxField 
                                        name="currently"
                                        label="I am studying here"
                                        disabled={toYear !== null}
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
                                    disabled={Boolean(fromYearError || toYearError || descriptionError) || !Boolean(type && schoolName && studyField && degree && fromYear && (toYear || currently))}
                                    onClick={this.addUserEducation()}
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

export default connect(mapStateToProps,{})(withStyles(styles)(EducationSection));