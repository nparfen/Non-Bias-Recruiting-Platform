import React from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import CompanyCultureTestForm from './Form';

import checked from '../../../../assets/checked.svg';

import assessmentData from '../../../../ducks/data'

import { setCulture, changeCulturePage, changePersonalitiesPage, clearCulture } from '../../../../ducks/actions';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
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

const nextPage = (changeCulturePage, page) => () => changeCulturePage(page+1)

const previousPage = (changeCulturePage, page) => () => changeCulturePage(page-1)

const clearPage = (clearCulture, changeCulturePage, personalitiesPage, changePersonalitiesPage, personalities) => () => {

    clearCulture()
    changeCulturePage(0)
    if (personalitiesPage === 0 && _.isEmpty(personalities)){
        changePersonalitiesPage(personalitiesPage+1);
    }
}

const submit = (setCulture, changeCulturePage, personalitiesPage, changePersonalitiesPage, personalities) => (result) => {

    setCulture(result);
    changeCulturePage(0);
    if (personalitiesPage === 0 && _.isEmpty(personalities)){
        changePersonalitiesPage(personalitiesPage+1);
    }
}

const CompanyCultureTest = ({ 
    culture, personalities,
    classes, test = assessmentData.culture,
    setCulture, 
    changeCulturePage, 
    changePersonalitiesPage, 
    clearCulture, 
    redux: { page, formValues, personalitiesPage }
}) => (
    <Paper className={classes.paper}>
        {page === 0 && 
            <div className={classes.paperContainer}> 
                <div className={classes.titleContainer}>
                    {!_.isEmpty(culture) && <img src={checked} className={classes.checkedIcon} alt="checked"/>}
                    <div>
                        <Typography 
                            color="primary" 
                            className={classes.title}
                        >
                            Culture
                        </Typography>
                        <Typography 
                            color="secondary" 
                            className={classes.description}
                        >
                            Approximate passing time 2 min 32 sec
                        </Typography>
                    </div>
                </div>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    onClick={nextPage(changeCulturePage, page)}
                >
                    {culture ? "Edit answers" : "Start test"}
                </Button>
            </div>
        }
        {page > 0 && 
            <CompanyCultureTestForm 
                amount={test.length} 
                current={page-1}
                culture={culture}
                initialValues={culture}
                formValues={formValues}
                pageWithTest={test[page-1]} 
                previousPage={previousPage(changeCulturePage, page)} 
                onSubmit={test.length === page ? submit(setCulture, changeCulturePage, personalitiesPage, changePersonalitiesPage, personalities) : nextPage(changeCulturePage, page)} 
                clearPage={clearPage(clearCulture, changeCulturePage, personalitiesPage, changePersonalitiesPage, personalities)}
            />
        }
    </Paper>                  
)

const mapStateToProps = (state) => ({
    redux: {
        formValues: getFormValues('CompanyCultureTestForm')(state),
        page: state.assessment.pages.culture,
        personalitiesPage: state.assessment.pages.personalities
    }
})

export default connect(
    mapStateToProps,
    {
        setCulture, 
        changeCulturePage, 
        changePersonalitiesPage, 
        clearCulture
    }
)(withStyles(styles)(CompanyCultureTest));