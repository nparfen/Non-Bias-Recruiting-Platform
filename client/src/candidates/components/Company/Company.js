import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ReactPaginate from 'react-paginate';

import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from './fields/Text';
import SelectField from './fields/Select';
import CheckboxField from './fields/Checkbox';
import Chart from './Chart';

import starActive from '../../assets/shape-active.svg'
import starDisabled from '../../assets/shape.svg'
import back from '../../assets/back.svg';
import next from '../../assets/next.svg';

import { changePage } from '../../ducks/actions'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        margin: "32px auto",
        "&$titleContainer":{
            marginTop: "0px",
        }
    },
    mainContainer: {
        marginTop: "0px",
        marginBottom: "70px",
        minHeight: "100vh",
    },
    displayFlex: {
        display: "flex",
        marginBottom: "8px",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "0px",
        },
    },
    filterContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#f7f7f7",
        padding: "16px 24px",
    },
    filterTitle: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    filterSubtitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "12px",
    },
    filterParamsContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "12px",
    },
    titleContainer:{},
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "32px",
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    rightContent: {
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    middleContainer: {
        paddingLeft: "0px",
        paddingRight: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
            paddingLeft: "12px",
        },
    },
    divider: {
        marginTop: "8px",
        marginBottom: "24px"
    },
    noCandidatesMsg: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    paper: {
        padding: "24px",
        paddingBottom: "16px",
        borderRadius: "3px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    paperTitleSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center",
        marginBottom: "6px"
    },
    paperTitle: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    paperDesc: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "8px"
    },
    chip: {
        height: "28px",
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: "normal",
    },
    applied: {
        color: "#179bff",
        borderColor: "#179bff"
    },
    interviewing: {
        color: "#ffcc00",
        borderColor: "#ffcc00"
    },
    declined: {
        color: "#ff2d55",
        borderColor: "#ff2d55"
    },
    hired: {
        color: "#2fcc71",
        borderColor: "#2fcc71"
    },
    paperStatsSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center"
    },
    paperButtonsSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    button: {
        height: 40,
        borderRadius: 3,
        border: 0,
        marginRight: "24px",
        marginBottom: "8px",
        padding: "0 16px",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
    outlinedButton: {
        marginTop: "0px",
        marginRight: "0px",
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        }
    },
    viewProfile: {
        border: 0,
        padding: 0,
        fontSize: "16px",
        fontWeight: "normal",
        textDecoration: "underline",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        marginBottom: "16px",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
            textDecoration: "underline",
        },
    },
    starButton: {
        minWidth: "fit-content",
        objectFit: "contain",
        padding: "0",
        marginBottom: "8px",
        "&:hover": {
            backgroundColor : "transparent"
        }
    },
    star: {
        width: "40px",
        height: "40px"
    },
    paginationContainer: {
        textAlign: "center",
        marginTop: "48px"
    },
    pagination: {
        display: "inline-block",
        margin: "0px",
        padding: "0px"
    },
    pageClassName: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        margin: "0 8px", 
    },
    activeClassName: {
        cursor: "default"
    },
    previousClassName: {
        display: "inline-block",
        marginRight: "16px",
        verticalAlign: "sub",
        cursor: "pointer",
    },
    nextClassName: {
        display: "inline-block",
        marginLeft: "16px",
        verticalAlign: "sub",
        cursor: "pointer",
    },
    pageLinkClassName: {
        padding: "0 8px",
        // cursor: "pointer",
        outline: "none",
        fontFamily: "SF Display"
    },
    activeLinkClassName: {
        borderRadius: "2px",
        border: "solid 1px #c8c7cc",
        backgroundColor: "#efeff4",
    },
    iconDisabled:{
        opacity: 0.26,
        cursor: "default"
    },
    progress: {
        marginTop: "200px",
        zIndex: "-1",
        margin: theme.spacing.unit * 2,
    },
});

const industryData = [
    { name: "industry1", label: "Industry 1"}, 
    { name: "industry2", label: "Industry 2"}, 
    { name: "industry3", label: "Industry 3"}, 
    { name: "industry4", label: "Industry 4"}, 
    { name: "industry5", label: "Industry 5"}
]

const jobTypeData = [
    { name: "fulltime", label: "Full-time"},
    { name: "permanent", label: "Permanent"},
    { name: "contract", label: "Contract"},
    { name: "temporary", label: "Temporary"},
    { name: "parttime", label: "Part-time"},
]

const seniorityLevelData = [
    { name: "trainee", label: "Trainee"},
    { name: "lowjunior", label: "Low Junior"},
    { name: "middlejunior", label: "Middle Junior"},
    { name: "highjunior", label: "High Junior"},
    { name: "lowmiddle", label: "Low middle"},
]

const yearsOfExperienceData = [
    { name: "noexperience", label: "No experience"},
    { name: "lessthanoneyear", label: "Less than 1 year"},
    { name: "onethreeyears", label: "1–3 years"},
    { name: "threefiveyears", label: "3–5 years"},
    { name: "morethanfiveyears", label: "More than 5 years"},
]

const educationData = [
    { name: "noeducation", label: "No education"},
    { name: "education1", label: "Education 1"},
    { name: "education2", label: "Education 2"},
    { name: "education3", label: "Education 3"},
    { name: "education4", label: "Education 4"},
]

class CompanyCandidates extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: "",
            text: "",
            city: "",
            industry: [
                { industry1: false }, 
                { industry2: false }, 
                { industry3: false }, 
                { industry4: false }, 
                { industry5: false }
            ],
            jobtype: [
                { fulltime: false }, 
                { permanent: false }, 
                { contract: false }, 
                { temporary: false }, 
                { parttime: false }
            ],
            senioritylevel: [
                { trainee: false }, 
                { lowjunior: false }, 
                { middlejunior: false }, 
                { highjunior: false }, 
                { lowmiddle: false }
            ],
            yearsofexperience: [
                { noexperience: false }, 
                { lessthanoneyear: false }, 
                { onethreeyears: false }, 
                { threefiveyears: false }, 
                { morethanfiveyears: false }
            ],
            education: [
                { noeducation: false }, 
                { education1: false }, 
                { education2: false }, 
                { education3: false }, 
                { education4: false }
            ]
        }
    }

    componentDidMount() {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    // handleShortlist = id => {
    //     const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
    //     const { doShortlist, page } = this.props
        
    //     doShortlist(id, page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    // }

    handlePageClick = page => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props
        changePage(page.selected + 1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    keyPress = e => {
        if(e.keyCode === 13){
            const { status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
            const { changePage } = this.props
            this.setState({ text: e.target.value })
            changePage(1, e.target.value, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
        }
    }

    handleSearchClick = text => {
        const { status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props
        this.setState({ text })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleStatusChange = status => {
        const { text, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props
        this.setState({ status })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleCityChange = city => {
        const { text, status, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props
        this.setState({ city })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleIndustryChange = (key, name, value) => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props

        const newIndustry = {}
        newIndustry[name] = value

        industry.splice(key, 1, newIndustry)
        this.setState({ industry })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleJobTypeChange = (key, name, value) => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props

        const newJobType = {}
        newJobType[name] = value

        jobtype.splice(key, 1, newJobType)
        this.setState({ jobtype })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleSeniorityLevelChange = (key, name, value) => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props

        const newSeniorityLevel = {}
        newSeniorityLevel[name] = value

        senioritylevel.splice(key, 1, newSeniorityLevel)
        this.setState({ senioritylevel })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleYearsOfExperienceChange = (key, name, value) => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props

        const newYearsOfExperience = {}
        newYearsOfExperience[name] = value

        yearsofexperience.splice(key, 1, newYearsOfExperience)
        this.setState({ yearsofexperience })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    handleEducationChange = (key, name, value) => {
        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { changePage } = this.props

        const newEducation = {}
        newEducation[name] = value

        education.splice(key, 1, newEducation)
        this.setState({ education })
        changePage(1, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)
    }

    render() {

        const { text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education } = this.state
        const { classes, redux: { candidates, pageCount, page, loading, error } } = this.props;

        return (
            <Fragment>
                <Grid 
                    container
                    direction="row"
                    className={classNames(classes.container, classes.titleContainer)}
                >
                    <Grid 
                        item
                        xs={12}
                    >
                        <Typography 
                            color="primary"
                            className={classes.title}
                        >
                            Candidates
                        </Typography>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="row"
                    className={classNames(classes.container, classes.mainContainer)}
                >
                    <Grid 
                        item
                        xs={12}
                        sm={3}
                        className={classNames(classes.leftContainer, classes.displayFlex)}
                    >
                        <div className={classes.filterContainer}>
                            <Typography
                                color="primary"
                                className={classes.filterTitle}
                            >
                                Sort by
                            </Typography>
                            <Typography
                                color="primary"
                                className={classes.filterSubtitle}
                            >
                                Industry
                            </Typography>
                            <div className={classes.filterParamsContainer}>
                                {
                                    industryData.map((element, index) =>
                                        <CheckboxField 
                                            key={index}
                                            index={index}
                                            name={element.name}
                                            label={element.label}
                                            value={industry[index][element.name]}
                                            handleCheckboxChange={this.handleIndustryChange}
                                        />
                                    )
                                }
                            </div>
                            <Typography
                                color="primary"
                                className={classes.filterSubtitle}
                            >
                                Job type
                            </Typography>
                            <div className={classes.filterParamsContainer}>
                                {
                                    jobTypeData.map((element, index) =>
                                        <CheckboxField 
                                            key={index}
                                            index={index}
                                            name={element.name}
                                            label={element.label}
                                            value={jobtype[index][element.name]}
                                            handleCheckboxChange={this.handleJobTypeChange}
                                        />
                                    )
                                }
                            </div>
                            <Typography
                                color="primary"
                                className={classes.filterSubtitle}
                            >
                                Seniority level
                            </Typography>
                            <div className={classes.filterParamsContainer}>
                                {
                                    seniorityLevelData.map((element, index) =>
                                        <CheckboxField 
                                            key={index}
                                            index={index}
                                            name={element.name}
                                            label={element.label}
                                            value={senioritylevel[index][element.name]}
                                            handleCheckboxChange={this.handleSeniorityLevelChange}
                                        />
                                    )
                                }
                            </div>
                            <Typography
                                color="primary"
                                className={classes.filterSubtitle}
                            >
                                Years of experience
                            </Typography>
                            <div className={classes.filterParamsContainer}>
                                {
                                    yearsOfExperienceData.map((element, index) =>
                                        <CheckboxField 
                                            key={index}
                                            index={index}
                                            name={element.name}
                                            label={element.label}
                                            value={yearsofexperience[index][element.name]}
                                            handleCheckboxChange={this.handleYearsOfExperienceChange}
                                        />
                                    )
                                }
                            </div>
                            <Typography
                                color="primary"
                                className={classes.filterSubtitle}
                            >
                                Education
                            </Typography>
                            <div className={classes.filterParamsContainer}>
                                {
                                    educationData.map((element, index) =>
                                        <CheckboxField 
                                            key={index}
                                            index={index}
                                            name={element.name}
                                            label={element.label}
                                            value={education[index][element.name]}
                                            handleCheckboxChange={this.handleEducationChange}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid 
                        item
                        xs={12}
                        sm={9}
                        className={classNames(classes.rightContainer, classes.rightContent)}
                    >
                        <div>
                            <Grid 
                                container
                                direction="row"
                            >  
                                <Grid 
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.leftContainer}
                                >  
                                    <SelectField 
                                        name="city" 
                                        label="City"
                                        options={[
                                            {value:"New York", label:"New York"},
                                            {value:"Madrid", label:"Madrid"},
                                            {value:"Rome", label:"Rome"}
                                        ]}
                                        value={city}
                                        handleSelectChange={this.handleCityChange}
                                    />
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.middleContainer}
                                >  
                                    <SelectField 
                                        name="sort" 
                                        label="All candidate statuses"
                                        options={[
                                            {value: "applied", label: "Applied"},
                                            {value: "interviewing", label: "Interviewing"},
                                            {value: "hired", label: "Hired"},
                                            {value: "declined", label: "Declined"},
                                            {value: "no-status", label: "No status"}
                                        ]}
                                        value={status}
                                        handleSelectChange={this.handleStatusChange}
                                    />
                                </Grid>
                                <Grid 
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.rightContainer}
                                >
                                    <TextField
                                        name="search" 
                                        label="Search"
                                        text={text}
                                        handleSearchClick={this.handleSearchClick}
                                        keyPress={this.keyPress}
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                            {loading && <Grid 
                                container
                                spacing={24}
                                alignItems="center"
                                direction="row"
                                justify="center"
                            >
                                <CircularProgress className={classes.progress} />
                            </Grid>}
                            {!loading && !error && 
                                <Grid 
                                    container
                                    spacing={24}
                                    direction="row"
                                >
                                    {
                                        candidates.length === 0 && 
                                        <Grid item>
                                            <Typography
                                                className={classes.noCandidatesMsg}
                                                color="primary"
                                            >
                                                There is no candidates
                                            </Typography>
                                        </Grid>
                                    }
                                    {
                                        candidates.map((element, index) => <Grid 
                                            key={index}
                                            item
                                            xs={12}
                                            sm={6}
                                        >
                                            <Paper className={classes.paper}>
                                                <div className={classes.paperTitleSection}>
                                                    <Typography 
                                                        className={classes.paperTitle}
                                                        color="primary"
                                                    >
                                                        {element.data.position ? element.data.position : "N/A"}
                                                    </Typography>
                                                    {element.status === "applied" && 
                                                        <Chip
                                                            label="Applied"
                                                            className={classNames(classes.chip, classes.applied)}
                                                            variant="outlined"
                                                        />
                                                    }
                                                    {element.status === "interviewing" &&
                                                        <Chip
                                                            label="Interviewing"
                                                            className={classNames(classes.chip, classes.interviewing)}
                                                            variant="outlined"
                                                        />
                                                    }
                                                    {element.status === "declined" &&
                                                        <Chip
                                                            label="Declined"
                                                            className={classNames(classes.chip, classes.declined)}
                                                            variant="outlined"
                                                        />
                                                    }
                                                    {element.status === "hired" &&
                                                        <Chip
                                                            label="Hired"
                                                            className={classNames(classes.chip, classes.hired)}
                                                            variant="outlined"
                                                        />
                                                    }
                                                    {element.status === "no-status" &&
                                                        <div/>
                                                    }
                                                </div>
                                                <Typography
                                                    className={classes.paperDesc}
                                                    color="secondary"
                                                >
                                                    {element.data.description ? element.data.description.substring(0, 140) + '...' : "N/A"}
                                                </Typography>
                                                <Button 
                                                    className={classes.viewProfile}
                                                    color="secondary"
                                                    disableRipple={true}
                                                >
                                                    View profile
                                                </Button>
                                                <div className={classes.paperStatsSection}>
                                                    <Chart 
                                                        name="Skills"
                                                        percentage={0}
                                                        width={45}
                                                        height={45}
                                                        isNull
                                                    />
                                                    <Chart 
                                                        name="Culture"
                                                        percentage={0}
                                                        width={45}
                                                        height={45}
                                                    />
                                                    <Chart 
                                                        name="Values"
                                                        percentage={0}
                                                        width={45}
                                                        height={45}
                                                    />
                                                </div>
                                                <div className={classes.paperButtonsSection}>
                                                    {element.status === "no-status" && 
                                                        <Button 
                                                            className={classes.button}
                                                            variant="contained" 
                                                            color="primary"
                                                            onClick={() => toast.warn("😔 Unfortunately, the invitation send function is currently not available.")}
                                                        >
                                                            Invite to apply
                                                        </Button>
                                                    }
                                                    {element.status === "interviewing" && 
                                                        <div>
                                                            <Button 
                                                                className={classes.button}
                                                                variant="contained" 
                                                                color="primary"
                                                                onClick={() => toast.warn("😔 Unfortunately, the offer make function is currently not available.")}
                                                            >
                                                                Make offer
                                                            </Button>
                                                            <Button 
                                                                className={classNames(classes.button, classes.outlinedButton)}
                                                                variant="outlined" 
                                                                color="secondary"
                                                                onClick={() => toast.warn("😔 Unfortunately, the decline function is currently not available.")}
                                                            >
                                                                Decline
                                                            </Button>
                                                        </div>
                                                    }
                                                    {element.status === "applied" && 
                                                        <div>
                                                            <Button 
                                                                className={classes.button}
                                                                variant="contained" 
                                                                color="primary"
                                                                onClick={() => toast.warn("😔 Unfortunately, the accept function is currently not available.")}
                                                            >
                                                                Accept
                                                            </Button>
                                                            <Button 
                                                                className={classNames(classes.button, classes.outlinedButton)}
                                                                variant="outlined" 
                                                                color="secondary"
                                                                onClick={() => toast.warn("😔 Unfortunately, the decline function is currently not available.")}
                                                            >
                                                                Decline
                                                            </Button>
                                                        </div>
                                                    }
                                                    {element.status === "hired" && 
                                                        <div />
                                                    }
                                                    {element.status === "declined" && 
                                                        <Button 
                                                            className={classes.button}
                                                            variant="contained" 
                                                            color="primary"
                                                            onClick={() => toast.warn("😔 Unfortunately, the accept function is currently not available.")}
                                                        >
                                                            Accept
                                                        </Button>
                                                    }
                                                    <IconButton 
                                                        aria-label="Favorite"
                                                        disableRipple
                                                        className={classes.starButton}
                                                        onClick={() => toast.warn("😔 Unfortunately, the shortlist add function is currently not available.")}
                                                        // onClick={() => {this.handleShortlist(element.id); element.inShortlist ? toast("Removed from shortlist!") : toast("Added to shortlist!")}}
                                                    >
                                                        <img 
                                                            src={element.inShortlist ? starActive : starDisabled} 
                                                            alt="favorite" 
                                                            className={classes.star}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </Paper>
                                        </Grid>)
                                    }
                                </Grid>
                            }
                        </div>
                        {!loading && !error && candidates.length > 0 && <div className={classes.paginationContainer}>
                            <ReactPaginate
                                previousLabel={
                                    <img 
                                        src={back} 
                                        alt="back"
                                    />
                                }
                                nextLabel={
                                    <img 
                                        src={next} 
                                        alt="next"
                                    />
                                }
                                breakLabel={'...'}
                                breakClassName={classes.pageClassName}
                                breakLinkClassName={classes.pageLinkClassName}
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                disableInitialCallback
                                
                                initialPage={0}
                                forcePage={page - 1}
                                onPageChange={this.handlePageClick}

                                disabledClassName={classes.iconDisabled}
                                containerClassName={classes.pagination}

                                pageClassName={classes.pageClassName}
                                pageLinkClassName={classes.pageLinkClassName}

                                activeClassName={classes.activeClassName}
                                previousClassName={classes.previousClassName}
                                previousLinkClassName={classes.pageLinkClassName}
                                nextClassName={classes.nextClassName}
                                nextLinkClassName={classes.pageLinkClassName}

                                activeLinkClassName={classes.activeLinkClassName}
                            />
                        </div>}
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    redux: {
        candidates: state.candidates.candidates,
        loading: state.candidates.loading,
        error: state.candidates.error,
        pageCount: state.candidates.pageCount,
        page: state.candidates.page
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // changePage: (page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education) => dispatch(changePage(page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education)),
        changePage: (page, text) => dispatch(changePage(page, text)),
        // doShortlist: (id, page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education) => dispatch(doShortlist(id, page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education))
    };
};

CompanyCandidates = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'CandidatesSearchForm',
})(CompanyCandidates)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CompanyCandidates));