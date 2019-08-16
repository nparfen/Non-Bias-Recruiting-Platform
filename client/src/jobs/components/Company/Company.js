import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ReactPaginate from 'react-paginate';

import * as moment from 'moment';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';

import back from '../../assets/back.svg';
import next from '../../assets/next.svg';

import { changePage } from '../../ducks/actions'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        margin: "32px auto",
        "&$titleContainer":{
            marginTop: "0px",
            marginBottom: "8px",
        }
    },
    mainContainer: {
        marginTop: "0px",
        marginBottom: "70px",
        minHeight: "100vh",
    },
    titleContainer:{},
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "32px",
    },
    mainContent: {
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"
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
    divider: {
        marginTop: "8px",
        marginBottom: "24px"
    },
    noCandidatesMsg: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    jobPaper: {
        cursor: "pointer",
        marginTop: "24px",
        padding: "24px",
        paddingRight: "12px",
        paddingBottom: "16px",
        borderRadius: "3px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    paper: {
        marginTop: "16px",
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
    jobPaperDesc: {
        fontSize: "15px",
        fontWeight: "normal",
    },
    jobPaperSalary: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#8a8a8f",
        marginTop: "12px"
    },
    jobPaperDate: {
        marginTop: "20px",
        fontSize: "12px",
        fontWeight: "normal"
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
    active: {
        backgroundColor: "#4cd964",
        color: "white"
    },
    draft: {
        backgroundColor: "#5ac8fa",
        color: "white"
    },
    closed: {
        backgroundColor: "#c8c7cc",
        color: "white"
    },
    paperStatsSection: {
        display: "flex",
        // justifyContent: "space-between",
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
        marginTop: "48px",
        width: "100%"
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
        cursor: "pointer"
    },
    activeClassName: {
        cursor: "default"
    },
    previousClassName: {
        display: "inline-block",
        marginRight: "16px",
        verticalAlign: "sub",
        cursor: "pointer"
    },
    nextClassName: {
        display: "inline-block",
        marginLeft: "16px",
        verticalAlign: "sub",
        cursor: "pointer"
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
    tabsRoot: {
        width: "100%",
        borderBottom: '1px solid '+ theme.palette.secondary.light,
    },
    tabsIndicator: {
        height: "3px",
        backgroundColor: theme.palette.secondary.dark,
    },
    tabRoot: {
        marginRight: "45px",
        minWidth: "26px",
        fontSize: "18px",
        fontWeight: "bold",
        textTransform: 'capitalize',
        color: "#c8c7cc",
        '&:hover': {
            color: theme.palette.secondary,
            opacity: 1,
        },
        '&$tabSelected': {
            color: theme.palette.primary.main
        },
    },
    tabSelected: {},
    labelContainer: {
        fontSize: "20px",
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    labelCandidatesContainer: {
        fontSize: "17px",
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    tabsSection: {
        display: "flex",
        flexDirection: "row",
        alignItems:"center"
    },
    createButton: {
        height: 50,
        borderRadius: 3,
        border: 0,
        marginLeft: "50px",
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        }
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
    candidatesContainer: {
        height: "100%",
        paddingTop: "8px",
        [theme.breakpoints.up('sm')]: {
            paddingTop: "24px",
        }
    },
    candidatesContent: {
        backgroundColor: "#f9f9f9",
        height: "100%",
    },
    candidatesTabsContainer: {
        padding: "16px",
        paddingBottom: "0px"
    },
    candidatesList: {
        overflowY: "scroll",
        height: "1408px",
        paddingTop: "0px",
        padding: "16px"
    },
    menuMore: {
        marginLeft: "4px",
        "&:hover": {
            backgroundColor : "transparent"
        }
    },
    noJobsMsg: {
        marginTop: "24px",
        fontSize: "15px",
        fontWeight: "normal"
    },
    progress: {
        marginTop: "200px",
        zIndex: "-1",
        margin: theme.spacing.unit * 2,
    },
});

const numberWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

class CompanyJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsTabValue: "all",
            candidatesTabValue: "matching"
        };
    }

    componentDidMount() {
        const { jobsTabValue } = this.state
        const { changePage } = this.props
        changePage(1, jobsTabValue)
    }

    handleJobsChange = (event, jobsTabValue) => {
        const { changePage } = this.props
        
        this.setState({ jobsTabValue, candidatesTabValue: "matching" });
        changePage(1, jobsTabValue)
    }

    handleCandidatesChange = (event, value) => this.setState({ candidatesTabValue: value });

    handlePageClick = page => {
        const { jobsTabValue } = this.state
        const { changePage } = this.props
        changePage(page.selected + 1, jobsTabValue)
    }

    render() {

        const { jobsTabValue, candidatesTabValue } = this.state;
        const { classes, redux: { jobs, pageCount, page, loading, error } } = this.props;

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
                            Jobs
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
                        className={classes.mainContent}
                    >
                        <div>
                            <Grid 
                                container
                                direction="row"
                            >
                                <Grid 
                                    item
                                    xs={12}
                                >
                                    <div className={classes.tabsSection}>
                                        <Tabs
                                            scrollable
                                            variant="scrollable"
                                            scrollButtons="off"
                                            value={jobsTabValue} 
                                            onChange={this.handleJobsChange}
                                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                        >
                                            <Tab
                                                disableRipple
                                                value="all"
                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelContainer }}
                                                label="All Jobs"
                                            />
                                            <Tab
                                                disableRipple
                                                value="active"
                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelContainer }}
                                                label="Active"
                                            />
                                            <Tab
                                                disableRipple
                                                value="draft"
                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelContainer }}
                                                label="Draft"
                                            />
                                            <Tab
                                                disableRipple
                                                value="closed"
                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelContainer }}
                                                label="Closed"
                                            />
                                        </Tabs>
                                        <Button 
                                            className={classes.createButton}
                                            type="button"
                                            variant="contained" 
                                            color="primary"
                                            component={Link}
                                            to="jobs/create"
                                        >
                                            Create job
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            {loading && <Grid 
                                container
                                spacing={16}
                                alignItems="center"
                                direction="row"
                                justify="center"
                            >
                                <CircularProgress className={classes.progress} />
                            </Grid>}
                            {!loading && !error && <Grid 
                                container
                                spacing={16}
                                direction="row"
                            >
                                {
                                    jobs.length === 0 && 
                                    <Grid item>
                                        <Typography
                                            className={classes.noJobsMsg}
                                            color="secondary"
                                        >
                                            {jobsTabValue === "all" &&  <Fragment>You don’t have any job yet.<br />Start posting by clicking the button "Create job".</Fragment>}
                                            {jobsTabValue === "active" &&  <Fragment>You don’t have any active job yet.<br />Start posting by clicking the button "Create job".</Fragment>}
                                            {jobsTabValue === "draft" &&  <Fragment>You don’t have any draft job yet.<br />Start posting by clicking the button "Create job".</Fragment>}
                                            {jobsTabValue === "closed" &&  <Fragment>You don’t have any closed job yet.<br />Start posting by clicking the button "Create job".</Fragment>}
                                        </Typography>
                                    </Grid>
                                }
                                { 
                                    jobs.length > 0 &&
                                    <Grid 
                                        item
                                        xs={12}
                                        sm={5}
                                        className={classNames(classes.leftContainer, classes.displayFlex)}
                                    >
                                        {
                                            jobs.map((element, index) => <Grid 
                                                key={index}
                                                item
                                                xs={12}
                                            >
                                                {/* <Paper className={classes.jobPaper} onClick={() => "id:"+element._id}> */}
                                                <Paper className={classes.jobPaper}>
                                                    <div className={classes.paperTitleSection}>
                                                        <Typography 
                                                            className={classes.paperTitle}
                                                            color="primary"
                                                        >
                                                            {element.data.jobtitle}
                                                        </Typography>
                                                        <div>
                                                            {element.status === "active" && 
                                                                <Chip
                                                                    label="Active"
                                                                    className={classNames(classes.chip, classes.active)}
                                                                    variant="default"
                                                                />
                                                            }
                                                            {element.status === "draft" &&
                                                                <Chip
                                                                    label="Draft"
                                                                    className={classNames(classes.chip, classes.draft)}
                                                                    variant="default"
                                                                />
                                                            }
                                                            {element.status === "closed" &&
                                                                <Chip
                                                                    label="Closed"
                                                                    className={classNames(classes.chip, classes.closed)}
                                                                    variant="default"
                                                                />
                                                            }
                                                            {/* <IconButton className={classes.menuMore} onClick={(event) => { "Menu opens for:"+element._id;  event.stopPropagation();}}> */}
                                                            <IconButton className={classes.menuMore}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                    <Typography
                                                        className={classes.jobPaperDesc}
                                                        color="secondary"
                                                    >
                                                        {element.data.company}<span className={classes.dot}/>{element.data.city.address ? element.data.city.address : "N/A"}
                                                    </Typography>
                                                    {element.data.salary.from && element.data.salary.period && 
                                                        <Typography
                                                            className={classes.jobPaperSalary}
                                                            color="secondary"
                                                        >
                                                            £{numberWithSpaces(element.data.salary.from)} {element.data.salary.to && `– £${numberWithSpaces(element.data.salary.to)} ` }{element.data.salary.period}
                                                        </Typography>
                                                    }
                                                    <Typography
                                                        className={classes.jobPaperDate}
                                                        color="secondary"
                                                    >
                                                        {moment(element.createdAt).locale("en").fromNow()}
                                                    </Typography>
                                                </Paper>
                                            </Grid>)
                                        }
                                    </Grid>
                                }
                                { 
                                    jobs.length > 0 &&
                                    <Grid 
                                        item
                                        xs={12}
                                        sm={7}
                                        className={classes.rightContainer}
                                    >
                                        <Grid 
                                            item
                                            xs={12}
                                            className={classes.candidatesContainer}
                                        >
                                            <div className={classes.candidatesContent}>
                                                <div className={classes.candidatesTabsContainer}>
                                                    <Tabs
                                                        scrollable
                                                        variant="scrollable"
                                                        scrollButtons="off"
                                                        value={candidatesTabValue} 
                                                        onChange={this.handleCandidatesChange}
                                                        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                                    >
                                                        <Tab
                                                            disableRipple
                                                            value="matching"
                                                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelCandidatesContainer }}
                                                            label="Best Matching"
                                                        />
                                                        <Tab
                                                            disableRipple
                                                            value="applicants"
                                                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelCandidatesContainer }}
                                                            label="Applicants"
                                                        />
                                                        <Tab
                                                            disableRipple
                                                            value="interviewing"
                                                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelCandidatesContainer }}
                                                            label="Interviewing"
                                                        />
                                                        <Tab
                                                            disableRipple
                                                            value="declined"
                                                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.labelCandidatesContainer }}
                                                            label="Declined"
                                                        />
                                                    </Tabs>
                                                </div>
                                                <div className={classes.candidatesList}>
                                                    <Typography
                                                        className={classes.noJobsMsg}
                                                        color="secondary"
                                                    >
                                                        {candidatesTabValue === "matching" &&  <>Here will be matching results.</>}
                                                        {candidatesTabValue === "applicants" &&  <>Here will be applicants results.</>}
                                                        {candidatesTabValue === "interviewing" &&  <>Here will be interviewing results.</>}
                                                        {candidatesTabValue === "declined" && <>Here will be declined results.</>}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                            }
                        </div>
                        {!loading && !error && jobs.length > 0 && <div className={classes.paginationContainer}>
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
        )
    }
}

const mapStateToProps = (state) => ({
    redux: {
        jobs: state.jobs.jobs,
        candidates: state.jobs.candidates,
        pageCount: state.jobs.pageCount,
        page: state.jobs.page,
        error: state.jobs.error,
        loading: state.jobs.loading
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePage: (page, status) => dispatch(changePage(page, status)),
        // doShortlist: (id, page) => dispatch(doShortlist(id, page))
    };
};

CompanyJobs = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'CompanyJobsForm',
})(CompanyJobs)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CompanyJobs));