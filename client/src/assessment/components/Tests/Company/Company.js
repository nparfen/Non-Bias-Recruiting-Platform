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

import CompanyCultureTest from './Culture';
import CompanyPersonalitiesTest from './Personalities';
import CompanyValuesTest from './Values';

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
        }
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

const CompanyAssessmentTests = ({ 
    classes, 
    redux: { isNewUser, culture , personalities, values, cultureOld , personalitiesOld, valuesOld }, 
    skipAssessment, saveAssessment, goBack, clearAssessment, clearCulture, clearPersonalities, clearValues 
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
            <CompanyCultureTest
                culture={culture}
                personalities={personalities} 
            />
            <CompanyPersonalitiesTest 
                personalities={personalities} 
                values={values}
            />
            <CompanyValuesTest values={values} />
            <div className={classes.buttonsSection}>
                <Typography
                    color="secondary"
                    className={classes.skipAssessment}
                    onClick={() => { skipAssessment(); clearAssessment(); clearCulture(); clearPersonalities(); clearValues(); }}
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
                        disabled={(cultureOld ? culture !== cultureOld && !_.isEmpty(culture) : !_.isEmpty(culture)) || (personalitiesOld ? personalities !== personalitiesOld && !_.isEmpty(personalities) : !_.isEmpty(personalities)) || (valuesOld ? values !== valuesOld && !_.isEmpty(values) : !_.isEmpty(values)) ? false : true}
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
        culture: state.assessment.culture,
        personalities: state.assessment.personalities,
        values: state.assessment.values,
        isNewUser: state.user.data.isNewUser,
        cultureOld: state.user.data.assessment.data.culture,
        personalitiesOld: state.user.data.assessment.data.personalities,
        valuesOld: state.user.data.assessment.data.values,
    }
})

export default connect(
    mapStateToProps,
    {
        clearAssessment,
        saveAssessment,
        skipAssessment: () => push("/profile"),
        goBack: () => goBack(),
        clearCulture: () => destroy('CompanyCultureTestForm'),
        clearPersonalities: () => destroy('CompanyPersonalitiesTestForm'),
        clearValues: () => destroy('CompanyValuesTestForm')
    }
)(withStyles(styles)(CompanyAssessmentTests));