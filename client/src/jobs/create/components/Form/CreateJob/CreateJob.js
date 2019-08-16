import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { replace } from 'connected-react-router';
import _ from 'lodash';

import classNames from 'classnames';

import { Events, scrollSpy } from 'react-scroll';

import SidebarSection from './Sidebar';
import JobInformationSection from './JobInformation';
import JobDetailsSection from './JobDetails';
import JobDescriptionSection from './JobDescription';
import CandidateRequirementsSection from './CandidateRequirements';
import AdditionalInformationSection from './AdditionalInformation';
import PreviewSection from './Preview';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import validate from './validation';

import { changeCreateJobPage } from '../../../ducks/actions'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        margin: "32px auto",
        paddingLeft: '24px',
        paddingRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            paddingLeft: '0px',
            paddingRight: '0px',
        },
        "&$titleContainer":{
            marginTop: "0px",
        }
    },
    titleContainer:{},
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "32px",
    },
    buttonsSection: {
        position: "sticky",
        bottom: 0,
        zIndex: 6,
        minHeight: "80px", 
        backgroundColor: "#ffffff",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems:"center",
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        marginLeft: "24px",
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
    outlinedButton: {
        marginTop: "0px",
        marginLeft: "0px",
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        }
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
});

class CreateJobForm extends Component {
    
    componentDidMount () {
        Events.scrollEvent.register('begin', function () {})
        Events.scrollEvent.register('end', function () {})
        scrollSpy.update()
    }

    componentWillUnmount () {
        Events.scrollEvent.remove('begin')
        Events.scrollEvent.remove('end')
    }

    render() {

        const { 
            classes, redux: { page, formName, profile }, 
            changeStatus, changeCreateJobPage, setCoords, addSkills, addTags, goBack,
            handleSubmit, pristine, submitting, invalid 
        } = this.props;

        return (
            page === "form" ?
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
                                Create Post
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        className={classes.container}
                    >
                        <SidebarSection />
                        <Grid 
                            item
                            xs={12}
                            sm={9}
                            className={classes.rightContainer}
                        >   
                            <form onSubmit={handleSubmit}>
                                <JobInformationSection 
                                    previewDisabled={submitting || invalid}
                                    changeToPreview={() => changeCreateJobPage("view")}
                                    setCoords={setCoords}
                                />
                                <JobDetailsSection />
                                <JobDescriptionSection />
                                <CandidateRequirementsSection 
                                    formName={formName}
                                    addSkills={addSkills}
                                />
                                <AdditionalInformationSection
                                    formName={formName}
                                    profile={profile}
                                    addTags={addTags}
                                />
                                {!(pristine || invalid) &&
                                    <div className={classes.buttonsSection}>
                                        <Button 
                                            className={classNames(classes.button, classes.outlinedButton)}
                                            type="button"
                                            variant="outlined" 
                                            color="secondary"
                                            onClick={goBack} 
                                            disabled={submitting}
                                        >
                                            Leave
                                        </Button>
                                        <Button 
                                            className={classes.button}
                                            type="submit"
                                            variant="contained" 
                                            color="primary"
                                            disabled={submitting}
                                            onClick={() => changeStatus('draft')}
                                        >
                                            Save as draft
                                        </Button>
                                        <Button 
                                            className={classes.button}
                                            type="submit"
                                            variant="contained" 
                                            color="primary"
                                            disabled={submitting}
                                            onClick={() => changeStatus('active')}
                                        >
                                            Publish
                                        </Button>
                                    </div>
                                }
                            </form>
                        </Grid>
                    </Grid>
                </Fragment>
                :
                <PreviewSection
                    submit={handleSubmit} 
                    changeToForm={() => changeCreateJobPage("form")}
                    formName={formName}
                    pristine={pristine} 
                    submitting={submitting}
                    profile={profile}
                />
        );
    }
}

const mapStateToProps = (state) => ({
    redux: {
        page: state.createJob.page,
        formName: "CreateJobForm",
        profile: state.user.data
    },
    initialValues: {
        company: state.user.data.companyname,
        city: {
            address: "",
            coords: ""
        },
        salary: {
            from: "",
            to: "",
            period: ""
        },
        skills: [],
        perksandbenefits: {
            worklifebalance: _.get(state.user.data.perksandbenefits, "worklifebalance", []),
            compensation: _.get(state.user.data.perksandbenefits, "compensation", []),
            environmentcommunity: _.get(state.user.data.perksandbenefits, "environmentcommunity", []),
            wealthhealth: _.get(state.user.data.perksandbenefits, "wealthhealth", []),
            developmentgrowth: _.get(state.user.data.perksandbenefits, "developmentgrowth", [])
        },
        showcompany: true
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCreateJobPage: (page) => dispatch(changeCreateJobPage(page)),
        setCoords: (value) => dispatch(change('CreateJobForm', 'city.coords', value)),
        addSkills: (value) => dispatch(change('CreateJobForm', 'skills', value)),
        addTags: (name, value) => dispatch(change('CreateJobForm', name, value)),
        goBack: () => dispatch(replace("/jobs"))
    };
};

CreateJobForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'CreateJobForm',
    validate
})(CreateJobForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CreateJobForm));