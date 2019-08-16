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
import ExpirationField from './Expiration';
import CheckboxField from './Checkbox';
import TextareaField from './Textarea';
import UploadField from './Upload';
import InputUrl from './InputUrl';

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
    buttonsSectionMT24: {
        marginTop: "16px",
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

const isValidURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
};

const state = {
    view: "main",

    coursesIndex: 0,
    type: "Course",
    name: "",
    provider: "",
    fromYear: null,
    toYear: null,
    expYear: null,
    currently: false,
    description: "",
    currentlyDisabled: false,
    haveCertificate: false,
    certificationName: "",
    licenseNumber: "",
    certificationUrl: "",

    file:"",
    fileError:"",
    fileIsLoading:false,

    descriptionError: "",
    fromYearError: "",
    toYearError: "",
    certificationUrlError: ""
}

class CoursesSection extends Component {

    state={
        ...state
    }

    changeView = value => this.setState({...state, view: value})

    setFileError = (value) => this.setState({fileError: value})
    setFileLoading = (bool) => this.setState({fileIsLoading: bool})
    setFile = (value) => this.setState({file: value})

    setFromYear = value => {
        let { toYear } = this.state;
        if(value !== null && toYear !== null && Date.parse(format(value, 'dd MMM yyyy')) > Date.parse(format(Date.parse(toYear), 'dd MMM yyyy'))){
            this.setState({ fromYear: value.toString(), fromYearError: "To date should be bigger than from" })
        } else {
            this.setState({fromYear: value === null ? null : value.toString(), fromYearError: '', toYearError: ''})
        }
    }

    setToYear = value => {
        let { fromYear } = this.state;
        if(value !== null && fromYear !== null && Date.parse(format(value, 'dd MMM yyyy')) < Date.parse(format(Date.parse(fromYear), 'dd MMM yyyy'))){
            this.setState({ toYear: value.toString(), toYearError: "To date should be bigger than from" })
        } else {
            this.setState({toYear: value === null ? null : value.toString(), fromYearError: '', toYearError: ''})
        }
    }

    setExpYear = value => this.setState({expYear: value === null ? null : value.toString(), currentlyDisabled: true})

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "type"){
            this.setState({
                ...state,
                coursesIndex: this.state.coursesIndex,
                view: this.state.view,
                type: value,
            })
        }
        if (name === "name"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({name: inputValue});
        }
        if (name === "provider"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({provider: inputValue});
        }
        if (name === "currently"){
            this.setState({currently: !this.state.currently});
        }
        if (name === "description"){
            let inputValue = value.replace(/^\s+/,'')
            this.setState({description: inputValue});
        }
        if (name === "havecertificate"){
            this.setState({haveCertificate: !this.state.haveCertificate});
        }
        if (name === "certificationname"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({certificationName: inputValue});
        }
        if (name === "licensenumber"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({licenseNumber: inputValue});
        }
        if (name === "certificationurl"){
            let inputValue = value.replace(/\s\s+/g, ' ').replace(/^\s+/,'')
            this.setState({certificationUrl: inputValue});
        }
    }

    addUserCourses = () => () => {

        let { 
            coursesIndex,
            type,
            name,
            provider,
            fromYear,
            toYear,
            expYear,
            currently,
            description,
            currentlyDisabled,
            haveCertificate,
            file,
            certificationName,
            licenseNumber,
            certificationUrl
        } = this.state;
        let { addCourses, formValues } = this.props;

        let newCourses = _.get(formValues, "courses", []);
        
        if(_.isEmpty(newCourses)) {
            newCourses = [];
        }
        
        newCourses.splice(coursesIndex, 0, { type, name, provider, expYear, fromYear, toYear, currently, description, currentlyDisabled, haveCertificate, file, certificationName, licenseNumber, certificationUrl });

        addCourses(newCourses)

        this.setState({...state})
    }

    removeCourses = (index) => () => {
        let { addCourses, formValues } = this.props
        let newCourses = _.reduce(_.get(formValues, "courses", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        addCourses(newCourses);
    }

    editCourses = (index, courses) => () => {

        let {
            type,
            name,
            provider,
            fromYear,
            toYear,
            expYear,
            currently,
            description,
            currentlyDisabled,
            haveCertificate,
            file,
            certificationName,
            licenseNumber,
            certificationUrl
        } = courses;

        let { addCourses, formValues } = this.props

        let newCourses = _.reduce(_.get(formValues, "courses", []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        
        addCourses(newCourses)
        
        this.setState({
            view: "new",
            coursesIndex: index,
            type:type,
            name:name,
            provider:provider,
            fromYear:fromYear,
            toYear:toYear,
            expYear: expYear,
            currently:currently,
            description:description,
            currentlyDisabled:currentlyDisabled,
            haveCertificate:haveCertificate,
            file:file,
            certificationName: certificationName,
            licenseNumber: licenseNumber,
            certificationUrl:certificationUrl
        });
    }

    validateUrl = (event) => {
        let value = event.target.value;
        if (value && !isValidURL(value)){
            this.setState({ certificationUrlError: 'Invalid certification url' });
        } else {
            this.setState({ certificationUrlError: '' });
        }
    }

    render (){

        let { view, type, name, provider, expYear, fromYear, toYear, currently, description, haveCertificate, file, fileIsLoading, 
            certificationName, licenseNumber, certificationUrl,
            fromYearError, toYearError, descriptionError, fileError, certificationUrlError
        } = this.state;

        let { classes, formValues, token } = this.props;

        const courseses = _.get(formValues, "courses", []);

        return (
            <Paper 
                id="courses-and-certificates" 
                className={classes.paper}
            >
                <Typography 
                    className={classes.title}
                    color="primary"
                >
                    Courses and Certificates
                </Typography>
                {
                    view === "main" ?
                        <Fragment>
                            {
                                courseses.map((courses, index) => 
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
                                                {courses.name}
                                            </Typography>
                                            <EditOutlined 
                                                color="secondary"
                                                className={classes.editBlockButton}
                                                onClick={this.editCourses(index, courses)}
                                            />
                                            <DeleteOutline 
                                                color="secondary"
                                                className={classes.deleteBlockButton} 
                                                onClick={this.removeCourses(index)}
                                            />
                                        </div>
                                        <div className={classes.mainBlock}>
                                            <Typography className={classes.blockSubtitle}>
                                                {courses.provider}
                                            </Typography>
                                            <Typography 
                                                color="secondary"
                                                className={classes.blockDate}
                                            >
                                                {
                                                    courses.type === "Course" && (courses.currently ? "Present" : format(Date.parse(courses.toYear), 'dd MMM yyyy'))
                                                }
                                                {
                                                    courses.type === "Certificate" && (format(Date.parse(courses.fromYear), 'dd MMM yyyy') + " - " + format(Date.parse(courses.toYear), 'dd MMM yyyy'))
                                                }
                                            </Typography>
                                            {
                                                courses.description && <Typography 
                                                    color="secondary"
                                                    className={classes.blockDescription}
                                                >
                                                    {courses.description}
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
                                Add courses and certificates
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
                                        label="Accomplishment type"
                                        name="type"
                                        options={[{value:"Course", label:"Course"}, {value:"Certificate", label:"Certificate"}]}
                                        value={type}
                                        handleUserInput={this.handleUserInput}
                                    />            
                                </Grid>
                                {
                                    type === "Course" &&
                                    <Fragment>
                                        <Grid 
                                            item
                                            xs={12}
                                            sm={6}
                                            className={classes.rightContainer}
                                        >  
                                            <InputText 
                                                label="Course name"
                                                name="name"
                                                value={name}
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
                                                label="Course provider"
                                                name="provider"
                                                value={provider}
                                                handleUserInput={this.handleUserInput}
                                            />            
                                        </Grid>
                                    </Fragment>
                                }
                                {
                                    type === "Certificate" &&
                                    <Fragment>
                                        <Grid 
                                            item
                                            xs={12}
                                            sm={6}
                                            className={classes.rightContainer}
                                        >  
                                            <InputText 
                                                label="Certificate name"
                                                name="name"
                                                value={name}
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
                                                label="Certification authority"
                                                name="provider"
                                                value={provider}
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
                                {
                                    type === "Certificate" &&
                                        <Fragment>
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
                                                    label="Date"
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
                                                    disabled={false}
                                                    setDate={this.setToYear}
                                                    label="Date"
                                                    error={toYearError}
                                                /> 
                                            </Grid>
                                            <Grid 
                                                item
                                                xs={12}
                                            >  
                                                <Typography 
                                                    className={classes.subtitle}
                                                    color="primary"
                                                >
                                                    Expiration
                                                </Typography> 
                                                <ExpirationField
                                                    value={expYear} 
                                                    setDate={this.setExpYear}
                                                    label="Date"
                                                    disabled={currently}
                                                />         
                                            </Grid>
                                            <Grid 
                                                item
                                                xs={12}
                                            >
                                                <CheckboxField 
                                                    name="currently"
                                                    label="This certification does not expire"
                                                    disabled={expYear !== null}
                                                    mb24
                                                    value={currently}
                                                    handleUserInput={this.handleUserInput}
                                                />
                                            </Grid>
                                        </Fragment>
                                }
                                {
                                    type === "Course" &&
                                        <Fragment>
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
                                                    Graduation Date
                                                </Typography>
                                                <DateField 
                                                    value={toYear} 
                                                    disabled={currently}
                                                    setDate={this.setToYear}
                                                    label="Date"
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
                                            <Grid 
                                                item
                                                xs={12}
                                            >
                                                <CheckboxField 
                                                    name="havecertificate"
                                                    label="I have a certificate"
                                                    mb24
                                                    value={haveCertificate}
                                                    handleUserInput={this.handleUserInput}
                                                />
                                            </Grid>
                                            {
                                                haveCertificate && 
                                                <Fragment>
                                                    <Grid 
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        className={classes.leftContainer}
                                                    >  
                                                        <InputText 
                                                            label="Certification name"
                                                            name="certificationname"
                                                            value={certificationName}
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
                                                            label="License number"
                                                            name="licensenumber"
                                                            value={licenseNumber}
                                                            handleUserInput={this.handleUserInput}
                                                        />    
                                                    </Grid>
                                                    <Grid 
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        className={classes.leftContainer}
                                                    >  
                                                        <InputUrl
                                                            label="Certification URL (optional)"
                                                            name="certificationurl"
                                                            value={certificationUrl}
                                                            error={certificationUrlError}
                                                            validate={this.validateUrl}
                                                            handleUserInput={this.handleUserInput}
                                                        />         
                                                    </Grid>
                                                    <Grid 
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        className={classes.rightContainer}
                                                    >  
                                                        <UploadField
                                                            file={file}
                                                            token={token}
                                                            fileError={fileError}
                                                            fileIsLoading={fileIsLoading}
                                                            setFile={this.setFile}
                                                            setFileError={this.setFileError}
                                                            setFileLoading={this.setFileLoading}
                                                        />
                                                    </Grid>
                                                </Fragment>
                                            }
                                        </Fragment>
                                }
                            </Grid>
                            <div className={haveCertificate ? classes.buttonsSectionMT24 : classes.buttonsSection}>
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    disabled={
                                        Boolean(fromYearError || toYearError || descriptionError || (haveCertificate ? certificationUrlError : null )) 
                                        || !Boolean(
                                            type && name && provider 
                                                && (type === "Certificate" ? fromYear && toYear : true) 
                                                && (haveCertificate ? (certificationName && licenseNumber) : true)
                                                && (type === "Course" ? toYear || currently : true)
                                        )
                                    }
                                    onClick={this.addUserCourses()}
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
    token: state.auth.token
})

export default connect(mapStateToProps,{})(withStyles(styles)(CoursesSection));