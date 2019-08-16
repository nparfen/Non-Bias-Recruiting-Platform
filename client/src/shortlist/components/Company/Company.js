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

import SelectField from './fields/Select';
import Chart from './Chart';

import starActive from '../../assets/shape-active.svg'
import back from '../../assets/back.svg';
import next from '../../assets/next.svg';

// import { changePage, removeFromShortlist } from '../../ducks/actions'

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
});

class CompanyShortlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: ""
        }
    }

    // componentDidMount() {
    //     const { status } = this.state
    //     const { changePage } = this.props
    //     changePage(1, status)
    // }

    // handlePageClick = page => {
    //     const { status } = this.state
    //     const { changePage } = this.props
    //     changePage(page.selected + 1, status)
    // }

    handleStatusChange = status => {
        // const { changePage } = this.props
        this.setState({ status })
        // changePage(1, status)
    }

    render() {

        const { status } = this.state
        const { classes, redux: { candidates, pageCount, page } } = this.props;

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
                            Shortlist
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
                                    sm={6}
                                    md={3}
                                    className={classes.leftContainer}
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
                            </Grid>
                            <Divider className={classes.divider} />
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
                                            There is no candidates in your shortlist
                                        </Typography>
                                    </Grid>
                                }
                                {
                                    candidates.map((element, index) => <Grid 
                                        key={index}
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <Paper className={classes.paper}>
                                            <div className={classes.paperTitleSection}>
                                                <Typography 
                                                    className={classes.paperTitle}
                                                    color="primary"
                                                >
                                                    {element.name}
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
                                                {element.desc}
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
                                                    percentage={element.skills}
                                                    width={45}
                                                    height={45}
                                                />
                                                <Chart 
                                                    name="Culture"
                                                    percentage={element.culture}
                                                    width={45}
                                                    height={45}
                                                />
                                                <Chart 
                                                    name="Values"
                                                    percentage={element.values}
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
                                                    onClick={() => toast.warn("😔 Unfortunately, the shortlist remove function is currently not available.")}
                                                    // onClick={() => {removeFromShortlist(element.id, status); toast("Removed from shortlist!")}}
                                                >
                                                    <img 
                                                        src={starActive} 
                                                        alt="favorite" 
                                                        className={classes.star}
                                                    />
                                                </IconButton>
                                            </div>
                                        </Paper>
                                    </Grid>)
                                }
                            </Grid>
                        </div>
                        {candidates.length > 0 && <div className={classes.paginationContainer}>
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
        candidates: state.shortlist.candidates,
        pageCount: state.shortlist.pageCount,
        page: state.shortlist.page
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // changePage: (page, status) => dispatch(changePage(page, status)),
        // removeFromShortlist: (id, status) => dispatch(removeFromShortlist(id, status))
    };
};

CompanyShortlist = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'ShortlistSearchForm',
})(CompanyShortlist)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CompanyShortlist));