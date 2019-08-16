import React from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import CandidatePersonalitiesTestForm from './Form';

import checked from '../../../../assets/checked.svg';

import assessmentData from '../../../../ducks/data'

import { setPersonalities, changePersonalitiesPage, clearPersonalities } from '../../../../ducks/actions';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "36px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    paperContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
    },
    checkedIcon: {
        marginTop: "8px",
        marginRight: "12px"
    },
    titleContainer: {
        display: "flex",
        alignItems:"start",
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        marginTop: "16px",
        [theme.breakpoints.up('sm')]: {
            marginTop: "0px"
        },
    },
});

const nextPage = (changePersonalitiesPage, page) => () => changePersonalitiesPage(page+1)

const clearPage = (clearPersonalities, changePersonalitiesPage) => () => {

    clearPersonalities()
    changePersonalitiesPage(0)
}

const submit = (setPersonalities, changePersonalitiesPage) => (result) => {

    setPersonalities(result);
    changePersonalitiesPage(0);
}

const CandidatePersonalitiesTest = ({ 
    personalities,
    classes, test = assessmentData.personalities, 
    setPersonalities, 
    changePersonalitiesPage, 
    clearPersonalities, 
    redux: { page, formValues }
}) => (
    <Paper className={classes.paper}>
        {page === 0 && 
            <div className={classes.paperContainer}> 
                <div className={classes.titleContainer}>
                    {!_.isEmpty(personalities) && <img src={checked} className={classes.checkedIcon} alt="checked"/>}
                    <div>
                        <Typography 
                            color="primary" 
                            className={classes.title}
                        >
                            Personalities
                        </Typography>
                        <Typography 
                            color="secondary" 
                            className={classes.description}
                        >
                            Approximate passing time 1 min 48 sec
                        </Typography>
                    </div>
                </div>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    onClick={nextPage(changePersonalitiesPage, page)}
                >
                    {personalities ? "Edit answers" : "Start test"}
                </Button>
            </div>
        }
        {page === 1 && 
            <CandidatePersonalitiesTestForm
                pageWithTest={test} 
                personalities={personalities}
                initialValues={personalities}
                formValues={formValues}
                onSubmit={submit(setPersonalities, changePersonalitiesPage)} 
                clearPage={clearPage(clearPersonalities, changePersonalitiesPage)}
            />
        }
    </Paper>                  
)

const mapStateToProps = (state) => ({
    redux: {
        formValues: getFormValues('CandidatePersonalitiesTestForm')(state),
        page: state.assessment.pages.personalities
    }
})

export default connect(
    mapStateToProps,
    {
        setPersonalities, 
        changePersonalitiesPage,
        clearPersonalities
    }
)(withStyles(styles)(CandidatePersonalitiesTest));