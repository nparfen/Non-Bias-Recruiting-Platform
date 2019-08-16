import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import format from 'date-fns/format';
import classNames from 'classnames';
import _ from 'lodash';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        width: "100%",
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
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    skillsSubtitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "24px",
        marginBottom: "16px"
    },
    tag: {
        wordBreak: "break-word",
        borderRadius: "2px",
        fontWeight: 500,
        display: "inline-block",
        padding: "10px 15px",
        marginRight: "12px",
        marginBottom: "12px",
        whiteSpace: "normal",
        color: theme.palette.primary.main,
        backgroundColor: "#efeff4",
    },
    title: {
        wordBreak: "break-word",
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "12px"
    },
    salary: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "16px"
    },
    descriptionText: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
        "&$accomplishments":{
            marginTop: "24px"
        }
    },
    accomplishments: {},
    titleDescSection: {
        display: "inline-block",
        marginRight: "24px"
    },
    subtitleDesc: {
        fontSize: "12px",
        fontWeight: "normal",
    },
    titleDesc: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "500",
        color: theme.palette.secondary.dark
    },
    industryContainer: {
        marginBottom: "16px"
    },
    blockSection: {
        marginTop: "24px"
    },
    blockTitle: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "bold"
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
        wordBreak: "break-word",
        color: theme.palette.secondary.dark,
        fontSize: "16px",
        fontWeight: "500"
    },
    blockDate: {
        fontSize: "12px",
        fontWeight: "normal"
    },
    blockDescription: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
        marginTop: "10px"
    },
    rightPrefContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    leftPrefContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    prefTitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "24px"
    },
    progressTitle:{
        fontSize: "12px",
        fontWeight: "normal",
        marginTop: "10px"
    },
    progressContainer: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center"
    },
    progress: {
        height: "7px",
        borderRadius: "2px",
        width: "100%"
    },
    progressCount: {
        fontSize: "14px",
        fontWeight: "normal",
        marginLeft: "12px"
    },
});

const normalise = (value, max) => (value - 0) * 100 / (max - 0);

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

class PreviewSection extends Component {


    render() {

        let { classes, formValues, changeToForm, submit, pristine, submitting, assessmentResult:{ culture } } = this.props;

        let position = _.get(formValues, "position", "N/A");
        let preferredindustry = _.get(formValues, "preferredindustry", "N/A");
        let currentindustry = _.get(formValues, "currentindustry", "N/A");
        let description = _.get(formValues, "description", "N/A");
        let salary = _.get(formValues, "salary", "");
        let period = _.get(formValues, "period", "");

        let experience = _.get(formValues, "experience", []);
        let education = _.get(formValues, "education", []);
        let courses = _.get(formValues, "courses", []);

        let accomplishments = _.get(formValues, "accomplishments", "N/A");

        let perks = _.get(formValues, "perks", []);

        let preferredperksandbenefits = _.get(formValues, "preferredperksandbenefits", true);
        let preferredcompanyculture = _.get(formValues, "preferredcompanyculture", true);

        let hardSkills = _.get(formValues, "hardskills", []);
        let softSkills = _.get(formValues, "softskills", []);
        
        let perksMax = _.orderBy(perks, function (object) { return Number(object.value); }, ['desc'])[0]
        let perksSum = _.reduce(perks, function(sum, n) {
            let value = n.value === "" ? 0 : Number(n.value)
            return sum + value;
        }, 0);

        return (
            <Grid 
                container
                direction="row"
                className={classes.container}
            >
                <Grid 
                    item
                    xs={12}
                    sm={8}
                    className={classes.leftContainer}
                > 
                    <Paper className={classes.paper}>
                        <Typography
                            color="primary"
                            className={classes.title}
                        >
                            {position}
                        </Typography>
                        {salary && period && 
                            <Typography
                                color="primary"
                                className={classes.salary}
                            >
                                £{salary} {period}
                            </Typography>
                        }
                        <div className={classes.industryContainer}>
                            <div className={classes.titleDescSection}>
                                <Typography
                                    color="secondary"
                                    className={classes.subtitleDesc}
                                >
                                    Industry (current)
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {currentindustry}
                                </Typography>
                            </div> 
                            <div className={classes.titleDescSection}>
                                <Typography
                                    color="secondary"
                                    className={classes.subtitleDesc}
                                >
                                    Industry (preferred)
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {preferredindustry}
                                </Typography>
                            </div>
                        </div>
                        <Typography
                            color="secondary"
                            className={classes.descriptionText}
                        >
                            {description}
                        </Typography>
                    </Paper>
                    {!_.isEmpty(experience) &&
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.sectionTitle}
                            >
                                Work Experience
                            </Typography>
                            {experience.map((work, index) => 
                                <div className={classes.blockSection} key={index}>
                                    <Typography 
                                        className={classes.blockTitle}
                                        color="primary"
                                    >
                                        {work.position}
                                    </Typography>
                                    <Typography className={classes.blockSubtitle}>
                                        {work.companyName} {work.location.coords && <Fragment><span className={classes.dot}/>{work.location.address}</Fragment> }
                                    </Typography>
                                    <Typography 
                                        color="secondary"
                                        className={classes.blockDate}
                                    >
                                        {format(Date.parse(work.fromDate), 'dd MMM yyyy')} - {work.currently ? "Present" : format(Date.parse(work.toDate), 'dd MMM yyyy')}
                                    </Typography>
                                    {
                                        work.description && <Typography 
                                            color="secondary"
                                            className={classes.blockDescription}
                                        >
                                            {work.description}
                                        </Typography>
                                    }
                                </div>
                            )}
                        </Paper>
                    }
                    {(!_.isEmpty(softSkills) || !_.isEmpty(hardSkills)) &&
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.sectionTitle}
                            >
                                Skills
                            </Typography>
                            {!_.isEmpty(hardSkills) && 
                                <Fragment>
                                    <Typography
                                        color="primary"
                                        className={classes.skillsSubtitle}
                                    >
                                        Hard Skills
                                    </Typography>
                                    <div>
                                        {hardSkills.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            {!_.isEmpty(softSkills) && 
                                <Fragment>
                                    <Typography
                                        color="primary"
                                        className={classes.skillsSubtitle}
                                    >
                                        Soft Skills
                                    </Typography>
                                    <div>
                                        {softSkills.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                        </Paper>
                    }
                    {!_.isEmpty(education) &&
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.sectionTitle}
                            >
                                Education
                            </Typography>
                            {education.map((institution, index) => 
                                <div className={classes.blockSection} key={index}>
                                    <Typography 
                                        className={classes.blockTitle}
                                        color="primary"
                                    >
                                        {institution.schoolName}
                                    </Typography>
                                    <Typography className={classes.blockSubtitle}>
                                        {institution.degree} <span className={classes.dot}/> {institution.degree} in {institution.studyField}
                                    </Typography>
                                    <Typography 
                                        color="secondary"
                                        className={classes.blockDate}
                                    >
                                        {format(Date.parse(institution.fromYear), 'dd MMM yyyy')} - {institution.currently ? "Present" : format(Date.parse(institution.toYear), 'dd MMM yyyy')}
                                    </Typography>
                                    {
                                        institution.description && <Typography 
                                            color="secondary"
                                            className={classes.blockDescription}
                                        >
                                            {institution.description}
                                        </Typography>
                                    }
                                </div>
                            )}
                        </Paper>
                    }
                    {!_.isEmpty(courses) &&
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.sectionTitle}
                            >
                                Courses and Certificates
                            </Typography>
                            {courses.map((course, index) => 
                                <div className={classes.blockSection} key={index}>
                                    <Typography 
                                        className={classes.blockTitle}
                                        color="primary"
                                    >
                                        {course.name}
                                    </Typography>
                                    <Typography className={classes.blockSubtitle}>
                                        {course.provider}
                                    </Typography>
                                    <Typography 
                                        color="secondary"
                                        className={classes.blockDate}
                                    >
                                        {
                                            course.type === "Course" && (course.currently ? "Present" : format(Date.parse(course.toYear), 'dd MMM yyyy'))
                                        }
                                        {
                                            course.type === "Certificate" && (format(Date.parse(course.fromYear), 'dd MMM yyyy') + " - " + format(Date.parse(course.toYear), 'dd MMM yyyy'))
                                        }
                                    </Typography>
                                    {
                                        course.description && <Typography 
                                            color="secondary"
                                            className={classes.blockDescription}
                                        >
                                            {course.description}
                                        </Typography>
                                    }
                                </div>
                            )}
                        </Paper>
                    }
                    <Paper className={classes.paper}>
                        <Typography
                            color="primary"
                            className={classes.sectionTitle}
                        >
                            Accomplishments
                        </Typography>
                        <Typography
                            color="secondary"
                            className={classNames(classes.descriptionText, classes.accomplishments)}
                        >
                            {accomplishments}
                        </Typography>
                    </Paper>
                    {((preferredperksandbenefits && perksSum === 100) || preferredcompanyculture) &&
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.sectionTitle}
                            >
                                Candidate Preferences
                            </Typography>
                            <Grid
                                container
                                direction="row"
                            >
                                {
                                    preferredcompanyculture &&
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        className={classes.leftPrefContainer}
                                    >
                                        <Typography
                                            color="primary"
                                            className={classes.prefTitle}
                                        >
                                            Company Culture
                                        </Typography>
                                        {_.orderBy(culture, ['value'], ['desc']).map((item, index) => 
                                            (index <= 3) && 
                                                <Fragment key={index}>
                                                    <Typography 
                                                        color="secondary"
                                                        className={classes.progressTitle}
                                                    >
                                                        {capitalize(item.type)}
                                                    </Typography>
                                                    <div className={classes.progressContainer} >
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            className={classes.progress} 
                                                            value={normalise(item.data[1].preferred, "29.41")}
                                                        />
                                                        <Typography 
                                                            color="primary" 
                                                            className={classes.progressCount}
                                                        >
                                                            {item.data[1].preferred}%
                                                        </Typography>
                                                    </div>
                                                </Fragment>
                                        )}
                                    </Grid>
                                }
                                {
                                    preferredperksandbenefits && perksSum === 100 &&
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            className={preferredcompanyculture ? classes.rightPrefContainer : classes.leftPrefContainer}
                                        >
                                            <Typography
                                                color="primary"
                                                className={classes.prefTitle}
                                            >
                                                Perks and Benefits
                                            </Typography>
                                            {perks.map((item, index) => 
                                                <Fragment key={index}>
                                                    <Typography 
                                                        color="secondary"
                                                        className={classes.progressTitle}
                                                    >
                                                        {index === 0 && "Work-Life Balance"}
                                                        {index === 1 && "Compensation"}
                                                        {index === 2 && "Environment and Community"}
                                                        {index === 3 && "Wealth and Health"}
                                                        {index === 4 && "Development and Growth"}
                                                    </Typography>
                                                    <div className={classes.progressContainer} >
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            className={classes.progress} 
                                                            value={normalise(item.value === "" ? 0 : item.value, perksMax.value === "" ? 0 : perksMax.value)}
                                                        />
                                                        <Typography 
                                                            color="primary" 
                                                            className={classes.progressCount}
                                                        >
                                                            {item.value === "" ? 0 : item.value}%
                                                        </Typography>
                                                    </div>
                                                </Fragment>
                                            )}
                                        </Grid>
                                }
                            </Grid>
                        </Paper>
                    }
                </Grid>
                <div className={classes.buttonsSection}>
                    <Button 
                        className={classes.outlinedButton}
                        type="button"
                        variant="outlined" 
                        color="secondary"
                        onClick={changeToForm} 
                        disabled={submitting}
                    >
                        Back
                    </Button>
                    <Button 
                        className={classes.button}
                        type="submit"
                        variant="contained" 
                        color="primary"
                        onClick={submit}
                        disabled={submitting || pristine}
                    >
                        Save
                    </Button>
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(PreviewSection));