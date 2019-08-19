import React from 'react';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { push, goBack } from 'connected-react-router';
import _ from 'lodash';

import className from 'classnames';

import { clearAssessment, saveAssessment } from '../../../ducks/actions'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import CandidatePersonalitiesTest from './Personalities';

const styles = theme => ({
    paddingTop: {
        paddingTop: "48px"
    },
    titleContainer: {
        textAlign: "center"
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginTop: "48px"
    },
    description: {
        fontSize: "16px",
        fontWeight: "normal",
        marginBottom: "36px"
    },
    buttonsSection: {
        marginBottom: "70px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
    },
    skipAssessment: {
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "500",
        textDecoration: "underline",
        "&:hover": {
            color: theme.palette.secondary.dark,
        },
        marginBottom: "16px",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "0px"
        },
    },
    innerButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        marginTop: "16px",
        marginLeft: "0px",
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: "0px",
            marginLeft: "24px"
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
});

const CandidateAssessmentTests = ({ 
    classes, 
    redux: { isNewUser, personalities, personalitiesOld }, 
    skipAssessment, saveAssessment, goBack, clearAssessment, clearPersonalities 
}) => (
    <Grid 
        container
        direction="row"
        className={className(!isNewUser && classes.paddingTop)}
    >
        {isNewUser && <Grid 
            item
            xs={12}
            className={classes.titleContainer}
        >
            <Typography 
                color="primary" 
                className={classes.title}
            >
                Account is created!
            </Typography>
            <Typography 
                color="secondary" 
                className={classes.description}
            >
                Help us to provide you the best matching. Fill info below and get awesome result
            </Typography>
        </Grid>}
        <Grid 
            item
            xs={12}
        >
            <CandidatePersonalitiesTest 
                personalities={personalities}
            />
            <div className={classes.buttonsSection}>
                <Typography
                    color="secondary"
                    className={classes.skipAssessment}
                    onClick={() => { skipAssessment(); clearAssessment(); clearPersonalities(); }}
                >
                    Skip assessment
                </Typography>
                <div className={classes.innerButtons}>
                    <Button 
                        className={className(classes.button, classes.outlinedButton)}
                        type="submit"
                        variant="outlined" 
                        color="secondary"
                        onClick={goBack}
                    >
                        Back
                    </Button>
                    <Button 
                        className={classes.button}
                        type="submit"
                        variant="contained" 
                        color="primary"
                        onClick={() => { saveAssessment(); skipAssessment() }}
                        disabled={(personalitiesOld ? !_.isEqual(personalities, personalitiesOld) && !_.isEmpty(personalities) : !_.isEmpty(personalities)) ? false : true}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Grid>
    </Grid>
)

const mapStateToProps = (state) => ({
    redux : {
        personalities: state.assessment.personalities,
        isNewUser: state.user.data.isNewUser
    }
})

export default connect(
    mapStateToProps,
    {
        clearAssessment,
        saveAssessment,
        skipAssessment: () => push("/profile"),
        goBack: () => goBack(),
        clearPersonalities: () => destroy('CandidatePersonalitiesTestForm')
    }
)(withStyles(styles)(CandidateAssessmentTests));