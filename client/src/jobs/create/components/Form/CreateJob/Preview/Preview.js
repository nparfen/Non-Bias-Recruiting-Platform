import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

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
    perksTitle: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    perksSubtitle: {
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
    avatarContainer: {
        border: "solid 2px #d8d8d8",
        borderRadius: "3px",
        maxHeight: "100%",
        maxWidth: "100%", 
        objectFit: "cover",
        width: "120px",
        height: "90px",
        position: "relative",
        marginTop: "16px",
        "&$fakeAvatarContainer": {
            backgroundColor: "#f9f9f9"
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: "0px",
        },
    },
    fakeAvatarContainer: {},
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
    jobDetails: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: 500,
        color: theme.palette.secondary.dark
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
    descTitle:{
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "12px"
    },
    descSubttle:{
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "24px",
        marginBottom: "12px"
    },
    descriptionText: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
    },
    description: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "32px",
        "&$lastDescription": {
            marginBottom: "0px"
        }
    },
    lastDescription: {},
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
    reprAvatarContainer:{
        border: "solid 2px #d8d8d8",
        borderRadius: "3px",
        maxHeight: "100%",
        maxWidth: "100%", 
        objectFit: "cover",
        width: "190px",
        height: "140px",
        position: "relative",
        marginTop: "16px",
        marginBottom: "12px",
        "&$fakeReprAvatarContainer": {
            backgroundColor: "#f9f9f9"
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: "0px",
        },
    },
    fakeReprAvatarContainer:{},
    reprName: {
        wordBreak: "break-word",
        fontSize: "18px",
        fontWeight: "500",
    },
    reprPosition:{
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "normal",
    },
    rightReprContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "24px",
        },
    },
    leftReprContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "24px",
        },
    },
});

const numberWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

class PreviewSection extends Component {

    render() {

        let { classes, formValues, profile, changeToForm, submit, pristine, submitting } = this.props;

        let jobtitle = _.get(formValues, "jobtitle", "N/A");
        let company = _.get(formValues, "company", "N/A");
        let city = _.get(formValues, "city.address", "");
        let jobtype = _.get(formValues, "jobtype", "");

        let salaryFrom = _.get(formValues, "salary.from", "");
        let salaryTo = _.get(formValues, "salary.to", "");
        let salaryPeriod = _.get(formValues, "salary.period", "");

        let yearsofexperience = _.get(formValues, "yearsofexperience", "N/A");
        let education = _.get(formValues, "education", "N/A");
        let senioritylevel = _.get(formValues, "senioritylevel", "N/A");

        let skills = _.get(formValues, "skills", "");

        let dailyresponsibilitieswillinclude = _.get(formValues, "dailyresponsibilitieswillinclude", "N/A");
        let introductionforyourjob = _.get(formValues, "introductionforyourjob", "N/A");
        let shortdescriptionoftherole = _.get(formValues, "shortdescriptionoftherole", "N/A");

        let showcompany = _.get(formValues, "showcompany", true);

        let worklifeBalance = _.get(formValues, "perksandbenefits.worklifebalance", []);
        let compensation = _.get(formValues, "perksandbenefits.compensation", []);
        let environmentCommunity = _.get(formValues, "perksandbenefits.environmentcommunity", []);
        let wealthHealth = _.get(formValues, "perksandbenefits.wealthhealth", []);
        let developmentGrowth = _.get(formValues, "perksandbenefits.developmentgrowth", []);

        let avatar = _.get(profile, "uploadlogo", "");
        let whatWeDo = _.get(profile, "whatwedo", "N/A");
        let whyWeDoWhatWeDo = _.get(profile, "whywedowhatwedo", "N/A");
        let weAreProudOf = _.get(profile, "weareproudof", "N/A");
        let representativeAvatar = _.get(profile, "representative.avatar", "");
        let representativeFirstname = _.get(profile, "representative.firstname", "N/A");
        let representativeLastname= _.get(profile, "representative.lastname", "");
        let representativePosition = _.get(profile, "representative.position", "N/A");


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
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid
                                item
                                xs={12}
                                sm={8}
                                md={10}
                            >
                                <Typography
                                    color="primary"
                                    className={classes.title}
                                >
                                    {jobtitle}
                                </Typography>
                                {salaryFrom && salaryPeriod && 
                                    <Typography
                                        color="primary"
                                        className={classes.salary}
                                    >
                                        £{numberWithSpaces(salaryFrom)} {salaryTo && `– £${numberWithSpaces(salaryTo)} ` }{salaryPeriod}
                                    </Typography>
                                }
                                <Typography className={classes.jobDetails}>
                                    {company}{city && <Fragment><span className={classes.dot}/>{city}</Fragment>}{jobtype && <Fragment><span className={classes.dot}/>{jobtype}</Fragment>}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                md={2}
                            >
                                {avatar ? 
                                    <img className={classes.avatarContainer} src={avatar} alt="avatar"/>
                                    : 
                                    <div className={classNames(classes.avatarContainer, classes.fakeAvatarContainer)}/>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography
                            color="primary"
                            className={classes.descTitle}
                        >
                            Job Description
                        </Typography>
                        <Typography
                            color="secondary"
                            className={classes.descriptionText}
                        >
                            {introductionforyourjob}
                        </Typography>
                        <Typography
                            color="primary"
                            className={classes.descSubttle}
                        >
                            Short description of the role
                        </Typography>
                        <Typography
                            color="secondary"
                            className={classes.descriptionText}
                        >
                            {shortdescriptionoftherole}
                        </Typography>
                        <Typography
                            color="primary"
                            className={classes.descSubttle}
                        >
                            Daily responsibilities will include:
                        </Typography>
                        <Typography
                            color="secondary"
                            className={classes.descriptionText}
                        >
                            {dailyresponsibilitieswillinclude}
                        </Typography>
                        <Typography
                            color="primary"
                            className={classes.descSubttle}
                        >
                            Candidate Requirements
                        </Typography>
                        <div>
                            <div className={classes.titleDescSection}>
                                <Typography
                                    color="secondary"
                                    className={classes.subtitleDesc}
                                >
                                    Education
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {education}
                                </Typography>
                            </div> 
                            <div className={classes.titleDescSection}>
                                <Typography
                                    color="secondary"
                                    className={classes.subtitleDesc}
                                >
                                    Seniority level
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {senioritylevel}
                                </Typography>
                            </div>
                            <div className={classes.titleDescSection}>
                                <Typography
                                    color="secondary"
                                    className={classes.subtitleDesc}
                                >
                                    Years of experiance
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                    {yearsofexperience}
                                </Typography>
                            </div>
                        </div>
                        {!_.isEmpty(skills) && 
                            <Fragment>
                                <Typography
                                    color="primary"
                                    className={classes.descSubttle}
                                >
                                    Skills
                                </Typography>
                                {
                                    skills.map((skill, index) => 
                                        <Typography
                                            key={index}
                                            color="secondary"
                                            className={classes.descriptionText}
                                        >
                                            <span className={classes.dot}/>
                                            {skill}
                                        </Typography>
                                    )
                                }
                            </Fragment>
                        }
                    </Paper>
                    {(!_.isEmpty(worklifeBalance) || !_.isEmpty(compensation)  || !_.isEmpty(environmentCommunity)  || !_.isEmpty(wealthHealth)  || !_.isEmpty(developmentGrowth)) &&
                        <Paper className={classes.paper}>
                            <Typography 
                                className={classes.perksTitle}
                                color="primary"
                            >
                                What we offer
                            </Typography>
                            {!_.isEmpty(worklifeBalance) &&
                                <Fragment>
                                    <Typography 
                                        className={classes.perksSubtitle}
                                        color="primary"
                                    >
                                        Work-Life Balance
                                    </Typography>
                                    <div>
                                        {worklifeBalance.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            {!_.isEmpty(compensation) &&
                                <Fragment>
                                    <Typography 
                                        className={classes.perksSubtitle}
                                        color="primary"
                                    >
                                        Compensation
                                    </Typography>
                                    <div>
                                        {compensation.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            {!_.isEmpty(environmentCommunity) &&
                                <Fragment>
                                    <Typography 
                                        className={classes.perksSubtitle}
                                        color="primary"
                                    >
                                        Environment & Community
                                    </Typography>
                                    <div>
                                        {environmentCommunity.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            {!_.isEmpty(wealthHealth) &&
                                <Fragment>
                                    <Typography 
                                        className={classes.perksSubtitle}
                                        color="primary"
                                    >
                                        Wealth & Health
                                    </Typography>
                                    <div>
                                        {wealthHealth.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            {!_.isEmpty(developmentGrowth) &&
                                <Fragment>
                                    <Typography 
                                        className={classes.perksSubtitle}
                                        color="primary"
                                    >
                                        Development & Growth
                                    </Typography>
                                    <div>
                                        {developmentGrowth.map((tag, key) => 
                                            <Typography className={classes.tag} key={key}>
                                                {tag}
                                            </Typography>
                                        )}
                                    </div>
                                </Fragment>
                            }
                        </Paper>
                    }
                    {showcompany &&
                        <Paper className={classes.paper}>
                            <Grid
                                container
                                direction="row"
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    className={classes.leftReprContainer}
                                >
                                    <Typography
                                        color="primary"
                                        className={classes.descTitle}
                                    >
                                        What we do
                                    </Typography>
                                    <Typography
                                        color="secondary"
                                        className={classes.description}
                                    >
                                        {whatWeDo}
                                    </Typography>
                                    <Typography
                                        color="primary"
                                        className={classes.descTitle}
                                    >
                                        Why we do what we do
                                    </Typography>
                                    <Typography
                                        color="secondary"
                                        className={classes.description}
                                    >
                                        {whyWeDoWhatWeDo}
                                    </Typography>
                                    <Typography
                                        color="primary"
                                        className={classes.descTitle}
                                    >
                                        We are proud of
                                    </Typography>
                                    <Typography
                                        color="secondary"
                                        className={classNames(classes.description, classes.lastDescription)}
                                    >
                                        {weAreProudOf}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.rightReprContainer}
                                >
                                    {representativeAvatar ? 
                                        <img className={classes.reprAvatarContainer} src={representativeAvatar} alt="background"/>
                                        : 
                                        <div className={classNames(classes.reprAvatarContainer, classes.fakeReprAvatarContainer)}/>
                                    }
                                    <Typography
                                        color="primary"
                                        className={classes.reprName}
                                    >
                                        {representativeFirstname + " " + representativeLastname}
                                    </Typography>
                                    <Typography
                                        color="secondary"
                                        className={classes.reprPosition}
                                    >
                                        {representativePosition}
                                    </Typography>
                                </Grid>
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
                        Publish
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