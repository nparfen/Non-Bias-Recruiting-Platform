import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

import { Events, scrollSpy } from 'react-scroll';

import SidebarSection from './Sidebar';
import PersonalInformationSection from './PersonalInformation';
import ProfileInformationSection from './ProfileInformation';
import WorkExperienceSection from './WorkExperience';
import SkillsSection from './Skills';
import EducationSection from './Education';
import CoursesAndCertificatesSection from './CoursesAndCertificates';
import PerksAndBenefitsSection from './PerksAndBenefits';
import AssessmentSection from './Assessment';
import AccomplishmentsSection from './Accomplishments';
import PreviewSection from './Preview';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import validate from './validation';

import { changeProfilePage } from '../../../ducks/actions'

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
        height: 50,
        borderRadius: 3,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        marginTop: "0px",
        marginLeft: "0px",
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        },
        '&:disabled':{
            border: "solid 2px"
        },
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
});

class CandidateProfileForm extends Component {
    
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

        const { classes, redux: { page, formName }, 
            changeProfilePage, setCoords, setDate, addLinkedIn, addSkills, addExperience, addEducation, addCourses,
            handleSubmit, reset, pristine, submitting, invalid 
        } = this.props;

        return (
            page === "form" ?
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
                            <PersonalInformationSection 
                                formName={formName}
                                setCoords={setCoords}
                                setDate={setDate}
                                addLinkedIn={addLinkedIn}
                            />
                            <ProfileInformationSection 
                                previewDisabled={submitting || invalid}
                                changeToPreview={() => changeProfilePage("view")}
                            />
                            <WorkExperienceSection 
                                addExperience={addExperience}
                                formName={formName}
                            />
                            <SkillsSection
                                formName={formName}
                                addSkills={addSkills}
                            />
                            <EducationSection 
                                addEducation={addEducation}
                                formName={formName}
                            />
                            <CoursesAndCertificatesSection
                                addCourses={addCourses}
                                formName={formName}
                            />
                            <AccomplishmentsSection />
                            <PerksAndBenefitsSection
                                formName={formName}
                            />
                            <AssessmentSection
                                assessmentResult={{
                                    culture:[{type:"hierarchy", data:[{current:26.32},{preferred:29.41}]},
                                        {type:"clan", data:[{current:25.27},{preferred:25.27}]},
                                        {type:"adhocracy", data:[{current:29.41},{preferred:26.32}]},
                                        {type:"market", data:[{current:18.99},{preferred:18.99}]}]
                                }}
                            />
                            {!(pristine || invalid) &&
                                <div className={classes.buttonsSection}>
                                    <Button 
                                        className={classes.outlinedButton}
                                        type="submit"
                                        variant="outlined" 
                                        color="secondary"
                                        onClick={reset} 
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        className={classes.button}
                                        type="submit"
                                        variant="contained" 
                                        color="primary"
                                        disabled={submitting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            }
                        </form>
                    </Grid>
                </Grid>
                :
                <PreviewSection
                    submit={handleSubmit} 
                    changeToForm={() => changeProfilePage("form")}
                    assessmentResult={{
                        culture:[{type:"hierarchy", data:[{current:26.32},{preferred:29.41}]},
                            {type:"clan", data:[{current:25.27},{preferred:25.27}]},
                            {type:"adhocracy", data:[{current:29.41},{preferred:26.32}]},
                            {type:"market", data:[{current:18.99},{preferred:18.99}]}]
                    }}
                    formName={formName}
                    pristine={pristine} 
                    submitting={submitting}
                />
        );
    }
}

const mapStateToProps = (state) => ({
    redux : {
        page: state.profile.page,
        formName: "CandidateProfileForm"
    },
    initialValues: state.user.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeProfilePage: (page) => dispatch(changeProfilePage(page)),
        setCoords: (value) => dispatch(change('CandidateProfileForm', 'location.coords', value)),
        setDate: (value) => dispatch(change('CandidateProfileForm', 'dateofbirth', value === null ? null : value.toString())),
        addLinkedIn: (value) => dispatch(change('CandidateProfileForm', 'linkedin', value)),
        addSkills: (name, value) => dispatch(change('CandidateProfileForm', name, value)),
        addExperience: (value) => dispatch(change('CandidateProfileForm', 'experience', value)),
        addEducation: (value) => dispatch(change('CandidateProfileForm', 'education', value)),
        addCourses: (value) => dispatch(change('CandidateProfileForm', 'courses', value))
    };
};

CandidateProfileForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'CandidateProfileForm',
    validate
})(CandidateProfileForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CandidateProfileForm));